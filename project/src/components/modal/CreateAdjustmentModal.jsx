"use client";

import React, { useState } from "react";
import { X, Scale } from "lucide-react";

export default function CreateAdjustmentModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    adjustmentId: `ADJ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    warehouse: "",
    product: "",
    type: "Addition",
    quantity: "",
    reason: "",
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.warehouse || !form.product || !form.quantity) return;

    onSave?.({
      ...form,
      quantity: Number(form.quantity),
      adjustmentDate: new Date().toISOString(),
      status: "Pending"
    });

    onClose();
  };

  const inputClass = "w-full border border-gray-300 p-2.5 rounded-lg text-sm outline-none focus:border-[#0C6263] focus:ring-1 focus:ring-[#0C6263] transition-all";

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0C6263]/10 rounded-lg">
              <Scale size={18} className="text-[#0C6263]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">New Stock Adjustment</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Adjustment ID</label>
              <input name="adjustmentId" value={form.adjustmentId} readOnly className={`${inputClass} bg-gray-50 cursor-not-allowed`} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Adjustment Type</label>
              <select name="type" value={form.type} onChange={handleChange} className={inputClass}>
                <option value="Addition">Addition (+)</option>
                <option value="Subtraction">Subtraction (-)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Warehouse</label>
            <input name="warehouse" value={form.warehouse} onChange={handleChange} placeholder="e.g. Main Warehouse" className={inputClass} required />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Product Name</label>
            <input name="product" value={form.product} onChange={handleChange} placeholder="Search or enter product" className={inputClass} required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Quantity</label>
              <input type="number" name="quantity" value={form.quantity} onChange={handleChange} placeholder="0" className={inputClass} required />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Reason</label>
              <select name="reason" value={form.reason} onChange={handleChange} className={inputClass} required>
                <option value="">Select Reason</option>
                <option value="Damaged">Damaged</option>
                <option value="Found in Audit">Found in Audit</option>
                <option value="Theft/Loss">Theft/Loss</option>
                <option value="Correction">Data Entry Correction</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-end gap-3 pt-4 mt-4">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2 text-sm font-medium bg-[#0C6263] text-white rounded-lg hover:bg-[#084d4e] shadow-md transition-all active:scale-95">
              Save Adjustment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}