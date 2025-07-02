import { Link } from "react-router-dom";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useLang } from "../context/LanguageContext";
import { FaQuoteLeft } from "react-icons/fa";
import teamImg from "../assets/artisan.jpg";
import philosophyImg from "../assets/wood-bg.jpg";

const About = () => {
  const { t } = useLang();

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <div className="bg-[#1a120b] text-white font-serif overflow-hidden">
      {/* Hero Section */}
      <section
        className="min-h-screen flex items-center justify-center text-center px-6 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${philosophyImg})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6">
            {t("about.title") || "Crafting Stories in Every Pipe"}
          </h1>
          <p className="text-xl md:text-2xl text-stone-300">
            {t("about.subtitle") || "Where tradition meets design excellence"}
          </p>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-28 px-6 md:px-16 max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-5xl font-bold mb-4">{t("about.philosophy_title") || "Our Philosophy"}</h2>
          <p className="text-lg text-stone-300 leading-relaxed">
            {t("about.philosophy_text") || `Each handcrafted piece is a reflection of our dedication to timeless quality and intentional design. Our philosophy is rooted in authenticity, sustainability, and the artistry passed down through generations.`}
          </p>
        </motion.div>
        <motion.img
          src={teamImg}
          alt="Philosophy"
          className="md:w-1/2 rounded-xl shadow-lg"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Quote Section */}
      <section className="bg-[#231a13] py-24 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <FaQuoteLeft className="mx-auto text-5xl text-amber-500 mb-6 opacity-70" />
          <p className="text-2xl italic text-stone-300">
            {t("about.quote") || "Design is not just what it looks like and feels like. Design is how it works."}
          </p>
          <p className="mt-4 font-semibold text-amber-500">— Steve Jobs</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-28 px-6 md:px-16 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold text-center mb-16"
        >
          {t("about.team_title") || "Meet the Team"}
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-[#2a1d13] p-6 rounded-xl shadow-lg text-center"
            >
              <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-stone-700" />
              <h3 className="text-2xl font-semibold mb-1">John Doe</h3>
              <p className="text-stone-400">Master Craftsman</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-amber-600 py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
          {t("about.cta") || "Ready to experience the craft?"}
        </h2>
        <Link
          to="/contact"
          className="bg-black text-white px-10 py-4 rounded-full font-semibold hover:bg-gray-900 transition"
        >
          {t("about.cta_button") || "Get in Touch"}
        </Link>
      </section>
    </div>
  );
};

export default About;
