"use client";

import React, { useState } from 'react';
import { Edit3, Trash2, ChevronLeft, ChevronRight, MoreVertical } from "lucide-react";

export default function DataTable({ columns, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination Logic
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {columns.map((col) => (
                <th key={col} className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-gray-500">
                  {col}
                </th>
              ))}
              <th className="px-6 py-5 text-[11px] font-extrabold uppercase tracking-widest text-gray-500 text-right">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="divide-y divide-gray-50">
            {currentData.map((row, index) => (
              <tr key={index} className="hover:bg-[#0C6263]/5 transition-all duration-200 group">
                <td className="px-6 py-4 text-sm font-bold text-[#0C6263]">{row.id}</td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">{row.name}</td>
                <td className="px-6 py-4 text-sm text-gray-500 font-mono">{row.contact}</td>
                <td className="px-6 py-4 text-sm">
                  {row.status === 1 ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold bg-[#0C925E]/10 text-[#0C925E] border border-[#0C925E]/20">
                      ● Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-[11px] font-bold bg-red-50 text-red-600 border border-red-100">
                      ● Inactive
                    </span>
                  )}
                </td>
                
                {/* Action Buttons with Lucide Icons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-[#0C6263] hover:bg-[#0C6263]/10 rounded-lg transition-all" title="Edit">
                      <Edit3 size={16} />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Professional Pagination Footer */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs font-semibold text-gray-500">
          Showing <span className="text-gray-900">{startIndex + 1}</span> to <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-gray-900">{data.length}</span> entries
        </span>

        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#0C6263] hover:text-[#0C6263] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={18} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-xs font-bold transition-all ${
                currentPage === i + 1 
                ? 'bg-[#0C6263] text-white shadow-md shadow-[#0C6263]/20' 
                : 'bg-white border border-gray-200 text-gray-600 hover:border-[#0C6263]'
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-lg border border-gray-200 bg-white text-gray-600 hover:border-[#0C6263] hover:text-[#0C6263] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}