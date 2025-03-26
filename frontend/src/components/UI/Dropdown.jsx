import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ trigger, items, direction = 'down' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div>
        {React.cloneElement(trigger, {
          onClick: (e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }
        })}
      </div>
      
      {isOpen && (
        <div className={`absolute right-0 z-50 ${
          direction === 'up' ? 'bottom-full mb-2' : 'mt-2'
        } w-48 origin-top-right rounded-md bg-white dark:bg-gray-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-gray-700 focus:outline-none`}>
          {items.map((item, index) => (
            <div
              key={index}
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => {
                item.onClick();
                setIsOpen(false);
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
