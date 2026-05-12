import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  loading = false, 
  icon: Icon,
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none rounded-xl";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-md shadow-indigo-200/50 hover:shadow-lg hover:shadow-indigo-300/50",
    secondary: "bg-white text-indigo-700 border border-indigo-100 hover:bg-indigo-50 shadow-sm",
    outline: "border-2 border-indigo-200 text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50",
    ghost: "text-indigo-600 hover:bg-indigo-50",
    danger: "bg-red-50 text-red-600 hover:bg-red-100 border border-red-100",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 size={16} className="animate-spin" /> : Icon && <Icon size={16} />}
      {children}
    </button>
  );
};

export default Button;
