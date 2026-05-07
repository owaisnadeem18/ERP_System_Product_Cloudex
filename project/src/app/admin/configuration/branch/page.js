"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { confirmDelete } from '@/utils/confirmDelete'
import { MapPin, CheckCircle2, XCircle, Building } from 'lucide-react'

// UI Components
import DataTableActions from '@/components/general/DataTableActions'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
import DataTable from '@/components/general/DataTable'
import { branchData } from '@/lib/data/branchConfigData'

const BranchMasterPage = () => {
  const router = useRouter()

  // Initialize with empty array to prevent hydration mismatch
  const [data, setData] = useState(branchData)
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(5)

  useEffect(() => {
    const savedData = localStorage.getItem('branch_configs');
    if (savedData) {
      const parsedLocal = JSON.parse(savedData);
      // Merge local with mock, avoiding duplicates by ID
      const combinedData = [
        ...parsedLocal,
        ...branchData.filter(m => !parsedLocal.some(l => l.id === m.id))
      ];
      setData(combinedData);
    } else {
      setData(branchData);
    }
  }, []);

  // Format data for the table
  const formattedData = data
    .filter(item => item.isDeleted === 0)
    .map(item => ({
      id: item.id,
      tenant: item.tenantName,
      code: item.code,
      name: item.name,
      manager: item.manager || "N/A",
      city: item.city,
      status: item.status === 1 ? "Active" : "Inactive",
      date: new Date(item.createdAt).toLocaleDateString(),
    }))

  const filteredData = formattedData.filter(item =>
    (item.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.tenant || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.code || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const finalData = filteredData.slice(0, pageSize)

  // Specific Columns for Branch
  const columns = ["ID", "Tenant", "Code", "Branch Name", "Manager", "City", "Status", "Date"]

  const rowConfig = {
    showEdit: true,
    showDelete: true,
  }

  const handleAddRedirect = () => router.push('/admin/configuration/branch/add');
  const handleEditRedirect = (row) => router.push(`/admin/configuration/branch/edit/${row.id}`);

  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row,
      data,
      setData,
      key: "id",
      entity: "Branch"
    });
  };

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">
      
      <HeadingAndDescription 
        title="Branch Master" 
        description="Manage individual store locations, assign managers, and track branch-specific details." 
      />

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Total Branches</span>
            <span className="text-2xl font-bold text-[#0C6263]">{data.length}</span>
          </div>
          <MapPin className="text-[#0C6263]/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Active Locations</span>
            <span className="text-2xl font-bold text-green-600">
              {data.filter((p) => p.status === 1).length}
            </span>
          </div>
          <CheckCircle2 className="text-green-600/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Inactive/Closed</span>
            <span className="text-2xl font-bold text-red-500">
              {data.filter((p) => p.status === 0).length}
            </span>
          </div>
          <XCircle className="text-red-500/20" size={32} />
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
          addBtnText='Add Branch'
          placeholder='Search Branch, Code or Tenant...'
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

export default BranchMasterPage;