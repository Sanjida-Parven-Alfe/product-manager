import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, Eye, EyeOff, Package, User, CheckCircle2 } from "lucide-react";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import logo from "../assets/logo.png";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(
      formData.name,
      formData.email,
      formData.password
    );
    setLoading(false);
    if (success) navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Left — Form */}
      <section className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-24 bg-white relative overflow-hidden z-10 shadow-2xl">
        <div className="max-w-md w-full mx-auto">
          {/* Brand */}
          <Link to="/" className="inline-flex items-center mb-10 group">
            <img src={logo} alt="Shelve Logo" className="h-12 object-contain group-hover:scale-105 transition-transform" />
          </Link>

          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-slate-900 text-3xl font-black tracking-tight mb-2">
              Create an account
            </h1>
            <p className="text-slate-500 font-medium">
              Start managing your products with precision today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Full Name"
              type="text"
              name="name"
              icon={User}
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. John Doe"
            />

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
                placeholder="Create a strong password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[38px] text-slate-400 hover:text-indigo-600 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs text-slate-500 pt-2 pb-4">
              By creating an account, you agree to our{" "}
              <a href="#" className="text-indigo-600 hover:underline">Terms of Service</a> and{" "}
              <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
            </p>

            <Button
              type="submit"
              loading={loading}
              className="w-full py-3.5"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          {/* Footer */}
          <p className="text-slate-500 text-sm text-center mt-10 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-bold hover:underline underline-offset-4"
            >
              Sign in instead
            </Link>
          </p>
        </div>
      </section>

      {/* Right — Marketing */}
      <section className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>

        <div className="relative z-10 w-full max-w-lg px-12 mt-40">
           <h2 className="text-white text-4xl font-black mb-6 tracking-tight leading-tight">
              Join thousands of forward-thinking teams.
           </h2>
           <ul className="space-y-4 mb-10">
              {[
                 "Unlimited product entries",
                 "Real-time analytics and tracking",
                 "Secure cloud storage",
                 "Priority 24/7 support"
              ].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 text-slate-300 font-medium">
                    <CheckCircle2 className="text-indigo-400" size={20} />
                    {item}
                 </li>
              ))}
           </ul>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;
