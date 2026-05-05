import React from 'react';
import { Search, Plus } from "lucide-react";
import Button from "@/components/ui/Button";

const DataTableActions = ({ 
  searchQuery, 
  setSearchQuery, 
  pageSize, 
  setPageSize, 
  onAddClick, 
  addBtnText = "Add Item",
  placeholder = "Search..." 
}) => {
  return (
    <div className="flex gap-3 flex-col-reverse sm:flex-row sm:justify-between w-full">
      <div className="flex gap-3 sm:items-center sm:flex-row flex-col">
        {/* Search Bar */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-xl focus-within:border-[#0C6263] transition">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder={placeholder}
            className="bg-transparent outline-none text-sm w-40"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Entries Dropdown */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 px-3 py-2 rounded-xl w-fit">
          <span>Show</span>
          <select 
            value={pageSize} 
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="outline-none bg-transparent cursor-pointer font-bold text-[#0C6263]"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
          <span>entries</span>
        </div>
      </div>

      {/* Dynamic Button */}
      <Button 
        icon={Plus} 
        text={addBtnText} 
        onClick={onAddClick} 
      />
    </div>
  );
};

export default DataTableActions;