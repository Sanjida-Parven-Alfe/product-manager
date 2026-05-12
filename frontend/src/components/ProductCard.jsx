import { useState } from "react";
import { Star, Heart, Eye, Minus, Plus, ShoppingCart, Check } from "lucide-react";

const badgeStyles = {
  "Best Seller": { bg: "bg-amber-100", text: "text-amber-700" },
  "Recommended": { bg: "bg-slate-700", text: "text-white" },
  "New": { bg: "bg-emerald-100", text: "text-emerald-700" },
  "Hot": { bg: "bg-red-100", text: "text-red-700" },
  "Special": { bg: "bg-indigo-100", text: "text-indigo-700" }
};

const StarRating = ({ rating = 5 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        size={12}
        fill={s <= rating ? "#f59e0b" : "#e5e7eb"}
        stroke={s <= rating ? "#f59e0b" : "#e5e7eb"}
      />
    ))}
    <span className="text-[10px] text-slate-400 ml-1 font-medium">({rating}.00)</span>
  </div>
);

const ProductCard = ({ product, index }) => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  };

  // Mocking some fields if they don't exist in the DB yet
  const originalPrice = product.originalPrice || (product.price * 1.25);
  const discount = product.discount || Math.round(((originalPrice - product.price) / originalPrice) * 100);
  const badge = product.badge || (index % 5 === 0 ? "Best Seller" : index % 7 === 0 ? "Hot" : null);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative bg-white rounded-xl overflow-hidden transition-all duration-300 flex flex-col h-full ${
        hovered ? "shadow-[0_0_30px_rgba(79,70,229,0.2)] border-indigo-300" : "shadow-sm border border-slate-100"
      }`}
      style={{
        animation: `fadeUp 0.5s ease ${index * 0.05}s both`,
      }}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-square overflow-hidden bg-slate-50">
        <img
          src={product.image?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        {/* Badges Container */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <span className="bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
              -{discount}%
            </span>
          )}
          {badge && (
            <span className={`${badgeStyles[badge]?.bg || "bg-slate-100"} ${badgeStyles[badge]?.text || "text-slate-600"} text-[9px] font-black px-2 py-1 rounded uppercase tracking-wider shadow-sm`}>
              {badge}
            </span>
          )}
        </div>

        {/* Floating Actions - Always Visible or Removed? I'll make them always visible but subtle */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm text-slate-600 flex items-center justify-center shadow-sm hover:bg-indigo-600 hover:text-white transition-all">
            <Eye size={14} />
          </button>
          <button 
            onClick={() => setWished(!wished)}
            className={`w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow-sm transition-all ${
              wished ? "text-rose-500" : "text-slate-600 hover:text-rose-500"
            }`}
          >
            <Heart size={14} fill={wished ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* Info Area */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 min-h-[40px] leading-snug">
          {product.name}
        </h3>
        
        <p className="text-[11px] text-slate-500 line-clamp-2 mb-3 leading-relaxed">
          {product.description}
        </p>

        {/* Status & Rating */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">In Stock</span>
          </div>
          <StarRating rating={5} />
        </div>

        {/* Price Area */}
        <div className="flex items-end gap-2 mb-4">
          <span className="text-lg font-black text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-slate-400 line-through mb-1 font-medium">
            ${originalPrice.toFixed(2)}
          </span>
        </div>

        {/* Footer Actions */}
        <div className="mt-auto pt-2 flex gap-2">
          {/* Quantity Selector */}
          <div className="flex items-center border border-slate-200 rounded-lg h-9 overflow-hidden bg-slate-50/50">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="w-7 h-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <Minus size={12} />
            </button>
            <span className="w-6 text-center text-xs font-bold text-slate-700">{qty}</span>
            <button
              onClick={() => setQty(qty + 1)}
              className="w-7 h-full flex items-center justify-center text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
            >
              <Plus size={12} />
            </button>
          </div>

          {/* Add To Cart */}
          <button
            onClick={handleAdd}
            className={`flex-1 h-9 rounded-lg text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
              added 
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20" 
                : "bg-slate-900 text-white hover:bg-indigo-600 shadow-lg shadow-slate-900/10"
            }`}
          >
            {added ? (
              <>
                <Check size={14} strokeWidth={3} />
                Added
              </>
            ) : (
              <>
                <ShoppingCart size={14} />
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default ProductCard;
