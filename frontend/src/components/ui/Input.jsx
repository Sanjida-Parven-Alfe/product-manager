import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  className = '', 
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-slate-700 text-xs font-bold tracking-wider uppercase mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon 
            size={16} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" 
          />
        )}
        <input
          ref={ref}
          className={`
            w-full bg-white/60 border border-slate-200 rounded-xl 
            ${Icon ? 'pl-11 pr-4' : 'px-4'} py-3 
            text-slate-800 placeholder-slate-400 text-sm 
            focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 
            transition-all duration-200 backdrop-blur-sm
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/10' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1.5 text-red-500 text-xs font-medium">{error}</p>}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
