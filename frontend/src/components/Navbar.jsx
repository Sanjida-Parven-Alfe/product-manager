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
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100/50 border border-slate-200">
                  <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold uppercase">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-slate-600 text-sm font-medium pr-1">
                    {user.name}
                  </span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  icon={LogOut}
                  onClick={handleLogout}
                >
                  Logout
                </Button>
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
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-100">
                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm font-bold uppercase">
                  {user.name.charAt(0)}
                </div>
                <span className="text-slate-700 font-medium">{user.name}</span>
              </div>
              <Button
                variant="outline"
                icon={LogOut}
                onClick={handleLogout}
                className="w-full justify-start"
              >
                Logout
              </Button>
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
