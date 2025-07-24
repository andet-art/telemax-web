import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import { useAuth } from "../components/AuthContext"; // ✅ make sure file is in ../context/

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, toggleLanguage, t } = useLang();
  const { user, logout } = useAuth(); // ✅ Only check for `user` presence

  const [open, setOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [shrink, setShrink] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setShrink(currentScroll > 20);
      setShowNavbar(currentScroll < lastScrollY || currentScroll < 10);
      setLastScrollY(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const scrollToTopAndNavigate = (to: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
    navigate(to);
  };

  const links = [
    { to: "/home", label: t("home") },
    { to: "/about", label: t("about") },
    { to: "/orders", label: t("orders") },
    { to: "/contact", label: t("contact") },
  ];

  return (
    <motion.header
      className={`fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-stone-950/80 border-b border-[#2d221a] shadow-sm transition-all duration-300 ${
        showNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      } ${shrink ? "py-2" : "py-4"}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link to="/" className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0 })}>
            <img src="/logo.svg" alt="Logo" className="h-7 w-7" />
            <span className="text-xl font-bold text-white">Telemax</span>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link
                to={link.to}
                onClick={() => scrollToTopAndNavigate(link.to)}
                className={`text-sm font-medium transition ${
                  location.pathname === link.to
                    ? "text-white border-b-2 border-amber-500 pb-1"
                    : "text-stone-400 hover:text-white hover:border-b hover:border-amber-500 pb-1"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Desktop Buttons */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={toggleLanguage}
            className="px-3 text-white hover:text-amber-400 transition"
          >
            {lang === "de" ? "EN" : "DE"}
          </Button>

          {user ? (
            <>
              <Button
                variant="outline"
                className="hover:border-amber-500"
                onClick={() => scrollToTopAndNavigate("/profile")}
              >
                {t("profile")}
              </Button>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="hover:text-amber-500"
              >
                {t("logout")}
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="outline" className="hover:border-amber-500">
                  {t("signin")}
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="default" className="hover:bg-amber-700">
                  {t("join")}
                </Button>
              </Link>
            </>
          )}
        </motion.div>

        {/* Mobile Toggle Icon */}
        <div className="md:hidden">
          {open ? (
            <X className="text-white h-6 w-6" onClick={() => setOpen(false)} />
          ) : (
            <Menu className="text-white h-6 w-6" onClick={() => setOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden px-6 pt-2 pb-4 bg-stone-950/90 rounded-b-xl shadow-md border-t border-[#3a2c22]"
          >
            {links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => scrollToTopAndNavigate(link.to)}
                className={`block py-2 text-sm border-b ${
                  location.pathname === link.to
                    ? "text-white font-semibold"
                    : "text-stone-300 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <Button
                variant="ghost"
                onClick={toggleLanguage}
                className="text-white hover:text-amber-400"
              >
                {lang === "de" ? "EN" : "DE"}
              </Button>

              {user ? (
                <>
                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => scrollToTopAndNavigate("/profile")}
                  >
                    {t("profile")}
                  </Button>
                  <Button
                    className="w-full"
                    variant="ghost"
                    onClick={() => {
                      handleLogout();
                      setOpen(false);
                    }}
                  >
                    {t("logout")}
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/signin" onClick={() => setOpen(false)}>
                    <Button className="w-full" variant="outline">
                      {t("signin")}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)}>
                    <Button className="w-full" variant="default">
                      {t("join")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
