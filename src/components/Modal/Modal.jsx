import React from "react";
import { createPortal } from "react-dom";
import { AiOutlineClose } from "react-icons/ai";

const Modal = ({ isModalOpen, onClose, children, className }) => {
  if (!isModalOpen) return null;

  return createPortal(
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40`}
        onClick={onClose}
      />

      <div className={`fixed inset-0 z-50 flex justify-center items-center`}>
        <div
          className={`bg-white p-5 rounded-lg relative w-full min-h-[80vh] m-4 ${className}`}
        >
          <AiOutlineClose
            className="text-2xl absolute top-5 right-3 cursor-pointer"
            onClick={onClose}
          />
          {children}
        </div>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
