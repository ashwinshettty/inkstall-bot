import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  size = 'md',
  className = '',
  disabled = false,
  fullWidth = false,
  icon = null
}) => {
  const baseClasses = 'rounded-md flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary dark:focus:ring-primary-dark dark:bg-primary-dark dark:hover:bg-primary',
    secondary: 'bg-secondary text-gray-700 dark:bg-gray-700 dark:text-gray-100 hover:bg-secondary-dark dark:hover:bg-gray-600 focus:ring-secondary dark:focus:ring-gray-500',
    outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-300 dark:focus:ring-gray-500 bg-white dark:bg-gray-800',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500 dark:bg-red-700 dark:hover:bg-red-600',
    ghost: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${disabledClasses}
        ${widthClass}
        ${className}
      `}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;