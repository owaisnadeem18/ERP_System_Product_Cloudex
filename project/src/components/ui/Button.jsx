import React from 'react';

export default function Button({ 
  text, 
  icon: Icon, 
  onClick, 
  className = "", 
  type = "button",
  variant = "primary" // Default variant primary
}) {
  
  // Cloudex Brand Colors Variants
  const variants = {
    primary: "bg-[#0C6263] hover:bg-[#0C925E] text-white shadow-lg shadow-[#0C6263]/20",
    outline: "border-2 border-[#0C6263] text-[#0C6263] hover:bg-[#0C6263]/5",
    ghost: "text-[#0C6263] hover:bg-gray-100"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 
        px-5 py-2.5 rounded-xl 
        font-semibold text-sm 
        transition-all duration-300 
        active:scale-95 
        ${variants[variant]} 
        ${className}
      `}
    >
        
      {Icon && <Icon size={18} className="shrink-0" />}
      
      <span>{text}</span>
    </button>
  );
}