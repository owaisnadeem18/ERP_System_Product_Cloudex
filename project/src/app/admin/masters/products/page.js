"use client";
import React, { useState } from 'react'
import DataTable from "@/components/general/DataTable";
import Button from "@/components/ui/Button";
import { Plus, Search, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { productsData } from '@/lib/data/productData';
import ProductModal from '@/components/modal/ProductModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';
import DynamicEditModal from '@/components/modal/DynamicEditModal';
import HeadingAndDescription from '@/components/general/HeadingAndDescription';
import DataStatsInfo from '@/components/general/DataStatsInfo';
import DataTableActions from '@/components/general/DataTableActions';

const ProductMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [pageSize, setPageSize] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [data, setData] = useState(productsData);
  
  const filteredData = data.filter((product) => {
      const searchStr = searchQuery.toLowerCase();
    return (
        product.name.toLowerCase().includes(searchStr) ||
        product.id.toLowerCase().includes(searchStr) ||
      product.barcode.includes(searchStr)
    );
  });

  const finalData = filteredData.slice(0, pageSize);


  const openDeleteDialog = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const openEditDialog = (row) => {
    setItemToEdit(row)
    setIsEditModalOpen(true);
  }

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updatedData = data.filter((item) => item.id !== itemToDelete.id);
      setData(updatedData);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleUpdateProduct = (updatedRow) => {
  const formattedRow = {
    ...updatedRow,
    status: Number(updatedRow.status),
    quantity: Number(updatedRow.quantity)
  };
  setData(prev => prev.map(item => item.id === formattedRow.id ? formattedRow : item));
  setIsEditModalOpen(false);
  setItemToEdit(null);
}

    const columns = ["ID", "Name", "Barcode", "Price", "Is Tax Applicable", "Quantity", "Status"];

    const productFields = [
      { name: "id", label: "Product ID", placeholder: "P-001" },
      { name: "name", label: "Product Name", placeholder: "Example Product" },
      { name: "barcode", label: "Barcode", placeholder: "1234567890123" },
      { name: "price", label: "Price", placeholder: "1000", type: "number" },
      { name: "isTaxApplicable", label: "Is Tax Applicable?", type: "select", options: [
        { value: true, label: "Yes" },
        { value: false, label: "No" },
      ]}, 
      { name: "quantity", label: "Quantity", placeholder: "50", type: "number" },
      { name: "status", label: "Status", type: "select", options: [
        { value: 1, label: "Active" },
        { value: 0, label: "Inactive" },
      ]},
    ];

const rowConfig = {
  "ID": (row) => <span className="font-bold text-[#0C6263]">{row.id}</span>,
  "Price": (row) => <span className="font-bold">Rs. {row.price.toLocaleString()}</span>,
  "Status": (row) => (
    row.status === 1 ? (
      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold bg-[#0C925E]/10 text-[#0C925E] border border-[#0C925E]/20">● Active</span>
    ) : (
      <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">● Inactive</span>
    )
  ),
  "Barcode": (row) => <span className="font-mono text-gray-500">{row.barcode}</span>,
};

  return (
    <div className="page-container flex flex-col gap-8 animate-in fade-in duration-500">

      <ProductModal
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete?.name || "this item"}
      />

      <DynamicEditModal
        title="Edit Product Info"
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleUpdateProduct}
        initialData={itemToEdit}
        fields={productFields}
      />

      {/* 1. Page Heading */}
      
      <HeadingAndDescription description={"Manage your product inventory, track stock levels, and maintain pricing efficiently."} title={"Product Master"} />
      

      {/* 2. Tiles Section (Inventory Specific) */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Total Products</span>
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
        
        <DataTableActions
          onAddClick={() => setIsModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          pageSize={pageSize}
          setPageSize={setPageSize}
          addBtnText='Add Product'
          placeholder='Search Products...'
        />

        {/* 4. Data Table Container */}
          <DataTable columns={columns} data={finalData} rowConfig={rowConfig} onDelete={openDeleteDialog} onEdit={openEditDialog}  />
        
      </div>

    </div>
  )
}

export default ProductMaster;