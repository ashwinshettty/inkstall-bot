import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { HiX } from 'react-icons/hi';

const Modal = ({ isOpen, onClose, title, children, footer = null }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset'; // Re-enable scrolling when modal is closed
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
      <div 
        ref={modalRef}
        className="bg-white dark:bg-gray-800/95 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col fade-in backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10"
      >
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 focus:outline-none"
          >
            <HiX className="h-6 w-6" />
          </button>
        </div>
        
        <div className="px-6 py-4 overflow-y-auto flex-1">
          {children}
        </div>
        
        {footer && (
          <div className="px-6 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 rounded-b-lg">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;