import { Link } from "react-router-dom";
import logo from "../assets/logo.svg"; // Make sure this exists

const Footer = () => {
  return (
    <footer className="bg-[#16100b] border-t border-[#2a1d13] text-stone-400 text-sm">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo and Info */}
        <div className="text-center md:text-left">
          <img src={logo} alt="Telemax Logo" className="h-10 mx-auto md:mx-0 mb-3" />
          <p>Telemax GmbH</p>
          <p>Tenovo, Tetovo • Nordmazedonien</p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-end space-y-2">
          <Link to="/" className="hover:text-white transition">Startseite</Link>
          <Link to="/about" className="hover:text-white transition">Über uns</Link>
          <Link to="/products" className="hover:text-white transition">Produkte</Link>
          <Link to="/contact" className="hover:text-white transition">Kontakt</Link>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center border-t border-[#2a1d13] py-4 px-6 text-xs text-stone-500">
        © {new Date().getFullYear()} Telemax. Alle Rechte vorbehalten.
      </div>
    </footer>
  );
};

export default Footer;
