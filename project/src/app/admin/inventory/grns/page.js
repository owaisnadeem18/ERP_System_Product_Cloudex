import DataStatsInfo from '@/components/general/DataStatsInfo'
import DataTableActions from '@/components/general/DataTableActions'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
import { grnData } from '@/lib/data/grnData'
import React, { useState } from 'react'

const page = () => {

  const [data, setData] = useState(grnData)
  const [searchQuery, setSearchQuery] = useState("")
  const [pageSize, setPageSize] = useState(5)
  const [isModalOpen, setIsModalOpen] = useState(false)

  


  return (
    <div className='page-container flex flex-col gap-6 animate-in fade-in duration-500'>
        
              <CreateAdjustmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)} 
              />
        
              {/* <DeleteConfirmModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                itemName={itemToDelete?.adjustmentId || ""}
              />
        
              <DynamicEditModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                initialData={itemToEdit}
                fields={adjustmentFields}
                onSave={handleUpdate}
                title={itemToEdit ? `Edit Adjustment #${itemToEdit.adjustmentId}` : "Edit Adjustment"}
              /> */}
              
              {/* 1. Heading Section */}
              <HeadingAndDescription
                title="Inventory Adjustments" 
                description="Monitor and manage stock movement between different warehouses and branches." 
              />
        
              {/* 2. Stats Section */}
              <DataStatsInfo
                title="Total Adjustments" 
                totalLength={data.length} 
                activeLength={data.filter(t => t.status === "In-Transit").length} 
                inactiveLength={data.filter(t => t.status === "Pending").length}        
              />
        
              <div className="flex justify-between flex-col gap-3">
                
                {/* 3. Actions Section (Search, Add, PageSize) */}
                <DataTableActions
                  placeholder="Search Adjustment ID or Warehouse"
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  onAddClick={() => setIsModalOpen(true)}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  addBtnText="Create Adjustment"
                />
        
                {/* 4. Data Table Section */}
                  {/* <DataTable
                    columns={columns} 
                    data={finalData} 
                    rowConfig={rowConfig}
                    onEdit={openEditDialog}
                    onDelete={openDeleteDialog}
                  /> */}
                
        
              </div>
            </div>
  )
}

export default page
