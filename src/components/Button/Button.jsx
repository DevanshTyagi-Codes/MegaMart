import React from "react";

const Button = ({ type = "submit", className, children, ...props }) => {
  return (
    <button
      type={type}
      className={`outline-none  h-10 px-3 py-1 rounded hover:scale-105 duration-100 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
