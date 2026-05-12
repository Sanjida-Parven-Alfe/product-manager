import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="relative w-full max-w-md">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-400"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search products..."
        className="w-full bg-white/70 backdrop-blur-md border border-indigo-200 rounded-xl pl-10 pr-10 py-3 text-indigo-900 placeholder-indigo-300 text-sm focus:outline-none focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100 transition-all shadow-sm"
      />
      {value && (
        <button
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-400 hover:text-indigo-600 transition-colors"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
