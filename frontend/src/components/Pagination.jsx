import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-4 mt-12 mb-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-12 h-12 p-0 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      <div className="flex gap-2 items-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-12 h-12 rounded-2xl text-sm font-black transition-all duration-300
              ${currentPage === page 
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-xl shadow-indigo-500/20 scale-110 border border-white/10' 
                : 'bg-white/5 text-slate-500 hover:text-white hover:bg-white/10 border border-white/5'}
            `}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-12 h-12 p-0 rounded-2xl flex items-center justify-center bg-white/5 border border-white/5 text-slate-500 hover:text-white hover:bg-white/10 transition-all disabled:opacity-20 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default Pagination;
