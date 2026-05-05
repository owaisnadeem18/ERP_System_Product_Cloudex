"use client"

import React, { useState } from 'react'
import { Package, Search, Plus, MapPin, Warehouse, UserCheck } from 'lucide-react'
import Button from '@/components/ui/Button';
import DataTable from '@/components/general/DataTable';
import HeadingAndDescription from '@/components/general/HeadingAndDescription';
import WarehouseModal from '@/components/modal/WarehouseModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import { warehouseData } from '@/lib/data/warehouseData';

const WarehouseMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data , setData] = useState(warehouseData);
  const [isModalOpen , setIsModalOpen] = useState(false);
  const [isDeleteModalOpen , setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen , setIsEditModalOpen] = useState(false);
  
  const [warehouseToDelete , setWarehouseToDelete] = useState(null);
  
  const columns = ["ID", "NAME", "LOCATION", "MANAGER", "STATUS"]

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
  ];

  const openDeleteDialog = (row) => {
    setIsDeleteModalOpen(true)
    setWarehouseToDelete(row)
  }

  const handleConfirmDelete = (row) => {

    if (warehouseToDelete) {
      const updatedData = data.filter((w) => w.id !== warehouseToDelete.id )
      setData(updatedData);
      setIsDeleteModalOpen(false);
      setWarehouseToDelete(null);

    }

  }

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">
      
      <WarehouseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <DeleteConfirmModal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)} onConfirm={handleConfirmDelete} itemName={warehouseToDelete?.name} />

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
        <div className="flex gap-3 flex-col-reverse sm:flex-row sm:justify-between w-full">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl focus-within:border-[#0C6263] focus-within:ring-2 focus-within:ring-teal-500/10 transition-all shadow-sm w-full sm:w-80">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or location..."
              className="bg-transparent outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button icon={Plus} text="Add Warehouse" className="font-bold shadow-md" onClick={() => setIsModalOpen(true)}  />
        </div> 

        {/* 4. Data Table Container */}
        <DataTable 
            columns={columns} 
            data={data} 
            rowConfig={rowConfig} 
            onDelete={openDeleteDialog} 
            onEdit={() => {}} 
        />
      </div>
    </div>
  )
}

export default WarehouseMaster