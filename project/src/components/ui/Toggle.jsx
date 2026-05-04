"use client";
import { useState } from "react";

const Toggle = ({ label = "Remember Me", checked, onChange }) => {
  return (
    <div className="flex items-center gap-3">

      {/* Switch */}
      <button
        onClick={() => onChange(!checked)}
        className={`
          relative w-11 h-6 rounded-full transition-all duration-300
          ${checked ? "bg-[#0C6263]" : "bg-gray-300"}
        `}
      >
        {/* Circle */}
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5  bg-white rounded-full shadow-md
            transform transition-all duration-300
            ${checked ? "translate-x-5" : "bg-[#0C6263]"}
          `}
        />
      </button>

      {/* Label */}
      <span className="text-sm text-white font-medium">
        {label}
      </span>

    </div>
  );
};

export default Toggle;