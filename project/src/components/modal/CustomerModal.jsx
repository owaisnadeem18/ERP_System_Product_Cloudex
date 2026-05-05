"use client";
import React from 'react';
import { X } from "lucide-react";

const CustomerModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Add New Customer</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-400">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
            <input type="text" placeholder="Owais Nadeem" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Number</label>
              <input type="text" placeholder="+92 3xx xxxxxxx" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm bg-white">
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address (Optional)</label>
            <input type="email" placeholder="example@mail.com" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors">
            Cancel
          </button>
          <button className="px-6 py-2 bg-[#0C6263] text-white rounded-xl text-sm font-bold shadow-lg shadow-teal-900/20">
            Save Customer
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;