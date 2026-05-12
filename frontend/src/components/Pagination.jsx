import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";

const Pagination = ({ currentPage, totalPages, onPageChange, variant = 'light' }) => {
  if (totalPages <= 1) return null;

  const isDark = variant === 'dark';
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const baseBtnClass = `w-11 h-11 p-0 rounded-xl flex items-center justify-center transition-all shadow-sm disabled:opacity-30 disabled:cursor-not-allowed`;
  const inactiveBtnClass = isDark 
    ? 'bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:border-indigo-500 hover:bg-slate-700' 
    : 'bg-white border border-slate-200 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50';

  return (
    <div className="flex items-center justify-center gap-3 mt-12 mb-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${baseBtnClass} ${inactiveBtnClass}`}
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex gap-2 items-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-11 h-11 rounded-xl text-sm font-bold transition-all duration-300
              ${currentPage === page 
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 scale-105' 
                : inactiveBtnClass}
            `}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${baseBtnClass} ${inactiveBtnClass}`}
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default Pagination;
