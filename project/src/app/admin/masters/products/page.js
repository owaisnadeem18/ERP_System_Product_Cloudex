"use client";
import React, { useState } from 'react'
import DataTable from "@/components/general/DataTable";
import Button from "@/components/ui/Button";
import { Plus, Search, Package, CheckCircle2, AlertCircle } from "lucide-react";
import { productsData } from '@/lib/data/productData';
import ProductModal from '@/components/modal/ProductModal';
import DeleteConfirmModal from '@/components/modal/DeleteConfirmModal';

const ProductMaster = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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


  const openDeleteDialog = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      const updatedData = data.filter((item) => item.id !== itemToDelete.id);
      setData(updatedData);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

    const columns = ["ID", "Name", "Barcode", "Price", "Is Tax Applicable", "Quantity", "Status"];

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

      {/* 1. Page Heading */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div className="space-y-1">
          <h2 className="heading-spacing text-2xl font-bold text-slate-800">Product Master</h2>
          <p className="text-muted max-w-xl">
            Manage your inventory, track stock levels, and maintain product pricing efficiently.
          </p>
        </div>
      </div>

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
              {data.filter((p) => p.quantity > 0).length}
            </span>
          </div>
          <CheckCircle2 className="text-green-600/20" size={32} />
        </div>

        <div className="section flex justify-between items-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col">
            <span className="text-muted text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            <span className="text-2xl font-bold text-red-500">
              {data.filter((p) => p.quantity === 0).length}
            </span>
          </div>
          <AlertCircle className="text-red-500/20" size={32} />
        </div>
      </div>

      {/* 3. Actions & Table Area */}
      <div className="flex flex-col gap-4">
        
        {/* Search and Add Button Group */}
        <div className="flex gap-3 flex-col-reverse sm:flex-row sm:justify-between w-full">
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2.5 rounded-xl focus-within:border-[#0C6263] focus-within:ring-2 focus-within:ring-teal-500/10 transition-all shadow-sm w-full sm:w-80">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or barcode..."
              className="bg-transparent outline-none text-sm w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button icon={Plus} text="Add Product" className="font-bold shadow-md" onClick={() => setIsModalOpen(true)} />
        </div> 

        {/* 4. Data Table Container */}
          <DataTable columns={columns} data={filteredData} rowConfig={rowConfig} onDelete={openDeleteDialog} />
        
      </div>

    </div>
  )
}

export default ProductMaster;