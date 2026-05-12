import { 
  ClipboardList, 
  Tag, 
  BarChart, 
  Search, 
  Zap, 
  Box,
  Truck,
  LayoutGrid
} from "lucide-react";
import Footer from "../components/Footer";

const FeaturesPage = () => {
  const managementFeatures = [
    {
      icon: <Box size={32} />,
      title: "Inventory Tracking",
      desc: "Monitor your stock levels in real-time. Never run out of your best-selling items with our automated stock status indicators.",
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      icon: <Tag size={32} />,
      title: "Dynamic Pricing",
      desc: "Manage multiple price points including original and sale prices. Automatically calculate discounts to attract more customers.",
      color: "text-emerald-600",
      bg: "bg-emerald-50"
    },
    {
      icon: <ClipboardList size={32} />,
      title: "Bulk Catalog Management",
      desc: "Effortlessly maintain a large catalog. Our intuitive interface allows for rapid updates and organized product entries.",
      color: "text-indigo-600",
      bg: "bg-indigo-50"
    },
    {
      icon: <Search size={32} />,
      title: "Precision Search",
      desc: "Find any product instantly. Our advanced search engine filters through thousands of items with zero latency.",
      color: "text-amber-600",
      bg: "bg-amber-50"
    },
    {
      icon: <Zap size={32} />,
      title: "Smart Labeling",
      desc: "Automatically highlight key items with 'Best Seller', 'New Arrival', or 'Limited Stock' badges based on product status.",
      color: "text-rose-600",
      bg: "bg-rose-50"
    },
    {
      icon: <BarChart size={32} />,
      title: "Analytics & Trends",
      desc: "Get insights into your products. Track which items are trending and adjust your promotional strategy accordingly.",
      color: "text-violet-600",
      bg: "bg-violet-50"
    }
  ];

  return (
    <>
      <div className="min-h-screen pt-32 bg-white overflow-hidden relative">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 mb-32">
          <div className="text-center mb-24">
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight mb-8">
              Master Your <span className="text-gradient">Inventory.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Designed specifically for modern businesses, our product management features 
              give you full control over your catalog with precision and style.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
            {managementFeatures.map((f, i) => (
              <div 
                key={i}
                className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 group"
              >
                <div className={`w-16 h-16 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                  {f.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors tracking-tight">
                  {f.title}
                </h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Action Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-slate-900 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.15),transparent)]" />
            
            <div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-8 leading-tight tracking-tight">
                Scale your business <br />
                <span className="text-blue-400">without limits.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <LayoutGrid size={20} />, text: "Organize thousands of products easily" },
                  { icon: <Truck size={20} />, text: "Seamless stock status updates" },
                  { icon: <Tag size={20} />, text: "Flexible pricing and discount tools" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-300 font-bold">
                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400">
                      {item.icon}
                    </div>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
               <div className="absolute -inset-4 bg-blue-500/20 rounded-full blur-3xl" />
               <div className="glass rounded-3xl p-4 border-white/10 relative z-10">
                  <img 
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80" 
                    alt="Product Management"
                    className="rounded-2xl w-full h-auto shadow-2xl"
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FeaturesPage;
