import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Package, Zap, Users, ShieldCheck } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import logo from "../assets/logo.png";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await login(formData.email, formData.password);
    setLoading(false);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left — Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 bg-white relative overflow-hidden z-10 shadow-2xl">
        <div className="max-w-md w-full mx-auto">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center mb-12 group">
            <img src={logo} alt="Shelve Logo" className="h-12 object-contain group-hover:scale-105 transition-transform" />
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 font-medium">
              Enter your credentials to access your workspace.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email Address"
              type="email"
              name="email"
              icon={Mail}
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="name@company.com"
            />

            <div className="relative">
               <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                icon={Lock}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500/20" />
                <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-bold text-indigo-600 hover:text-indigo-700 hover:underline">Forgot password?</a>
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3.5 mt-2"
              size="lg"
            >
              Log In to Workspace
            </Button>
          </form>

          {/* Footer */}
          <p className="text-slate-500 text-sm text-center mt-10 font-medium">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
            >
              Sign up for free
            </Link>
          </p>
        </div>
      </section>

      {/* Right — Marketing */}
      <section className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-slate-900">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-violet-900/40 pointer-events-none" />
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-violet-500/30 rounded-full blur-[100px]" />

        <div className="relative z-10 w-full max-w-lg px-12">
           <div className="glass-dark rounded-3xl p-8 mb-12 border border-white/10 relative">
              <div className="absolute -top-4 -left-4 bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                <ShieldCheck size={14}/> Secure Login
              </div>
              <h3 className="text-white text-2xl font-black mb-4">"Shelve changed how we manage our inventory."</h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                 We were struggling to keep track of our expanding catalog. Shelve gave us the speed, clarity, and precision we needed to scale without headaches.
              </p>
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white text-lg">
                   JD
                 </div>
                 <div>
                    <div className="text-white font-bold">Jane Doe</div>
                    <div className="text-slate-400 text-sm">Product Manager at TechFlow</div>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                 <Zap className="text-amber-400 mb-3" size={24} />
                 <h4 className="text-white font-bold mb-1">Lightning Fast</h4>
                 <p className="text-slate-400 text-sm">Optimized for speed and efficiency.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                 <Users className="text-blue-400 mb-3" size={24} />
                 <h4 className="text-white font-bold mb-1">Built for Teams</h4>
                 <p className="text-slate-400 text-sm">Collaborate in real-time seamlessly.</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
