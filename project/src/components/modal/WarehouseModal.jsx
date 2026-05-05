"use client"

import React, { useState } from 'react'
import { X, Warehouse, MapPin, User, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'

const WarehouseModal = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    manager: '',
    phone: '',
    status: 1
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-teal-50 rounded-lg">
              <Warehouse className="text-[#0C6263]" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-800">Add New Warehouse</h3>
              <p className="text-xs text-slate-500">Enter details to create a new storage location.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Warehouse Name</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#0C6263] transition-all">
              <Warehouse size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="e.g. Main Karachi Warehouse"
                className="bg-transparent outline-none text-sm w-full"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Location / Address</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#0C6263] transition-all">
              <MapPin size={18} className="text-gray-400" />
              <input 
                type="text" 
                placeholder="e.g. Korangi Industrial Area"
                className="bg-transparent outline-none text-sm w-full"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Manager Name</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#0C6263] transition-all">
                <User size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Ahmed Khan"
                  className="bg-transparent outline-none text-sm w-full"
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Contact Number</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-[#0C6263] transition-all">
                <Phone size={18} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="03xx-xxxxxxx"
                  className="bg-transparent outline-none text-sm w-full"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Status</label>
            <select 
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#0C6263]"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: Number(e.target.value)})}
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 mt-6">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-medium text-slate-600 hover:bg-gray-50 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <Button 
              text="Save Warehouse" 
              type="submit"
              className="font-bold px-8 shadow-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default WarehouseModal;