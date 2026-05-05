"use client";

import DataStatsInfo from "@/components/general/DataStatsInfo";
import DataTable from "@/components/general/DataTable";
import HeadingAndDescription from "@/components/general/HeadingAndDescription";
import CustomerModal from "@/components/modal/CustomerModal";
import DeleteConfirmModal from "@/components/modal/DeleteConfirmModal";
import DynamicEditModal from "@/components/modal/DynamicEditModal";
import Button from "@/components/ui/Button";
import { customerData } from "@/lib/data/customersData";
import { Plus, Users, Search } from "lucide-react";
import { useState } from "react";

export default function CustomerMaster() {

  const [searchQuery , setSearchQuery] = useState("")
  const [data, setData] = useState(customerData);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);  


  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  // Delete Functions:

  const openDeleteDialog = (row) => {
    setCustomerToDelete(row)
    setIsDeleteModalOpen(true);
  } 

  // Edit Functions:

  const openEditDialog = (row) => {
    setCustomerToEdit(row);
    setIsEditModalOpen(true);
  }

  const handleConfirmDelete = () => {
    if (customerToDelete) {
      const updatedData = data.filter((c) => c.id !== customerToDelete.id);
      setData(updatedData);
      setIsDeleteModalOpen(false);
      setCustomerToDelete(null);
    }
  };

  const filteredData = data.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) 
    )
  }) 

  const handleUpdateCustomer = (updatedRow) => {
  const formattedRow = {
    ...updatedRow,
    status: Number(updatedRow.status), 
  };

  setData(prev => prev.map(item => item.id === formattedRow.id ? formattedRow : item));
  setIsEditModalOpen(false);
  setCustomerToEdit(null);
};

  const columns = ["ID", "Name", "Contact", "Status"];

  const customerFields = [
  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Enter customer name' },
  { name: 'contact', label: 'Contact Number', type: 'text', placeholder: '03xx-xxxxxxx' },
  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'example@gmail.com' },
  { name: 'city', label: 'City', type: 'text', placeholder: 'Enter city' },
  { 
    name: 'status', 
    label: 'Status', 
    type: 'select', 
    options: [
      { label: 'Active', value: 1 },
      { label: 'Inactive', value: 0 }
    ] 
  }
];

  const rowConfig = {
    "Status": (row) => (
      row.status === 1 
        ? <span className="text-green-600 font-bold text-xs bg-green-50 px-2 py-1 rounded-md border border-green-100">● Active</span>
        : <span className="text-red-600 font-bold text-xs bg-red-50 px-2 py-1 rounded-md border border-red-100">● Inactive</span>
    )
  };

  return (
    <div className="page-container flex flex-col gap-6 animate-in fade-in duration-500">


      <CustomerModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <DeleteConfirmModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={customerToDelete?.name || "this customer"}
      />

      <DynamicEditModal
        title="Edit Customer Info"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateCustomer}
        initialData={customerToEdit}
        fields={customerFields}
      />

      <HeadingAndDescription title={"Customer Master"} description={"Manage your customer database, track status, and maintain relationships efficiently."} />

      <DataStatsInfo title={"Total Customers"} totalLength={data.length} activeLength={data.filter((c) => c.status === 1).length} inactiveLength={data.filter((c) => c.status === 0).length} />

        <div className="flex justify-between flex-col gap-3">

        {/* Actions */}
        <div className="flex gap-3 flex-col-reverse sm:flex-row sm:justify-between w-full">


          
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl focus-within:border-[#0C6263] transition">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search customer..."
              className="bg-transparent outline-none text-sm w-40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button icon={Plus} text="Add Customer" onClick={() => setIsModalOpen(true)} />
        </div> 

        <div>

        <DataTable columns={columns} data={filteredData} rowConfig={rowConfig} onDelete={openDeleteDialog} onEdit={openEditDialog} />


        </div>


        </div>

    </div>
  );
}