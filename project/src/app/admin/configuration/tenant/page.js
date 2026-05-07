"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { confirmDelete } from '@/utils/confirmDelete'
import { Building2, CheckCircle2, XCircle } from 'lucide-react'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
import DataTableActions from '@/components/general/DataTableActions'
import DataTable from '@/components/general/DataTable'
import { tenantData } from '@/lib/data/tenantConfigData'

// UI Components

const TenantMasterPage = () => {
  const router = useRouter()

  const [data, setData] = useState(tenantData)
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(5)

  // Sync with LocalStorage and Mock Data
  useEffect(() => {
    const savedData = localStorage.getItem('tenant_configs');
    if (savedData) {
      const parsedLocal = JSON.parse(savedData);
      const combinedData = [
        ...parsedLocal,
        ...tenantData.filter(m => !parsedLocal.some(l => l.id === m.id))
      ];
      setData(combinedData);
    } else {
      setData(tenantData);
    }
  }, []);

  // Format data for the table display
  const formattedData = data
    .filter(item => item.isDeleted === 0)
    .map(item => ({
      id: item.id,
      code: item.code,
      name: item.name,
      contact: item.contact,
      location: item.location,
      url: item.url,
      status: item.status === 1 ? "Active" : "Inactive",
      date: new Date(item.createdAt).toLocaleDateString(),
    }))

  const filteredData = formattedData.filter(item =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.code || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const finalData = filteredData.slice(0, pageSize)

  const columns = ["ID", "Code", "Name", "Contact", "Location", "URL", "Status", "Date"]

  const rowConfig = {
    showEdit: true,
    showDelete: true,
  }

  // Handlers
  const handleAddRedirect = () => {
    router.push('/admin/configuration/tenant/add');
  }

  const handleEditRedirect = (row) => {
    router.push(`/admin/configuration/tenant/edit/${row.id}`);
  }

  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row,
      data,
      setData,
      key: "id",
      entity: "Tenant"
    });
  };

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">
      
      <HeadingAndDescription
        title="Tenant Master" 
        description="Manage your tenant information, track locations, and maintain details efficiently." 
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Total Tenants</span>
            <span className="text-2xl font-bold text-[#0C6263]">{data.length}</span>
          </div>
          <Building2 className="text-[#0C6263]/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Active</span>
            <span className="text-2xl font-bold text-green-600">
              {data.filter((p) => p.status === 1).length}
            </span>
          </div>
          <CheckCircle2 className="text-green-600/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Inactive</span>
            <span className="text-2xl font-bold text-slate-400">
              {data.filter((p) => p.status === 0).length}
            </span>
          </div>
          <XCircle className="text-slate-400/20" size={32} />
        </div>
      </div>

      {/* Actions & Table Area */}
      <div className="flex flex-col gap-4">
        <DataTableActions
          onAddClick={handleAddRedirect}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pageSize={pageSize}
          setPageSize={setPageSize}
          addBtnText='Add Tenant'
          placeholder='Search Tenants...'
        />

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

export default TenantMasterPage;