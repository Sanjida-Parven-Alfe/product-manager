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
        <label className="block text-slate-500 text-[10px] font-black tracking-[0.15em] uppercase mb-2 ml-1">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon 
            size={16} 
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-600" 
          />
        )}
        <input
          ref={ref}
          className={`
            w-full bg-[#0f0d13] border border-white/5 rounded-2xl 
            ${Icon ? 'pl-12 pr-5' : 'px-5'} py-3.5 
            text-white placeholder:text-slate-700 text-sm 
            focus:outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 
            transition-all duration-200
            ${error ? 'border-red-500/50 focus:border-red-500' : ''}
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
