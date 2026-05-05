"use client";

import React, { useState } from "react";
import { X, ArrowRightLeft } from "lucide-react";

export default function CreateTransferModal({ isOpen, onClose, onSave }) {
  const [form, setForm] = useState({
    transferNumber: "",
    source: "",
    destination: "",
    itemsCount: "",
    status: "Pending",
  });
  const [errors, setErrors] = useState({});

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) setErrors({ ...errors, [name]: false });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.transferNumber) newErrors.transferNumber = true;
    if (!form.source) newErrors.source = true;
    if (!form.destination) newErrors.destination = true;
    if (!form.itemsCount || form.itemsCount <= 0) newErrors.itemsCount = true;
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    onSave?.({
      ...form,
      itemsCount: Number(form.itemsCount),
      // Consistent with your image_01f017.png date format
      transferDate: new Date().toISOString(), 
    });

    onClose();
    // Reset form after save
    setForm({ transferNumber: "", source: "", destination: "", itemsCount: "", status: "Pending" });
  };

  const inputClass = (name) => `
    w-full border p-2.5 rounded-lg text-sm outline-none transition-all
    ${errors[name] ? "border-red-500 bg-red-50" : "border-gray-300 focus:border-[#0C6263] focus:ring-1 focus:ring-[#0C6263]"}
  `;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-100 p-4">
      
      <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#0C6263]/10 rounded-lg">
                <ArrowRightLeft size={18} className="text-[#0C6263]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">New Inventory Transfer</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          
          {/* Row 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Transfer Number</label>
              <input
                name="transferNumber"
                value={form.transferNumber}
                onChange={handleChange}
                placeholder="e.g. TRF-2026-001"
                className={inputClass("transferNumber")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Status</label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className={inputClass("status")}
              >
                <option>Pending</option>
                <option>In-Transit</option>
                <option>Completed</option>
              </select>
            </div>
          </div>

          {/* Row 2: Source & Destination */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Source Warehouse</label>
              <input
                name="source"
                value={form.source}
                onChange={handleChange}
                placeholder="Select Source"
                className={inputClass("source")}
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-medium text-gray-600">Destination Warehouse</label>
              <input
                name="destination"
                value={form.destination}
                onChange={handleChange}
                placeholder="Select Destination"
                className={inputClass("destination")}
              />
            </div>
          </div>

          {/* Row 3: Items Count */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-600">Number of Items</label>
            <input
              type="number"
              name="itemsCount"
              value={form.itemsCount}
              onChange={handleChange}
              placeholder="Total quantity to transfer"
              className={inputClass("itemsCount")}
            />
          </div>

        </div>

        {/* Actions */}
        <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm font-medium bg-[#0C6263] text-white rounded-lg hover:bg-[#084d4e] shadow-md shadow-[#0C6263]/20 transition-all active:scale-95"
          >
            Confirm Transfer
          </button>
        </div>

      </div>
    </div>
  );
}