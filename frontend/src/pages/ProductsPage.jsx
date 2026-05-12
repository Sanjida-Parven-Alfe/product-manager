import useProducts from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import Spinner from "../components/Spinner";
import Footer from "../components/Footer";
import { Package, Search, Filter, LayoutGrid } from "lucide-react";

const ProductsPage = () => {
  const {
    products,
    loading,
    pagination,
    search,
    setSearch,
    sort,
    setSort,
    handlePageChange,
  } = useProducts();

  return (
    <>
      <div className="min-h-screen pt-32 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
                Explore Our <span className="text-gradient">Catalog</span>
              </h1>
              <p className="text-slate-500 font-medium max-w-xl text-lg">
                Discover high-quality products curated for excellence. Manage,
                track, and explore with ease.
              </p>
            </div>

            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-2">
              <SearchBar
                value={search}
                onChange={setSearch}
                onClear={() => setSearch("")}
              />
            </div>
          </div>
        </div>

        {/* Stats / Filters Bar */}
        <div className="max-w-7xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 py-4 border-y border-slate-100">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-slate-600 font-semibold">
              <LayoutGrid size={18} className="text-indigo-600" />
              <span>{pagination?.total || 0} Products Available</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-sm font-bold hover:bg-slate-200 transition-colors border-none outline-none cursor-pointer"
            >
              <option value="default">Default Sorting</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>
        </div>

        {/* Grid Section */}
        <div className="max-w-7xl mx-auto mb-20">
          {loading ? (
            <div className="py-40">
              <Spinner size="lg" />
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    index={index}
                    onEdit={() => {}} // Disabled for public view or handled by dashboard
                    onDelete={() => {}} // Disabled for public view
                  />
                ))}
              </div>

              <div className="mt-16">
                <Pagination
                  currentPage={pagination?.page || 1}
                  totalPages={pagination?.pages || 1}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          ) : (
            <div className="py-32 text-center">
              <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">
                No products found
              </h3>
              <p className="text-slate-500">
                Try adjusting your search or check back later.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;
