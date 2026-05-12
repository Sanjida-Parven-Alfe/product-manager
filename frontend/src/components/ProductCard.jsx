import { Pencil, Trash2, DollarSign, Image as ImageIcon } from "lucide-react";
import { Card, CardBody, CardFooter } from "./ui/Card";

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (
    <Card hover className="h-full flex flex-col group relative">
      {/* Action Overlay */}
      <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <button
          onClick={() => onEdit(product)}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-indigo-600 flex items-center justify-center shadow-lg hover:bg-indigo-50 hover:scale-110 transition-all"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(product._id)}
          className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-red-500 flex items-center justify-center shadow-lg hover:bg-red-50 hover:scale-110 transition-all"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Image */}
      <div className="relative h-48 bg-slate-50 overflow-hidden shrink-0 border-b border-slate-100/50">
        {product.image?.url ? (
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
            <ImageIcon size={48} strokeWidth={1} />
            <span className="text-xs mt-2 font-medium">No Image</span>
          </div>
        )}
      </div>

      {/* Content */}
      <CardBody className="flex-1 flex flex-col pt-5">
        <h3 className="text-slate-800 font-bold text-lg leading-tight mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-1">
          {product.description}
        </p>
      </CardBody>

      <CardFooter className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <DollarSign size={16} className="text-emerald-500" />
          <span className="text-slate-800 font-black text-xl tracking-tight">
            {Number(product.price).toFixed(2)}
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          In Stock
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
