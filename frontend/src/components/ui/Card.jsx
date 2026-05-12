import React from 'react';

export const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <div 
      className={`glass rounded-2xl overflow-hidden transition-all duration-300 ${hover ? 'hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-200/40 border-indigo-50/50 hover:border-indigo-100 group' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 py-5 border-b border-slate-100/50 ${className}`}>
    {children}
  </div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '' }) => (
  <div className={`px-6 py-4 bg-slate-50/50 border-t border-slate-100/50 ${className}`}>
    {children}
  </div>
);
