import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./ui/Button";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-12 mb-8">
      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="w-10 h-10 p-0 rounded-full flex items-center justify-center"
      >
        <ChevronLeft size={16} />
      </Button>

      <div className="flex gap-1.5 items-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`
              w-10 h-10 rounded-full text-sm font-bold transition-all duration-200
              ${currentPage === page 
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-200 scale-110' 
                : 'bg-white/60 text-slate-600 hover:bg-white hover:text-indigo-600 border border-slate-200 hover:border-indigo-200'}
            `}
          >
            {page}
          </button>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="w-10 h-10 p-0 rounded-full flex items-center justify-center"
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default Pagination;
