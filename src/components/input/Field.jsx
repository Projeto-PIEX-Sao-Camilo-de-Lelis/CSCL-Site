import { useState } from "react";

export default function Field({
  type,
  placeholder,
  value,
  onChange,
  onKeyPress,
  className,
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyPress={onKeyPress}
      className={`
        w-full px-4 py-3 bg-zinc-700/50 border border-zinc-600/50 rounded-xl
        text-white placeholder-gray-400 
        focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
        hover:border-zinc-500/50 transition-all duration-300
        backdrop-blur-sm
        ${className}
      `}
      {...props}
    />
  );
}
