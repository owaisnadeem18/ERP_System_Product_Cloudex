import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputPassword = ({
  name,
  label = "Password",
  placeholder = "Enter password",
  register,
  error,
  className = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full flex flex-col gap-1 ">

      {/* Label */}
      <label className="text-sm md:text-text-secondary text-white font-medium">
        {label}
      </label>

      {/* Input Wrapper */}
      <div
  className={`
    relative flex items-center
    px-3 py-3
    border rounded-xl
    bg-white
    shadow-sm
    transition
    focus-within:border-blue-500
    ${error 
      ? "border-red-500 focus-within:border-red-500" 
      : "border-gray-300"
    }
    ${className}
  `}
>
        <input
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none text-black pr-10"
          {...(register && name ? register(name) : {})}
        />

        {/* Eye Toggle */}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 text-text-secondary cursor-pointer"
        >
          {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-xs text-red-500 ml-1">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default InputPassword;