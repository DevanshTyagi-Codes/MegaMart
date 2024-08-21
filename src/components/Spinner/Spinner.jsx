import React from "react";

const Spinner = ({className}) => {
  return (
    <div className={`border-gray-300 h-8 w-8 animate-spin rounded-full border-4 border-t-blue-600 ${className}`} />
  )
};

export default Spinner;
