import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Star, Plus, Minus, Check } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import api from "../api/axios";
import Spinner from "./Spinner";


const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 5); // 5 days from now

function useCountdown(target) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

function Stars({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          size={14}
          fill={s <= rating ? "#f59e0b" : "#e5e7eb"}
          stroke={s <= rating ? "#f59e0b" : "#e5e7eb"}
        />
      ))}
    </div>
  );
}

function StockBar({ stock, maxStock }) {
  const pct = Math.min(100, Math.round(((maxStock - stock) / maxStock) * 100));
  const bgClass = pct > 90 ? "bg-red-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <div className="mt-2">
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden mb-1.5">
        <div
          className={`h-full rounded-full transition-all duration-500 ${bgClass}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="text-xs text-slate-500 m-0">
        Available: <strong className="text-slate-800">{stock}</strong> pcs
      </p>
    </div>
  );
}

function ProductCard({ product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] border border-slate-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-indigo-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative bg-slate-50/50 pt-4 pb-2 px-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
        />
        {/* Discount badge */}
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          -{product.discount}%
        </span>
        {/* Custom badge */}
        {product.badge && (
          <span
            className={`absolute top-3 right-3 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${product.badgeBg} ${product.badgeColor}`}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[15px] font-semibold text-slate-800 leading-snug mb-1 line-clamp-2 min-h-[44px]">
          {product.name}
        </h3>

        {product.unit ? (
          <p className="text-xs text-slate-400 mb-3">{product.unit}</p>
        ) : (
          <div className="h-4 mb-3" />
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-emerald-600">
            ${product.salePrice.toFixed(2)}
          </span>
          <span className="text-sm text-slate-400 line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        </div>

        <Stars rating={product.rating} />

        <StockBar stock={product.stock} maxStock={product.stock + Math.round(product.stock * 0.25)} />

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-2">
            {/* Qty Selector */}
            <div className="flex items-center border border-slate-200 rounded-xl h-10 overflow-hidden bg-slate-50">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="w-8 text-center text-sm font-semibold text-slate-700">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                className="w-8 h-full flex items-center justify-center text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              className={`flex-1 h-10 rounded-xl text-sm font-semibold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                added 
                ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/40"
              }`}
            >
              {added ? (
                <>
                  <Check size={16} strokeWidth={3} />
                  Added
                </>
              ) : (
                "Add to Cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CountBox({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-slate-800 text-white font-mono text-2xl font-bold w-14 h-14 rounded-xl flex items-center justify-center shadow-lg shadow-slate-800/20 border border-slate-700/50">
        {String(value).padStart(2, "0")}
      </div>
      <p className="mt-2 text-[10px] text-slate-500 uppercase tracking-widest font-bold">
        {label}
      </p>
    </div>
  );
}

export default function SpecialOffers() {
  const { days, hours, minutes, seconds } = useCountdown(TARGET_DATE);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get('/special-offers');
        const fetchedProducts = data.data.map((p, idx) => {
          const discount = Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100);
          const badgeColors = [
            { bg: "bg-indigo-100", text: "text-indigo-700" },
            { bg: "bg-rose-500", text: "text-white" },
            { bg: "bg-emerald-100", text: "text-emerald-700" },
            { bg: "bg-orange-500", text: "text-white" }
          ];
          const badgeStyle = badgeColors[idx % badgeColors.length];
          return {
            id: p._id,
            name: p.name,
            image: p.image?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
            originalPrice: p.originalPrice,
            salePrice: p.price,
            discount: discount,
            badge: p.badge || "Special",
            badgeColor: badgeStyle.text,
            badgeBg: badgeStyle.bg,
            stock: p.stock || 50,
            rating: p.rating || 5,
            unit: p.unit || "1 Unit",
          };
        });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch special offers", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rose-500/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-8 h-1 bg-red-500 rounded-full" />
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Limited Time</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              Special Offers <br/>
              <span className="text-indigo-600">of the week!</span>
            </h2>
            <p className="mt-4 text-slate-500 max-w-md">
              Handpicked deals on top products. Grab them before the time runs out and stock is empty!
            </p>
          </div>

          {/* Countdown */}
          <div className="flex items-start gap-3 bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100">
            <CountBox value={days} label="Days" />
            <span className="text-2xl font-black text-slate-300 mt-3">:</span>
            <CountBox value={hours} label="Hours" />
            <span className="text-2xl font-black text-slate-300 mt-3">:</span>
            <CountBox value={minutes} label="Mins" />
            <span className="text-2xl font-black text-slate-300 mt-3">:</span>
            <CountBox value={seconds} label="Secs" />
          </div>
        </div>

        {/* Product Carousel */}
        <div className="relative pb-12">
          {loading ? (
            <div className="py-20 flex justify-center">
              <Spinner size="lg" />
            </div>
          ) : products.length > 0 ? (
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="!pb-16"
            >
              {products.map((p) => (
                <SwiperSlide key={p.id} className="h-auto">
                  <ProductCard product={p} />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center py-20 text-slate-500 font-medium">
              No special offers available at the moment.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
