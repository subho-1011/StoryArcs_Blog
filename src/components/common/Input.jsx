import React, { useId } from "react";

// TODO : use forwardRef read more docs
const Input = React.forwardRef(function Input(
  { label, text, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full py-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        defaultValue={text}
        type={type}
        className={`mt-1 block w-full h-8 px-3 rounded-md border-gray-300 shadow-sm focus:outline-sky-200 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
        {...props}
        ref={ref}
        id={id}
      ></input>
    </div>
  );
});

export default Input;
