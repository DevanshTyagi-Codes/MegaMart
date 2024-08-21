import React, { useId } from "react";

const Input = ({ type = "text", label, className, ...props } , ref) => {
  const id = useId();
  return (
    <div className={`${className}`}>
      {label && (
        <label className={`inline-block mb-1 pl-1`} htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-3 py-2 rounded bg-white text-black outline-none focus:bg-gray-50 duration-200 border-2 border-gray-500 w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
};

export default React.forwardRef(Input);
