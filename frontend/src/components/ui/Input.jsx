import React from 'react';

const Input = React.forwardRef(({ 
  label, 
  error, 
  icon: Icon,
  variant = 'light',
  className = '', 
  ...props 
}, ref) => {
  const isDark = variant === 'dark';
  
  return (
    <div className="w-full">
      {label && (
        <label className={`block text-slate-500 text-[10px] font-black tracking-[0.15em] uppercase mb-2 ml-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon 
            size={16} 
            className={`absolute left-5 top-1/2 -translate-y-1/2 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} 
          />
        )}
        <input
          ref={ref}
          className={`
            w-full rounded-2xl 
            ${Icon ? 'pl-12 pr-5' : 'px-5'} py-3.5 
            text-sm transition-all duration-200 outline-none
            ${isDark 
              ? 'bg-[#0f0d13] border-white/5 text-white placeholder:text-slate-700 focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5' 
              : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5'}
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/5' : ''}
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
