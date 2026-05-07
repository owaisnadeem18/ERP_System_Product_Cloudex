"use client";
import React from 'react';

const Checkbox = ({ label, name, register, error, ...props }) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="relative flex items-center gap-3 cursor-pointer group">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            {...register(name)}
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-slate-300 bg-white transition-all checked:border-[#0C6263] checked:bg-[#0C6263] focus:outline-none"
            {...props}
          />
          {/* Checkmark Icon */}
          <svg
            className="absolute h-3.5 w-3.5 pointer-events-none hidden peer-checked:block stroke-white mt-0.5 ml-0.5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        
        {label && (
          <span className="text-sm font-medium text-slate-700 select-none">
            {label}
          </span>
        )}
      </label>
      
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error.message}</p>}
    </div>
  );
};

export default Checkbox;