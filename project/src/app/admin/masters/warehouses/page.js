"use client"

import React, { useEffect, useState } from 'react'
import { Package, Search, Plus, MapPin, Warehouse, UserCheck } from 'lucide-react'

import DataTable from '@/components/general/DataTable';
import HeadingAndDescription from '@/components/general/HeadingAndDescription';
import WarehouseModal from '@/components/modal/WarehouseModal';
import { warehouseData } from '@/lib/data/warehouseData';
import DynamicEditModal from '@/components/modal/DynamicEditModal';
import DataTableActions from '@/components/general/DataTableActions';
import Swal from 'sweetalert2';
import { confirmDelete } from '@/utils/confirmDelete';
import { useRouter } from 'next/navigation';

const WarehouseMaster = () => {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [data , setData] = useState(warehouseData);
  // const [isModalOpen , setIsModalOpen] = useState(false);
  // const [isEditModalOpen , setIsEditModalOpen] = useState(false);

   useEffect(() => {
    const savedData = localStorage.getItem('warehouses');
    if (savedData) {
      const parsedLocal = JSON.parse(savedData);
      
      const uniqueData = [
        ...parsedLocal,
        ...warehouseData.filter(mockItem => !parsedLocal.some(localItem => localItem.id === mockItem.id))
      ];
      
      setData(uniqueData);
    }
  }, []);
  

  // const [itemToEdit , setItemToEdit] = useState(null);

  // const createWarehouseObj = (formData) => {
  //   return {
  //       id: formData.id || `WH-${Math.floor(1000 + Math.random() * 9000)}`,
  //     name: formData.name,
  //   location: formData.location,
  //   manager: formData.manager,
  //   status: Number(formData.status),
  //   }
  // }

  // const handleAddWarehouse = (formData) => {
  //   const newWareHouse = createWarehouseObj(formData)
  //   setData(prev => [newWareHouse , ...prev])
  //   setIsModalOpen(false)
  // }

  const handleAddRedirect = () => {
    router.push("/admin/masters/warehouses/add")
  }

  const handleEditRedirect = (row) => {
    router.push(`/admin/masters/warehouses/edit/${row.id}`)
  }
  
  const columns = ["ID", "NAME", "LOCATION", "MANAGER", "STATUS"]

  const warehouseFields = [
  {
    name: "name",
    label: "Warehouse Name",
    type: "text",
    placeholder: "e.g. Main Karachi Warehouse",
    icon: Warehouse,
    required: true,
  },
  {
    name: "location",
    label: "Location / Address",
    type: "text",
    placeholder: "e.g. Korangi Industrial Area",
    icon: MapPin,
    required: true,
  },
  {
    name: "manager",
    label: "Manager Name",
    type: "text",
    placeholder: "Ahmed Khan",
    icon: UserCheck,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    options: [
      { label: "Active", value: 1 },
      { label: "Inactive", value: 0 },
    ],
  },
];

  const rowConfig = [
    { key: "id", className: "font-bold text-[#0C6263]" },
    { key: "name", className: "font-medium" },
    { key: "location", className: "text-slate-600" },
    { key: "manager", className: "text-slate-600" },
    { 
      key: "status", 
      type: "badge", 
      options: { 
        1: { text: "Active", className: "bg-green-100 text-green-600" }, 
        0: { text: "Inactive", className: "bg-red-100 text-red-500" } 
      } 
    }
  ]

  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row,
      data,
      setData,
      key: "name",
      entity: "Warehouse"
    });
  };

//   const openEditDialog = (row) => {
//   setItemToEdit(row); 
//   setIsEditModalOpen(true);
// };


//   const handleUpdateWarehouse = (updatedRow) => {
//   const updatedData = data.map((w) => (w.id === updatedRow.id ? updatedRow : w));
//   setData(updatedData);
//   setIsEditModalOpen(false);
// };

const filteredData = data.filter((warehouse) => {
  return (
    warehouse.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchQuery.toLowerCase())
  )
})

const finalData = filteredData.slice(0, pageSize);

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">
      
      {/* <WarehouseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddWarehouse} /> */}


      {/* <DynamicEditModal 
      title="Edit Warehouse Info"
      isOpen={isEditModalOpen} 
      onClose={() => setIsEditModalOpen(false)} 
      onSave={handleUpdateWarehouse}
      initialData={itemToEdit} 
      fields={warehouseFields} 
      /> */}

      <HeadingAndDescription description="Manage your storage locations, track regional hubs, and assign warehouse managers." title={"Warehouse Master"} />

      {/* 2. Tiles Section (Warehouse Specific) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Total Warehouses</span>
            <span className="text-2xl font-bold text-[#0C6263]">{data.length}</span>
          </div>
          <Warehouse className="text-[#0C6263]/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Active Locations</span>
            <span className="text-2xl font-bold text-green-600">
              {data.filter((w) => w.status === 1).length}
            </span>
          </div>
          <MapPin className="text-green-600/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Assigned Managers</span>
            <span className="text-2xl font-bold text-blue-500">
              {data.filter((w) => w.manager).length}
            </span>
          </div>
          <UserCheck className="text-blue-500/20" size={32} />
        </div>
      </div>

      {/* 3. Actions & Table Area */}
      <div className="flex flex-col gap-4">
        <DataTableActions
          placeholder="Search by warehouse name or location"
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
          onAddClick={handleAddRedirect}
          setPageSize={setPageSize}
          pageSize={pageSize}
          addBtnText="Add Warehouse"
        />

        {/* 4. Data Table Container */}
        <DataTable 
            columns={columns} 
            data={finalData} 
            rowConfig={rowConfig} 
            onDelete={openDeleteDialog} 
            onEdit={handleEditRedirect}
        />
      </div>
    </div>
  )
}

export default WarehouseMaster