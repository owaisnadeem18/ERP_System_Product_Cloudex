"use client"

import DataStatsInfo from '@/components/general/DataStatsInfo'
import DataTableActions from '@/components/general/DataTableActions'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
// import CreateGRNModal from '@/components/modal/CreateGrnModal'
import DataTable from '@/components/general/DataTable'
// import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal'
// import DynamicEditModal from '@/components/modal/DynamicEditModal'
import { grnData } from '@/lib/data/grnData'
import React, { useEffect, useState } from 'react'
import { confirmDelete } from '@/utils/confirmDelete'
import { useRouter } from 'next/navigation'

const page = () => {

  const router = useRouter()

  const [data, setData] = useState(grnData)
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(5)

  // const [isModalOpen, setIsModalOpen] = useState(false)
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  // const [itemToEdit, setItemToEdit] = useState(null)

  
    useEffect(() => {
      const savedData = localStorage.getItem('inventoryGrns'); 
    
    if (savedData) {
      const parsedLocal = JSON.parse(savedData);
      
      const combinedData = [
        ...parsedLocal,
        ...grnData.filter(mockItem => 
          !parsedLocal.some(localItem => localItem.id === mockItem.id)
        )
      ];
      
      setData(combinedData);
    }
  }, []);

  const formattedData = data.map(item => ({
  id: item.grnId || item.id,
  grnId: item.grnId,
  supplier: item.supplier,
  warehouse: item.warehouse?.name || item.warehouse, // Handle both object and string
  // Check if it's an array (mock) or a number (form)
  items: Array.isArray(item.items) ? item.items.length : (item.itemsCount || 0),
  status: item.status,
  date: new Date(item.grnDate || item.date).toLocaleDateString(),
}))

  const filteredData = formattedData.filter(item =>
    (item.grnId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.supplier || "").toLowerCase().includes(searchQuery.toLowerCase())
  )

  const finalData = filteredData.slice(0, pageSize)

  const columns = [
    "GRN ID",
    "Supplier",
    "Warehouse",
    "Items",
    "Status",
    "Date"
  ]

  // ✅ Row Config
  const rowConfig = {
    showEdit: true,
    showDelete: true,
  }

const openDeleteDialog = (row) => {
  confirmDelete({
    item: row,
    data,
    setData,
    key: "id",
    entity: "GRN"
  });
};

const handleAddRedirect = () => {
  router.push("/admin/inventory/grns/add");
}

const handleEditRedirect = (row) => {
  router.push(`/admin/inventory/grns/edit/${row.id}`);
}

  // const openEditDialog = (row) => {
  //   const original = data.find(d => d.grnId === row.grnId)
  //   setItemToEdit(original)
  //   setIsEditModalOpen(true)
  // }

  // const handleUpdate = (updatedItem) => {
  //   setData(prev =>
  //     prev.map(item =>
  //       item.grnId === updatedItem.grnId ? updatedItem : item
  //     )
  //   )
  //   setIsEditModalOpen(false)
  //   setItemToEdit(null)
  // }

  const grnFields = [
    { name: "supplier", label: "Supplier" },
    { name: "status", label: "Status", type: "select", options: [
      { value: "Pending", label: "Pending" },
      { value: "Partial", label: "Partial" },
      { value: "Completed", label: "Completed" }
    ]}
  ]

  return (
    <div className='page-container flex flex-col gap-6 animate-in fade-in duration-500'>

      {/* Create Modal */}
      {/* <CreateGRNModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}

      {/* Edit Modal */}
      {/* <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={itemToEdit}
        fields={grnFields}
        onSave={handleUpdate}
        title={itemToEdit ? `Edit GRN #${itemToEdit.grnId}` : "Edit GRN"}
      /> */}

      {/* Heading */}
      <HeadingAndDescription
        title="Goods Received Notes (GRNs)"
        description="Track and manage all goods received from suppliers into warehouses."
      />

      {/* Stats */}
      <DataStatsInfo
        title="Total GRNs"
        totalLength={data.length}
        activeLength={data.filter(t => t.status === "Completed").length}
        inactiveLength={data.filter(t => t.status === "Pending").length}
      />

      <div className="flex justify-between flex-col gap-3">

        {/* Actions */}
        <DataTableActions
          placeholder="Search GRN ID or Supplier"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={handleAddRedirect}
          pageSize={pageSize}
          setPageSize={setPageSize}
          addBtnText="Create GRN"
        />

        {/* Table */}
        <DataTable
          columns={columns}
          data={finalData}
          rowConfig={rowConfig}
          onEdit={handleEditRedirect}
          onDelete={openDeleteDialog}
        />

      </div>
    </div>
  )
}

export default page