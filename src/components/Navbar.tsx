import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const links = [
  { to: "/home", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/orders", label: "Orders" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl border-b border-stone-800 bg-stone-950/80 shadow-sm"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
          <span className="text-xl font-bold tracking-tight text-white">Telemax</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide font-medium transition-all duration-200 ${
                location.pathname === link.to
                  ? "text-white border-b-2 border-stone-500 pb-1"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            className="text-white border-stone-700 hover:bg-stone-800 transition duration-200"
          >
            Sign In
          </Button>
          <Button
            variant="default"
            className="bg-white text-black hover:bg-stone-200 transition duration-200"
          >
            Join Now
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Menu className="text-white h-6 w-6" onClick={() => setOpen(!open)} />
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {open && (
        <div className="md:hidden px-6 pt-2 pb-4 bg-stone-950/90 rounded-b-xl shadow-md border-t border-stone-800">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`block py-2 text-sm border-b border-stone-700 ${
                location.pathname === link.to
                  ? "text-white font-semibold"
                  : "text-stone-300 hover:text-white"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full text-white border-stone-700 hover:bg-stone-800 transition"
            >
              Sign In
            </Button>
            <Button
              variant="default"
              className="w-full bg-white text-black hover:bg-stone-200 transition"
            >
              Join Now
            </Button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
