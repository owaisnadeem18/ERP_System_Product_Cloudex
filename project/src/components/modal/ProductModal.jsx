"use client";
import React from 'react';
import { X } from "lucide-react";
import Button from "@/components/ui/Button";

const ProductModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Add New Product</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200/50 rounded-full transition-colors text-gray-400 hover:text-gray-600">
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Product Name</label>
              <input type="text" placeholder="e.g. Wireless Mouse" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] focus:ring-2 focus:ring-teal-500/10 outline-none transition-all text-sm" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Barcode</label>
                <input type="text" placeholder="12345678" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Price</label>
                <input type="number" placeholder="0.00" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quantity</label>
                <input type="number" placeholder="0" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Tax Applicable</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm bg-white">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </button>
          <Button text="Save Product" className="shadow-lg shadow-teal-900/10" />
        </div>
      </div>
    </div>
  );
};

export default ProductModal;