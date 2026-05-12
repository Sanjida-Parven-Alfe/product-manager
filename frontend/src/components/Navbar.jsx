import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Package, LogOut, LogIn, UserPlus, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Button from "./ui/Button";
import logo from "../assets/logo.png";
import logoIcon from "../assets/logo.jpg";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? "glass border-b border-slate-200/50 shadow-sm" : "bg-transparent border-transparent"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 relative">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 cursor-pointer">
            <img
              src={logoIcon}
              alt="Shelve Icon"
              className="h-8 md:h-10 object-contain"
            />
            <img
              src={logo}
              alt="Shelve Logo"
              className="h-10 md:h-12 object-contain"
            />
          </Link>

          {/* Centered Desktop Nav Links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-8 font-semibold text-slate-900">
            <Link to="/products" className="hover:text-indigo-600 transition-colors">Products</Link>
            <Link to="/features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link to="/about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          </div>

          {/* Desktop Right */}
          <div className="hidden sm:flex items-center gap-4">
            {user ? (
              <>
                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold uppercase border-2 border-white shadow-[0_0_15px_rgba(79,70,229,0.4)] hover:shadow-[0_0_20px_rgba(79,70,229,0.6)] hover:scale-105 transition-all cursor-pointer"
                  title="Go to Dashboard"
                >
                  {user.name.charAt(0)}
                </button>
                <button
                  onClick={handleLogout}
                  className="p-2.5 rounded-full bg-red-600 text-white hover:bg-red-700 border-2 border-white shadow-[0_0_15px_rgba(220,38,38,0.4)] hover:shadow-[0_0_20px_rgba(220,38,38,0.6)] transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={2.5} />
                </button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  icon={LogIn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  icon={UserPlus}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="sm:hidden p-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden glass border-t border-slate-100/50 px-4 py-4 flex flex-col gap-3 absolute w-full left-0 top-full shadow-xl">
          <div className="flex flex-col gap-2 mb-2 pb-3 border-b border-slate-100 font-medium text-slate-600">
            <Link to="/products" className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Products</Link>
            <Link to="/features" className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>Features</Link>
            <Link to="/about" className="px-2 py-1 hover:text-indigo-600" onClick={() => setMenuOpen(false)}>About Us</Link>
          </div>
          {user ? (
            <>
              <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      navigate("/dashboard");
                    }}
                    className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center text-lg font-bold uppercase shadow-[0_0_15px_rgba(79,70,229,0.3)] cursor-pointer"
                  >
                    {user.name.charAt(0)}
                  </button>
                  <span className="text-slate-700 font-semibold">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 shadow-[0_0_15px_rgba(220,38,38,0.3)] cursor-pointer"
                  title="Logout"
                >
                  <LogOut size={20} strokeWidth={2.5} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                icon={LogIn}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/login");
                }}
                className="w-full justify-start"
              >
                Login
              </Button>
              <Button
                variant="primary"
                icon={UserPlus}
                onClick={() => {
                  setMenuOpen(false);
                  navigate("/register");
                }}
                className="w-full justify-start"
              >
                Register
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
