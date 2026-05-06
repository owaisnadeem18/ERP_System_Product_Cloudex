"use client";

import DataStatsInfo from "@/components/general/DataStatsInfo";
import DataTable from "@/components/general/DataTable";
import DataTableActions from "@/components/general/DataTableActions";
import HeadingAndDescription from "@/components/general/HeadingAndDescription";
import CustomerModal from "@/components/modal/CustomerModal";
import Swal from "sweetalert2";
import DynamicEditModal from "@/components/modal/DynamicEditModal";
import { customerData } from "@/lib/data/customersData";
import { useState } from "react";
import { confirmDelete } from "@/utils/confirmDelete";

export default function CustomerMaster() {

  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(5);

  const [data, setData] = useState(customerData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [customerToEdit, setCustomerToEdit] = useState(null);

  // Delete Functions:

  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row,
      data,
      setData,
      key: "name",
      entity: "Customer"
    })
};

  // Edit Functions:

  const openEditDialog = (row) => {
    setCustomerToEdit(row);
    setIsEditModalOpen(true);
  }


  const filteredData = data.filter((customer) => {
    return (
      customer.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const finalData = filteredData.slice(0, pageSize);

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

        <DataTableActions
          placeholder="Search Customers"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onAddClick={() => setIsModalOpen(true)}
          setPageSize={setPageSize}
          pageSize={pageSize}
          addBtnText="Add Customer"
        />


        <div>

          <DataTable columns={columns} data={finalData} rowConfig={rowConfig} onDelete={openDeleteDialog} onEdit={openEditDialog} />


        </div>


      </div>

    </div>
  );
}