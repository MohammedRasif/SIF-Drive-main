import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className = "",
  ...rest
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const effectiveType = isPassword && isPasswordVisible ? "text" : type;

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div className="relative w-full">
        <input
          type={effectiveType}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
            isPassword ? "pr-10" : ""
          }`}
          {...rest}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700 hover:cursor-pointer"
          >
            {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
