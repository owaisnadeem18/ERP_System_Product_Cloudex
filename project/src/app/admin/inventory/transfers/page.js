"use client"

import React, { useEffect, useState } from 'react'
import { inventoryTransfers } from '@/lib/data/inventoryTransfers'
import DataStatsInfo from '@/components/general/DataStatsInfo'
import HeadingAndDescription from '@/components/general/HeadingAndDescription'
import DataTableActions from '@/components/general/DataTableActions'
import DataTable from '@/components/general/DataTable'
import CreateTransferModal from '@/components/modal/CreateTransferModal'
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal'
import DynamicEditModal from '@/components/modal/DynamicEditModal'
import { confirmDelete } from '@/utils/confirmDelete'
import { useRouter } from 'next/navigation'

const InventoryTransfersPage = () => {

  const router = useRouter()



  const [data, setData] = useState(inventoryTransfers);

  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);


  // const [itemToEdit, setItemToEdit] = useState(null);



  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);


   useEffect(() => {
    const savedData = localStorage.getItem('transfers'); 
  
  if (savedData) {
    const parsedLocal = JSON.parse(savedData);
    
    const combinedData = [
      ...parsedLocal,
      ...inventoryTransfers.filter(mockItem => 
        !parsedLocal.some(localItem => localItem.id === mockItem.id)
      )
    ];
    
    setData(combinedData);
  }
}, []);

  const handleAddRedirect = () => {
    router.push('/admin/inventory/transfers/add');
  };

  const handleEditRedirect = (row) => {
    router.push(`/admin/inventory/transfers/edit/${row.transferid}`);
    console.log("Edit clicked for:", row);
  }

  // Row configuration for colors/actions
  const rowConfig = {
    showEdit: true,
    showDelete: true,
  };

  const formattedData = data.map(item => ({
  id: item.id ,
  transferid: item.transferNumber,
  source: item.sourceWarehouse?.name || "-",
  destination: item.destinationWarehouse?.name || "-",
  items: item.itemsCount,
  status: item.status,
  date: item.transferDate,
}));




  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row,
      data,
      setData,
      key: "transferid",
      entity: "Transfer"
    });
    console.log("Delete clicked for:", row);
  };


// const openEditDialog = (row) => {
//   setIsEditModalOpen(true); 
//   setItemToEdit(row);
// }

// const handleUpdate = (updatedRow) => {
//   const formattedRow = {
//     ...updatedRow,
//     transferNumber: updatedRow.transferid,
//   }

//   setData(prev => prev.map(item => item.transferNumber === formattedRow.transferNumber ? formattedRow : item));
//   setIsEditModalOpen(false);
//   setItemToEdit(null);
// }

  // Column Definitions

  const columns = [
  'Transfer ID',
  'Source',
  'Destination',
  'Items',
  'Status',
  'Date',
]; 

const transferFields = [
  { label: "Transfer ID", name: "transferid" },
  { label: "Source", name: "source" },
  { label: "Destination", name: "destination" },
  { label: "Items", name: "items" },
  { label: "Status", name: "status" },
  { label: "Date", name: "date" },
];

const filteredData = formattedData.filter(item => {
  return (
    item.transferid.toLowerCase().includes(searchQuery.toLowerCase()) ||  
    item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.destination.toLowerCase().includes(searchQuery.toLowerCase())
  )
})

const finalData = filteredData.slice(0, pageSize);

  return (
    <div className='page-container flex flex-col gap-6 animate-in fade-in duration-500'>

      {/* <CreateTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} 
      /> */}

      {/* <DynamicEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        initialData={itemToEdit}
        fields={transferFields}
        onSave={handleUpdate}
        title={itemToEdit ? `Edit Transfer #${itemToEdit.transferid}` : "Edit Transfer"}
      /> */}
      
      {/* 1. Heading Section */}
      <HeadingAndDescription
        title="Inventory Transfers" 
        description="Monitor and manage stock movement between different warehouses and branches." 
      />

      {/* 2. Stats Section */}
      <DataStatsInfo
        title="Total Transfers" 
        totalLength={data.length} 
        activeLength={data.filter(t => t.status === "In-Transit").length} 
        inactiveLength={data.filter(t => t.status === "Pending").length}        
      />

      <div className="flex justify-between flex-col gap-3">
        
        {/* 3. Actions Section (Search, Add, PageSize) */}
        <DataTableActions 
          placeholder="Search Transfer ID or Warehouse"
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onAddClick={handleAddRedirect}
          pageSize={pageSize}
          setPageSize={setPageSize}
          addBtnText="Create Transfer"
        />

        {/* 4. Data Table Section */}
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

export default InventoryTransfersPage;