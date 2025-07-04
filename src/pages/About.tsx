import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useLang } from "../context/LanguageContext";
import { FaQuoteLeft } from "react-icons/fa";
import teamImg from "../assets/artisan.jpg";
import philosophyImg from "../assets/wood-bg10.jpg";
import heroVideo from "../assets/hero-bg.mp4";
import artisan2 from "../assets/artisan2.jpg"; // make sure it's imported

const About = () => {
  const { t } = useLang();
  const [videoLoaded, setVideoLoaded] = useState(false);

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
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-10 overflow-hidden font-serif">
  {/* 🔹 Background Video */}
  <video
    src={heroVideo}
    autoPlay
    muted
    loop
    playsInline
    onLoadedData={() => setVideoLoaded(true)}
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* 🔹 Dark Overlay */}
  <div className="absolute inset-0 bg-[#1e1007]/70 z-10" />

  {/* 🔹 Hero Content */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: videoLoaded ? 1 : 0, y: 0 }}
    transition={{ duration: 1 }}
    className="relative z-20 max-w-4xl mx-auto px-4"
  >
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-6 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
      {t("about.title") || "Crafting Stories in Every Pipe"}
    </h1>
    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-stone-300 leading-relaxed">
      {t("about.subtitle") || "Where tradition meets design excellence"}
    </p>
  </motion.div>
</section>


      {/* Philosophy Section */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-center font-serif">
  {/* 🔹 Left Content */}
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full md:w-1/2 space-y-6"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
      {t("about.philosophy_title") || "Our Philosophy"}
    </h2>
    <p className="text-base sm:text-lg md:text-xl text-stone-300 leading-relaxed">
      {t("about.philosophy_text") ||
        `Each handcrafted piece is a reflection of our dedication to timeless quality and intentional design. Our philosophy is rooted in authenticity, sustainability, and the artistry passed down through generations.`}
    </p>
  </motion.div>

  {/* 🔹 Right Image */}
  <motion.div
    initial={{ opacity: 0, x: 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
    className="w-full md:w-1/2 flex justify-center"
  >
    <img
      src={teamImg}
      alt="Philosophy"
      className="rounded-2xl shadow-xl max-w-full md:max-w-[90%] lg:max-w-[80%] transition-transform duration-500 hover:scale-105"
    />
  </motion.div>
</section>


      {/* Quote Section */}
      <section className="relative py-24 px-4 sm:px-6 md:px-10 overflow-hidden font-serif">
  {/* 🔹 Background Image */}
  <img
    src={artisan2}
    alt="Background"
    className="absolute inset-0 w-full h-full object-cover object-center z-0"
    loading="lazy"
  />
  {/* 🔹 Dark Overlay */}
  <div className="absolute inset-0 bg-black/70 z-10" />

  {/* 🔹 Quote Content */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="relative z-20 max-w-4xl mx-auto text-center text-[#c9a36a]"
  >
    <FaQuoteLeft className="mx-auto text-4xl sm:text-5xl md:text-6xl opacity-60 mb-6" />
    <p className="text-lg sm:text-xl md:text-2xl italic leading-relaxed px-2 text-stone-200">
      {t("about.quote") || "Design is not just what it looks like and feels like. Design is how it works."}
    </p>
    <p className="mt-4 text-sm sm:text-base md:text-lg font-semibold text-stone-300">
      — Steve Jobs
    </p>
  </motion.div>
</section>


      {/* Team Section */}
      <section className="py-24 sm:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto font-serif">
  {/* 🔹 Section Title */}
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    viewport={{ once: true }}
    className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-white mb-16"
  >
    {t("about.team_title") || "Meet the Team"}
  </motion.h2>

  {/* 🔹 Team Cards Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
    {[1, 2, 3].map((_, i) => (
      <motion.div
        key={i}
        whileHover={{ scale: 1.05 }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: i * 0.1 }}
        viewport={{ once: true }}
        className="bg-[#2a1d13] p-6 rounded-2xl shadow-xl text-center"
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-5 rounded-full bg-stone-700 shadow-inner" />
        <h3 className="text-xl sm:text-2xl font-semibold text-white mb-1">John Doe</h3>
        <p className="text-sm sm:text-base text-stone-400">Master Craftsman</p>
      </motion.div>
    ))}
  </div>
</section>


      {/* CTA Footer */}
      <section className="bg-[#c9a36a] py-20 px-4 sm:px-6 md:px-10 text-center font-serif">
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.7 }}
    viewport={{ once: true }}
    className="max-w-3xl mx-auto"
  >
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1a120b] mb-6 leading-snug">
      {t("about.cta") || "Ready to experience the craft?"}
    </h2>

    <Link
      to="/contact"
      className="inline-block bg-[#1a120b] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full text-sm sm:text-base font-semibold hover:bg-[#2a1d1d] transition shadow-lg"
    >
      {t("about.cta_button") || "Get in Touch"}
    </Link>
  </motion.div>
</section>

    </div>
  );
};

export default About;
