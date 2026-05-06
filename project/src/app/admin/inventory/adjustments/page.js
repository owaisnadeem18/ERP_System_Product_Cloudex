"use client"

import DataStatsInfo from '@/components/general/DataStatsInfo';
import DataTable from '@/components/general/DataTable';
import DataTableActions from '@/components/general/DataTableActions';
import HeadingAndDescription from '@/components/general/HeadingAndDescription';
import CreateAdjustmentModal from '@/components/modal/CreateAdjustmentModal'
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import DynamicEditModal from '@/components/modal/DynamicEditModal';
import { inventoryAdjustments } from '@/lib/data/inventoryAdjustments';
import { confirmDelete } from '@/utils/confirmDelete';
import React, { useState } from 'react'

const page = () => {

  const [data, setData] = useState(inventoryAdjustments);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const openDeleteDialog = (row) => {
    confirmDelete({
      item: row ,
      data,
      setData,
      key: "adjustmentId",
      entity: "Adjustment"
    });

    console.log("Delete clicked for:", row);
  };

  const openEditDialog = (item) => {

  setItemToEdit({
    ...item,
    type: item.type 
  });
  setIsEditModalOpen(true);
};

  const handleUpdate = (updatedItem) => {
    console.log("Updated item:", updatedItem);
    setIsEditModalOpen(false);
    if (updatedItem && updatedItem.adjustmentId) {
      const updatedData = data.map((d) =>
        d.adjustmentId === updatedItem.adjustmentId ? { ...d, ...updatedItem } : d
      );
      setData(updatedData);
    }

  }

const formattedData = data.map(item => ({
  adjustmentId: item.adjustmentId,
  warehouse: item.warehouse?.name,
  product: item.product?.name,
  type: item.type,
  quantity: item.quantity,
  reason: item.reason,
  status: item.status,
  date: new Date(item.adjustmentDate).toLocaleDateString(),
}));

  const filteredData = formattedData.filter(item =>
  (item.adjustmentId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (item.warehouse || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
  (item.product || "").toLowerCase().includes(searchQuery.toLowerCase())
);

  const finalData = filteredData.slice(0, pageSize);

const columns = [
  "Adjustment ID",
  "Warehouse",
  "Product",
  "Type",
  "Quantity",
  "Reason",
  "Status",
  "Date"
];

  const rowConfig = {
    style: (row) => {
      if (row.original.status === "Pending") return "bg-yellow-50";
      if (row.original.status === "Approved") return "bg-green-50";
      if (row.original.status === "Rejected") return "bg-red-50";
      return "";
    }
  };

    


  const adjustmentFields = [
    { name: "warehouse", label: "Warehouse", type: "text" },
    { name: "product", label: "Product Name", type: "text" },
  { 
    name: "type", 
    label: "Adjustment Type", 
    type: "select", 
    options: [
      { value: "Addition", label: "Addition" },
      { value: "Subtraction", label: "Subtraction" }
    ]
  },
    { name: "quantity", label: "Quantity", type: "number" },
    { name: "reason", label: "Reason", type: "text" },
  ];


  return (
    <div className='page-container flex flex-col gap-6 animate-in fade-in duration-500'>
    
          <CreateAdjustmentModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)} 
          />
    
          <DynamicEditModal
            isOpen={isEditModalOpen}
            onClose={() => setIsEditModalOpen(false)}
            initialData={itemToEdit}
            fields={adjustmentFields}
            onSave={handleUpdate}
            title={itemToEdit ? `Edit Adjustment #${itemToEdit.adjustmentId}` : "Edit Adjustment"}
          />
          
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
              <DataTable
                columns={columns} 
                data={finalData} 
                rowConfig={rowConfig}
                onEdit={openEditDialog}
                onDelete={openDeleteDialog}
              />
            
    
          </div>
        </div>
  )
}

export default page
