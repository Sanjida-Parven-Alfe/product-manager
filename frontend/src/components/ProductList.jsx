import ProductCard from "./ProductCard";
import Spinner from "./Spinner";
import { PackageOpen } from "lucide-react";

const ProductList = ({ products, loading, onEdit, onDelete }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <Spinner size="lg" />
        <p className="mt-4 text-indigo-500 font-medium animate-pulse">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="glass rounded-3xl flex flex-col items-center justify-center min-h-[400px] p-8 text-center border-dashed border-2 border-indigo-100">
        <div className="w-20 h-20 bg-indigo-50/50 rounded-full flex items-center justify-center mb-4">
          <PackageOpen size={40} className="text-indigo-400" />
        </div>
        <h3 className="text-slate-800 text-xl font-bold mb-2">No products found</h3>
        <p className="text-slate-500 max-w-sm">
          Get started by creating a new product. Your added products will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ProductList;
