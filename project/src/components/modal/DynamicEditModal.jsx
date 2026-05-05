"use client";
import React, { useState, useEffect } from 'react';
import { X, Save } from "lucide-react";

const DynamicEditModal = ({ isOpen, onClose, onSave, initialData, fields, title }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-50 bg-[#0C6263]/5">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full text-gray-400"><X size={20} /></button>
        </div>

        {/* Dynamic Body */}
        <div className="p-6 space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{field.label}</label>
              {field.type === 'select' ? (
                <select 
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm bg-white"
                >
                  {field.options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              ) : (
                <input 
                  name={field.name}
                  type={field.type || "text"}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#0C6263] outline-none text-sm"
                />
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2 text-sm font-semibold text-gray-500">Cancel</button>
          <button onClick={() => onSave(formData)} className="px-6 py-2 bg-[#0C6263] text-white rounded-xl text-sm font-bold">
            Update Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DynamicEditModal;