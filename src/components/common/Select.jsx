import React, { useId } from "react";

function Select({ options, label, className, ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        id={id}
        ref={ref}
        {...props}
        className={`mt-1 block w-full h-8 px-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
