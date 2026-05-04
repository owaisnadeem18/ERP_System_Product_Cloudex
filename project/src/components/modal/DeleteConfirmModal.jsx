"use client";
import React from 'react';
import { AlertTriangle, X } from "lucide-react";

const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, itemName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-red-600">
              <AlertTriangle size={24} />
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
              <X size={20} />
            </button>
          </div>

          <h3 className="text-xl font-bold text-slate-800 mb-2">Confirm Delete</h3>
          <p className="text-slate-500 text-sm leading-relaxed">
            Are you sure you want to delete <span className="font-semibold text-slate-800">"{itemName}"</span>? 
            This action cannot be undone and will remove the record from your database.
          </p>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-gray-500 hover:bg-gray-200 rounded-xl transition-all"
          >
            No, Keep it
          </button>
          <button 
            onClick={onConfirm}
            className="flex-1 px-4 py-2.5 text-sm font-bold bg-red-600 text-white hover:bg-red-700 rounded-xl shadow-lg shadow-red-200 transition-all"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;