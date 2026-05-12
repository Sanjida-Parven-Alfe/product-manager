import React, { useEffect } from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full ${maxWidth} bg-[#1d1b20] border border-white/5 rounded-[2.5rem] shadow-3xl transform transition-all animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 sticky top-0 bg-[#1d1b20]/80 backdrop-blur-md z-10">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-white/5 transition-all"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
