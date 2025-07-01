import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#16100b] text-stone-400 py-12 px-6 select-none"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About */}
        <div>
          <h3 className="text-white font-serif text-2xl mb-4">Telemax</h3>
          <p className="text-stone-400 max-w-sm leading-relaxed mb-6">
            Handcrafted tobacco pipes from Tenovo, Tetovo, North Macedonia. Tradition and quality in every detail.
          </p>
          <div className="flex space-x-5">
            {[FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="text-stone-400 hover:text-amber-600 transition-colors"
                aria-label="Social Link"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-amber-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-amber-600 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/products" className="hover:text-amber-600 transition-colors">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-amber-600 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold text-xl mb-4">Contact</h4>
          <p className="mb-2">📍 Tenovo, Tetovo, North Macedonia</p>
          <p className="mb-2">📞 +389 70 123 4567</p>
          <p className="mb-2">✉️ info@telemax.mk</p>
          <p className="mt-6 text-sm text-stone-500 select-text">
            &copy; {new Date().getFullYear()} Telemax GmbH. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
