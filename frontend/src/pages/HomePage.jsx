import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import {
  Plus,
  Package,
  Zap,
  ShieldCheck,
  Search,
  ArrowRight,
  Star,
  BarChart3,
  ChevronRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import SpecialOffers from "../components/SpecialOffers";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex flex-col items-center text-center pt-32 pb-24 px-6 min-h-[90vh] justify-center overflow-hidden">
        {/* Modern Background Image Grid */}
        <div className="absolute inset-0 w-full h-full -z-20 overflow-hidden opacity-40 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/80 to-white z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,white_100%)] z-10" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-8 transform -rotate-6 scale-125 md:scale-110 opacity-60">
            {/* Column 1 */}
            <div className="flex flex-col gap-4 md:gap-6 translate-y-12">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"
                className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-xl"
                alt="Headphones"
              />
              <img
                src="https://images.unsplash.com/photo-1528701800487-ba01fea498c0?w=500&q=80"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                alt="Perfume"
              />
            </div>
            {/* Column 2 */}
            <div className="flex flex-col gap-4 md:gap-6 -translate-y-24">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                alt="Shoes"
              />
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80"
                className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-xl"
                alt="Watch"
              />
            </div>
            {/* Column 3 */}
            <div className="flex flex-col gap-4 md:gap-6 translate-y-8 hidden md:flex">
              <img
                src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80"
                className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-xl"
                alt="Camera"
              />
              <img
                src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                alt="Headphones"
              />
            </div>
            {/* Column 4 */}
            <div className="flex flex-col gap-4 md:gap-6 -translate-y-16 hidden md:flex">
              <img
                src="https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?w=500&q=80"
                className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-xl"
                alt="Controller"
              />
              <img
                src="https://images.unsplash.com/photo-1504274066651-8d31a536b11a?w=500&q=80"
                className="w-full h-48 md:h-64 object-cover rounded-2xl shadow-xl"
                alt="Camera Lens"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-400/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-400/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8 max-w-5xl leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150 relative z-20">
          <span className="inline-block mb-2 md:mb-4 [text-shadow:0_0_10px_#fff,0_0_20px_#fff,0_0_30px_#fff] text-slate-900">
            Manage your products with
          </span>{" "}
          <br className="hidden md:block" />
          <span className="text-gradient drop-shadow-[0_0_15px_rgba(99,102,241,0.4)]">
            Absolute Precision.
          </span>
        </h1>

        <p className="text-slate-600 font-medium text-lg md:text-xl max-w-2xl mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 relative z-20">
          The high-performance workspace for modern teams. Add, track, and scale
          your product catalog with an eye-catching, responsive interface.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 mb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 relative z-20">
          <Button
            size="lg"
            onClick={() => navigate("/register")}
            icon={ArrowRight}
          >
            Get Started Free
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/login")}
          >
            Sign In to Dashboard
          </Button>
        </div>

        {/* Mock Dashboard */}
        <div className="w-full max-w-5xl glass rounded-3xl p-2 sm:p-4 shadow-2xl shadow-indigo-500/10 mx-auto">
          <div className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-100">
            <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
                  <Package size={16} className="text-white" />
                </div>
                <span className="text-slate-800 font-bold">
                  Shelve Dashboard
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
                <div className="w-3 h-3 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="p-6 bg-slate-50 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-2 grid grid-cols-2 gap-4">
                {[
                  {
                    name: "Wireless Headphones",
                    price: "$49.99",
                    stock: "In Stock",
                  },
                  {
                    name: "Mechanical Keyboard",
                    price: "$129.99",
                    stock: "Low Stock",
                  },
                  { name: "USB-C Hub", price: "$39.99", stock: "In Stock" },
                  {
                    name: "Ergonomic Mouse",
                    price: "$79.99",
                    stock: "In Stock",
                  },
                ].map((p, i) => (
                  <div
                    key={i}
                    className="bg-white border border-slate-100 rounded-xl p-4 flex gap-4 items-center shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                      <Package size={20} className="text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {p.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-sm font-semibold text-emerald-600">
                          {p.price}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                          {p.stock}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-lg shadow-indigo-600/20">
                  <h4 className="text-indigo-200 text-sm font-medium mb-1">
                    Total Revenue
                  </h4>
                  <div className="text-3xl font-black mb-4">$24,890.00</div>
                  <div className="h-20 bg-white/10 rounded-lg flex items-end p-2 gap-2">
                    {[40, 70, 45, 90, 65, 100].map((h, i) => (
                      <div
                        key={i}
                        className="w-full bg-indigo-400/50 rounded-t-sm"
                        style={{ height: `${h}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
                  <h4 className="text-slate-500 text-sm font-medium mb-1">
                    Active Products
                  </h4>
                  <div className="text-2xl font-bold text-slate-800">1,482</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SpecialOffers />

      {/* Features */}
      <section className="py-24 px-6 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 text-3xl md:text-5xl font-black mb-6 tracking-tight">
              Precision-engineered features
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Built for teams that demand more than basic inventory management.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search size={24} className="text-indigo-600" />,
                title: "Smart Search",
                desc: "Find any product instantly with real-time search and filters.",
                bg: "bg-indigo-50",
              },
              {
                icon: <ShieldCheck size={24} className="text-emerald-600" />,
                title: "JWT Security",
                desc: "Enterprise-grade authentication keeps your data protected.",
                bg: "bg-emerald-50",
              },
              {
                icon: <Zap size={24} className="text-violet-600" />,
                title: "Cloudinary Images",
                desc: "Optimized image storage and delivery via Cloudinary CDN.",
                bg: "bg-violet-50",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="bg-slate-50 border border-slate-100 rounded-3xl p-8 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 group"
              >
                <div
                  className={`w-14 h-14 ${f.bg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                >
                  {f.icon}
                </div>
                <h3 className="text-slate-900 font-bold text-xl mb-3">
                  {f.title}
                </h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet-500/20 rounded-full blur-[100px] pointer-events-none" />
          <h2 className="text-white text-4xl md:text-5xl font-black mb-6 relative z-10 tracking-tight">
            Ready to optimize your workflow?
          </h2>
          <p className="text-slate-400 text-lg mb-10 relative z-10 max-w-2xl mx-auto">
            Join thousands of modern teams already using Shelve to scale their
            product management.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10">
            <Button
              size="lg"
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto"
            >
              Create Free Account
            </Button>
            <span className="text-slate-500 text-sm">
              No credit card required
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-10 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center">
            <img src={logo} alt="Shelve Logo" className="h-8 object-contain" />
          </div>
          <p className="text-slate-500 text-sm">
            © 2026 Shelve Inc. Built for high-growth teams.
          </p>
          <div className="flex gap-8">
            <span className="text-slate-500 text-sm font-medium cursor-pointer hover:text-indigo-600 transition-colors">
              Privacy
            </span>
            <span className="text-slate-500 text-sm font-medium cursor-pointer hover:text-indigo-600 transition-colors">
              Terms
            </span>
            <span className="text-slate-500 text-sm font-medium cursor-pointer hover:text-indigo-600 transition-colors">
              Contact
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

const Dashboard = () => {
  const {
    products,
    loading,
    formLoading,
    pagination,
    search,
    setSearch,
    createProduct,
    updateProduct,
    deleteProduct,
    handlePageChange,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setEditProduct(null);
  };

  const handleSubmit = async (formData) => {
    const success = editProduct
      ? await updateProduct(editProduct._id, formData)
      : await createProduct(formData);
    if (success) handleClose();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProduct(id);
    }
  };

  return (
    <div className="min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-10 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">
              My Products
            </h1>
            <p className="text-slate-500 text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Showing {pagination.total} product
              {pagination.total !== 1 ? "s" : ""}
            </p>
          </div>
          <Button onClick={() => setShowForm(true)} icon={Plus} size="lg">
            Add New Product
          </Button>
        </div>

        {/* Filters & Search */}
        <div className="mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 inline-block w-full md:w-auto">
          <SearchBar
            value={search}
            onChange={setSearch}
            onClear={() => setSearch("")}
          />
        </div>

        {/* Grid */}
        <ProductList
          products={products}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Pagination */}
        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.pages}
          onPageChange={handlePageChange}
        />
      </div>

      {showForm && (
        <ProductForm
          onSubmit={handleSubmit}
          onClose={handleClose}
          initialData={editProduct}
          loading={formLoading}
        />
      )}
    </div>
  );
};

const HomePage = () => {
  const { user } = useAuth();
  return user ? <Dashboard /> : <LandingPage />;
};

export default HomePage;
