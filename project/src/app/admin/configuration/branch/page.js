"use client"

import DataTableActions from '@/components/general/DataTableActions'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
import { AlertCircle, CheckCircle2, Package } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {

    const router = useRouter()


    const [data , setData] = useState()


    const handleAddRedirect = () => {
        router.push('/admin/configuration/branch/add');
    }

    const handleEditRedirect = (row) => {
        router.push(`/admin/configuration/branch/edit/${row?.id}`);
    }

  return (
     <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">

      {/* 1. Page Heading */}
      
      <HeadingAndDescription description={"Manage your branch information, track locations, and maintain details efficiently."} title={"Branch Master"} />
      

      {/* 2. Tiles Section (Inventory Specific) */}
 
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Total Branches</span>
            <span className="text-2xl font-bold text-[#0C6263]">{data.length}</span>
          </div>
          <Package className="text-[#0C6263]/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">In Stock</span>
            <span className="text-2xl font-bold text-green-600">
              {data.filter((p) => p.status === 1 && p.quantity > 0).length}
            </span>
          </div>
          <CheckCircle2 className="text-green-600/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            <span className="text-2xl font-bold text-red-500">
              {data.filter((p) => p.quantity === 0 || p.status === 0).length}
            </span>
          </div>
          <AlertCircle className="text-red-500/20" size={32} />
        </div>
      </div>

      {/* 3. Actions & Table Area */}
      <div className="flex flex-col gap-4">
        
        {/* <DataTableActions
          onAddClick={handleAddRedirect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pageSize={pageSize}
          setPageSize={setPageSize}
          addBtnText='Add Branch'
          placeholder='Search Branches...'
        /> */}

        {/* 4. Data Table Container */}
          {/* <DataTable columns={columns} data={finalData} rowConfig={rowConfig} onDelete={openDeleteDialog} onEdit={openEditpage}  /> */}
        
      </div>

    </div>
  )
}

export default page
