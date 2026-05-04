import React from "react";

const StatsCard = ({ title, value, color = "bg-blue-500", icon }) => {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl p-5
        bg-white/80 backdrop-blur-md
        border border-gray-100
        shadow-sm hover:shadow-xl
        transition-all duration-300
        hover:-translate-y-1
      "
    >
      {/* 🔹 Left Accent Bar */}
      <div className={`absolute left-0 top-0 h-full w-1.5 ${color}`} />

      {/* 🔹 Content */}
      <div className="flex items-center justify-between">
        
        {/* Text */}
        <div className="flex flex-col gap-2" >
          <h6 className="text-muted">{title}</h6>

          <h3 >{value}</h3>
        </div>

        {/* Icon */}
        <div
          className={`
            h-11 w-11 2xl:h-12 2xl:w-12
            flex items-center justify-center
            rounded-xl text-white
            ${color} shadow-md
          `}
        >
          {icon}
        </div>
      </div>

      {/* 🔹 Glow Effect */}
      <div
        className={`
          absolute -right-6 -top-6
          w-24 h-24 ${color}
          opacity-20 rounded-full blur-2xl
        `}
      />
    </div>
  );
};

export default StatsCard;