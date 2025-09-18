import React from "react";
import ReactDOM from "react-dom";
import { IoClose } from "react-icons/io5";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Modal content
  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-fit max-w-7xl max-h-[90%] p-6 bg-[#e7e9f5] rounded-2xl shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-0 right-0 bg-red-500 text-white p-2 rounded-bl-[35px] ps-4 pb-4 hover:cursor-pointer"
        >
          <IoClose size={24} />
        </button>

        {/* Modal Content */}
        <div className="h-full">{children}</div>
      </div>
    </div>
  );

  // Use portal to render modal outside parent DOM hierarchy
  return ReactDOM.createPortal(modalContent, document.body);
}
