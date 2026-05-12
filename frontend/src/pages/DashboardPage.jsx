import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import useProducts from "../hooks/useProducts";
import ProductForm from "../components/ProductForm";
import Pagination from "../components/Pagination";
import logo from "../assets/logo.png";
import logoJpg from "../assets/logo.jpg";

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const {
    products,
    loading,
    formLoading,
    pagination,
    search,
    setSearch,
    sort,
    setSort,
    createProduct,
    updateProduct,
    deleteProduct,
    handlePageChange,
  } = useProducts();

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-500/10 selection:text-indigo-600">
      {/* Material Symbols Link */}
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        rel="stylesheet"
      />
      
      <style>{`
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .glass-card:hover {
          border-color: rgba(99, 102, 241, 0.2);
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-4px);
          box-shadow: 0 12px 30px -4px rgba(0, 0, 0, 0.04);
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(0,0,0,0.03), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .text-gradient {
          background: linear-gradient(to right, #4f46e5, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[55] lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SideNavBar */}
      <aside className={`fixed left-0 top-0 h-screen w-[280px] border-r border-slate-200/60 bg-white z-[60] flex flex-col p-6 gap-2 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="mb-10 px-2 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img
              src={logoJpg}
              alt="Shelve Icon"
              className="h-8 object-contain"
            />
            <img
              src={logo}
              alt="Shelve Logo"
              className="h-10 object-contain"
            />
          </Link>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex flex-col gap-1.5 grow">
          <Link to="/dashboard" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3.5 bg-indigo-50 text-indigo-600 rounded-2xl border border-indigo-100 transition-all">
            <span className="material-symbols-outlined">dashboard</span>
            <span className="font-bold">Dashboard</span>
          </Link>
          <Link to="/products" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
            <span className="material-symbols-outlined">inventory_2</span>
            <span className="font-semibold">All Products</span>
          </Link>
          <Link to="/features" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
            <span className="material-symbols-outlined">auto_awesome</span>
            <span className="font-semibold">Features</span>
          </Link>
          <Link to="/about" onClick={() => setIsSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-50 rounded-2xl transition-all">
            <span className="material-symbols-outlined">info</span>
            <span className="font-semibold">About Us</span>
          </Link>
          <div className="my-4 h-px bg-slate-100 mx-4" />
          <button onClick={logout} className="flex items-center gap-3 px-4 py-3.5 text-rose-500 hover:text-rose-600 hover:bg-rose-50 rounded-2xl transition-all">
            <span className="material-symbols-outlined">logout</span>
            <span className="font-semibold">Logout</span>
          </button>
        </nav>

        <button 
          onClick={() => { setShowForm(true); setIsSidebarOpen(false); }}
          className="mb-4 py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-xl">add</span>
          Add New Product
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-[280px] min-h-screen flex flex-col relative">
        {/* TopNavBar */}
        <header className="sticky top-0 w-full z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
          <div className="flex justify-between items-center h-20 px-6 lg:px-10 max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4 lg:gap-6 flex-1">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-slate-500 hover:bg-slate-50 rounded-xl"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <div className="relative w-full max-w-md group hidden sm:block">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors">search</span>
                <input 
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/5 pl-12 pr-4 py-2.5 text-sm placeholder:text-slate-400 transition-all outline-none" 
                  placeholder="Search your inventory..." 
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4 lg:gap-6">
              <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-slate-50 rounded-xl transition-all relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
              </button>
              
              <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>
              
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <p className="text-sm font-bold text-slate-900 leading-tight">{user?.name}</p>
                  <p className="text-[10px] text-indigo-600 uppercase tracking-widest font-black">Manager</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center font-bold">
                   {user?.name?.charAt(0).toUpperCase()}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Canvas */}
        <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full space-y-10">
          {/* Toolbar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">Product Catalog</h2>
              <p className="text-slate-500 mt-2 font-medium">Manage and monitor your enterprise product performance.</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
              <select 
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent border-none text-sm font-bold text-slate-600 hover:text-indigo-600 focus:ring-0 cursor-pointer pr-10 outline-none"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="discount">Best Discount</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="glass-card rounded-3xl overflow-hidden">
                  <div className="aspect-square shimmer bg-slate-100"></div>
                  <div className="p-6 space-y-4">
                    <div className="space-y-2">
                      <div className="h-5 w-2/3 shimmer rounded-lg bg-slate-100"></div>
                      <div className="h-4 w-1/3 shimmer rounded-lg bg-slate-100"></div>
                    </div>
                    <div className="h-12 w-full shimmer rounded-2xl bg-slate-100"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p, i) => (
                <div key={p._id} className="glass-card rounded-[2rem] overflow-hidden group">
                  <div className="aspect-square relative overflow-hidden bg-slate-100">
                    <img 
                      src={p.image?.url || "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80"} 
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    {p.discount > 0 && (
                      <div className="absolute top-4 right-4 bg-indigo-600 px-3 py-1 rounded-full shadow-lg">
                        <span className="text-white text-[10px] font-black tracking-widest">-{p.discount}%</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 space-y-5">
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1">{p.name}</h3>
                        <p className="text-slate-500 text-xs mt-1 font-medium line-clamp-1">{p.description}</p>
                      </div>
                      <span className="text-xl font-black text-indigo-600">${p.price}</span>
                    </div>
                    
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEdit(p)}
                        className="flex-1 py-3 px-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 font-bold text-sm hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(p._id)}
                        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-rose-50 text-rose-500 border border-rose-100 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all"
                      >
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center space-y-6 glass-card rounded-[3rem] border-dashed border-2 border-slate-200">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full"></div>
                <span className="material-symbols-outlined text-8xl text-indigo-600/30 relative">inventory_2</span>
              </div>
              <div>
                <h3 className="text-3xl font-black text-slate-900">No products found</h3>
                <p className="text-slate-500 max-w-md mx-auto mt-2 font-medium">Your search didn't match any current items in the warehouse. Try adjusting your filters.</p>
              </div>
              <button 
                onClick={() => setShowForm(true)}
                className="bg-white border border-slate-200 px-8 py-3.5 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all font-bold text-slate-700 flex items-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined">add_box</span>
                Add Your First Product
              </button>
            </div>
          )}

          {/* Pagination Shell */}
          <footer className="flex flex-col md:flex-row justify-between items-center gap-6 py-12 border-t border-slate-200">
            <p className="text-sm font-medium text-slate-500">
              Showing <span className="text-slate-900 font-bold">{products.length}</span> of <span className="text-slate-900 font-bold">{pagination.total}</span> products
            </p>
            
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={handlePageChange}
              variant="light"
            />
          </footer>
        </div>
      </main>

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

export default DashboardPage;
