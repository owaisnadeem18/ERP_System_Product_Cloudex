"use client";

import React, { useState, useEffect } from 'react';
import { Edit3, Trash2, ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({ columns, data, rowConfig }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [data.length]);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="flex flex-col gap-4">
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
              {currentData.length > 0 ? (
                currentData.map((row, rowIndex) => (
                  <tr key={rowIndex} className="hover:bg-[#0C6263]/5 transition-all duration-200 group">
                    {columns.map((col) => (

                      <td key={col} className="px-6 py-4 text-sm text-gray-700">
                        {(() => {
                          if (rowConfig && rowConfig[col]) {
                            return rowConfig[col](row);
                          }

                          const searchKey = col.toLowerCase().replace(/ /g, "");

                          const actualKey = Object.keys(row).find(
                            (key) => key.toLowerCase() === searchKey
                          );

                          const value = actualKey !== undefined ? row[actualKey] : row[col];

                          return value ?? "-";
                        })()}
                      </td>

                    ))}

                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end items-center gap-2">
                        <button className="p-2 text-gray-400 hover:text-[#0C6263] hover:bg-[#0C6263]/10 rounded-lg transition-all">
                          <Edit3 size={16} />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length + 1} className="px-6 py-10 text-center text-gray-400 italic text-sm">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="px-2 flex items-center justify-between sm:flex-row flex-col gap-3">
        <span className="text-xs font-semibold text-gray-500">
          Showing <span className="text-gray-900">{data.length > 0 ? startIndex + 1 : 0}</span> to <span className="text-gray-900">{Math.min(startIndex + itemsPerPage, data.length)}</span> of <span className="text-gray-900">{data.length}</span> entries
        </span>

        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#0C6263] disabled:opacity-30 transition-all shadow-sm"
          >
            <ChevronLeft size={16} />
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1
                  ? 'bg-[#0C6263] text-white shadow-lg'
                  : 'bg-white border border-gray-200 text-gray-500 hover:bg-gray-50'
                }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="p-2 rounded-xl border border-gray-200 bg-white text-gray-600 hover:border-[#0C6263] disabled:opacity-30 transition-all shadow-sm"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}