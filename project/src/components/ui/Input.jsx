import React from "react";

const Input = ({
  type = "text",
  placeholder = " ",
  label ,
  register,
  name,
  error,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label 
          htmlFor={name} 
          className="text-sm md:text-text-secondary text-white font-medium"
        >
          {label}
        </label>
      )}
      <div
        className={`
          relative flex items-center
          px-3 py-3
          border border-gray-300
          rounded-xl
          bg-white
          shadow-sm

          focus-within:border-blue-500
          transition
           ${error ? "border-red-500 focus-within:border-red-500" : "border-border  focus-within:border-blue-500"}
          ${className}
        `}
      >
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          className="peer w-full bg-transparent outline-none text-gray-700"
          {...(register && name ? register(name) : {})}
          {...props}
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 ml-1">{error.message}</p>
      )}
    </div>
  );
};

export default Input;