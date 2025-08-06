// ✅ React & Core Hooks
import { useEffect, useState } from "react";

// ✅ Sanity Client & Queries
import { sanity } from "@/lib/sanityClient";
import { homeContentQuery } from "@/lib/queries";

// ✅ Routing & Translations
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// ✅ Components
import FAQ from "../components/FAQ";
import Gallery from "../components/Gallery";

// ✅ Animation & Scrolling
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// ✅ Carousel & Lazy Loading
import Slider from "react-slick";
import LazyLoad from "react-lazyload";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Icons
import { FaCheckCircle, FaStar, FaQuoteLeft, FaArrowRight } from "react-icons/fa";

// ✅ Media & Assets
import heroVideo from "../assets/hero-home.mp4";
import woodBg from "../assets/wood-bg.jpg";
import pipe1 from "../assets/pipe1.jpg";
import pipe2 from "../assets/pipe2.jpg";
import pipe3 from "../assets/pipe3.jpg";
import artisanImg from "../assets/artisan.jpg";
import artisan2 from "../assets/artisan2.jpg";

// ✅ Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const { t } = useTranslation();
  const pipes = [pipe1, pipe2, pipe3];

  // 🔹 UI State
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // 🔹 Sanity CMS Data
  const [cmsData, setCmsData] = useState<{
  cmsTitle: string;
  cmsDescription: string;
  cmsButton: string;
} | null>(null);

  // 🔹 Fetch from Sanity
  useEffect(() => {
  const fetchContent = async () => {
    try {
      const result = await sanity.fetch(homeCMSQuery);
      setCmsData(result);
    } catch (error) {
      console.error("CMS fetch failed:", error);
    }
  };
  fetchContent();
}, []);

  // 🔹 Carousel Settings
  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 3,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 600,
    arrows: false,
    dots: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  // ✅ Smooth Scroll (Lenis)
  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ GSAP ScrollTrigger Animations
  useEffect(() => {
    gsap.utils.toArray(".reveal").forEach((el: any) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 83%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // ✅ Scroll to Top Handler
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-[#1a120b] text-white overflow-hidden font-serif">

      {/* ✅ HERO SECTION */}
<motion.section
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10 overflow-hidden"
>
  {/* Background video */}
  <video
    src={heroVideo}
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 w-full h-full object-cover"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-[#1e1007]/60 z-10" />

  {/* Hero Content */}
  <div className="relative z-20 max-w-3xl text-center">
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight text-white mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]">
      {t("home.hero_title")}
    </h1>

    <p className="text-base sm:text-lg md:text-xl text-stone-300 mb-10 leading-relaxed">
      {t("home.hero_subtitle")}
    </p>

    <Link
      to="/orders"
      className="inline-flex items-center gap-3 bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium shadow-md transition"
    >
      {t("home.view_collection")} <FaArrowRight className="w-4 h-4" />
    </Link>
  </div>
</motion.section>

{/* ✅ SECTION 1 - Hero Features Section */}
<section
  className="relative py-20 px-4 sm:px-6 md:px-12 text-white overflow-hidden"
  style={{
    backgroundImage: `url(${woodBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-[#1b1008]/95 z-0" />

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-14">
    
    {/* Left Content */}
    <motion.div
      className="w-full md:w-1/2 space-y-8"
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight text-white drop-shadow">
        {t("section1_title")}
      </h2>

      <ul className="space-y-4">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="flex items-start gap-3 text-lg text-stone-300">
            <FaCheckCircle className="text-[#c9a36a] w-5 h-5 mt-1" />
            <span>{t(`section1_feat${n}`) || `Feature ${n}`}</span>
          </li>
        ))}
      </ul>

      <blockquote className="italic text-[#c9a36a] text-lg border-l-4 border-[#c9a36a] pl-5 max-w-xl mt-6">
        {t("section1_quote") || "Crafted with passion, delivered with pride."}
      </blockquote>

      <Link
        to="/about"
        className="inline-block mt-6 text-sm sm:text-base font-semibold bg-[#3b2f2f] hover:bg-[#2a1d1d] transition-all text-white px-6 py-3 rounded-full shadow-md hover:shadow-lg"
      >
        {t("learn_more_button") || "Learn More"}
      </Link>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="w-full md:w-1/2 flex justify-center"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <img
        src={artisanImg}
        alt={t("home.section1_img_alt") || "Artisan carving tobacco pipe"}
        className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] rounded-3xl object-cover shadow-2xl hover:scale-105 transition-transform duration-500"
      />
    </motion.div>
  </div>
</section>



{/* ✅ SECTION 2 – Featured Models Carousel */}
<section className="py-20 px-4 sm:px-6 md:px-12 bg-[#1b130e] w-full reveal">
  <h2 className="text-4xl md:text-5xl font-extrabold mb-14 text-center text-white drop-shadow-sm">
    {t("section2_title") || "Explore Our Models"}
  </h2>

  <div className="overflow-hidden">
    <Slider {...settings} className="no-scrollbar">
      {[
        {
          img: pipe1,
          modelKey: "model_1",
          priceKey: "model_1_price",
          subKey: "model_1_sub"
        },
        {
          img: pipe2,
          modelKey: "model_2",
          priceKey: "model_2_price",
          subKey: "model_2_sub"
        },
        {
          img: pipe3,
          modelKey: "model_3",
          priceKey: "model_3_price",
          subKey: "model_3_sub"
        }
      ].map(({ img, modelKey, priceKey, subKey }, i) => (
        <div key={i} className="px-2 sm:px-4 py-6">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(201, 163, 106, 0.3)",
            }}
            transition={{ duration: 0.3 }}
            className="bg-[#2a1d13] rounded-xl p-5 max-w-sm mx-auto flex flex-col items-center shadow-md"
          >
            <img
              src={img}
              alt={t(modelKey) || `Pipe Model ${i + 1}`}
              className="rounded-lg mb-4 w-full object-cover h-48 sm:h-56 md:h-64"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-1 text-white">
              {t(modelKey)}
            </h3>
            <p className="text-base text-[#c9a36a] font-medium mb-1">
              {t(priceKey) || "$149 · Handmade"}
            </p>
            <p className="text-sm text-stone-400 text-center">
              {t(subKey) || "Fine wood, beautifully crafted."}
            </p>
            <button
              onClick={() => setSelectedImg(img)}
              className="mt-4 bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white text-sm font-medium px-5 py-2 rounded-full transition shadow"
            >
              {t("view_detail") || "View Details"}
            </button>
          </motion.div>
        </div>
      ))}
    </Slider>
  </div>

  {/* 🔍 Modal Preview */}
  <AnimatePresence>
    {selectedImg && (
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImg(null)}
      >
        <motion.img
          src={selectedImg}
          alt="Enlarged preview"
          className="max-w-3xl w-full rounded-lg shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
</section>


{/* ✅ SECTION 3 – Elegant Horizontal Timeline with Pop-In Animation */}
<section className="relative py-24 px-4 sm:px-8 md:px-16 bg-[#1a120b] text-white overflow-hidden">
  <div className="text-center mb-20 max-w-3xl mx-auto">
    <h2 className="text-4xl sm:text-5xl font-bold mb-4">
      {t("timeline_title") || "Crafted by Time"}
    </h2>
    <p className="text-stone-400 text-base sm:text-lg">
      {t("timeline_intro") || "Moments that shaped our craft."}
    </p>
  </div>

  <div className="relative overflow-x-auto scroll-smooth">
    <div className="flex gap-12 w-max mx-auto px-6 items-start justify-start">
      {[
        { year: "1982", key: "timeline_event1" },
        { year: "1995", key: "timeline_event2" },
        { year: "2005", key: "timeline_event3" },
        { year: "2020", key: "timeline_event4" },
      ].map(({ year, key }, i) => (
        <motion.div
          key={i}
          className="flex flex-col items-center text-center relative group"
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          viewport={{ once: true }}
        >
          {/* Line Connector */}
          {i !== 0 && (
            <div className="absolute top-2 left-[-6rem] w-24 h-[2px] bg-[#3b2f2f] hidden md:block"></div>
          )}

          {/* Dot */}
          <div className="w-4 h-4 bg-[#c9a36a] rounded-full shadow-lg border-2 border-[#1a120b] z-10" />

          {/* Card */}
          <div className="bg-[#2b1c13]/60 backdrop-blur-lg border border-[#3b2f2f] rounded-xl px-6 py-5 mt-6 w-64 shadow-md hover:shadow-[#c9a36a]/30 transition-all">
            <h3 className="text-[#c9a36a] text-sm font-semibold mb-2">{year}</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t(key) || "Event description"}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  <div className="mt-16 text-center">
    <Link
      to="/about"
      className="inline-block bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition shadow-md"
    >
      {t("learn_more_button") || "Discover Our Story"}
    </Link>
  </div>
</section>







{/* ✅ SECTION 4 – Quote Background */}
<section className="relative py-24 px-4 sm:px-6 md:px-10 overflow-hidden bg-[#1a120b] reveal">
  <img
    src={artisan2}
    alt="Artisan background"
    className="absolute inset-0 w-full h-full object-cover object-center z-0"
    loading="lazy"
  />
  <div className="absolute inset-0 bg-black/70 z-10" />

  <div className="relative z-20 max-w-3xl mx-auto text-center text-[#c9a36a] space-y-6">
    <FaQuoteLeft className="mx-auto text-3xl sm:text-4xl md:text-5xl opacity-50" />
    <p className="text-xl sm:text-2xl md:text-3xl italic leading-relaxed px-2">
      {t("quote_text") || "Every pipe tells a story — one of patience, fire, and legacy."}
    </p>
    <p className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-stone-300">
      — {t("quote_author") || "Master Artisan, Telemax"}
    </p>
    <Link
      to="/contact"
      className="inline-block bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition"
    >
      {t("contact_cta") || "Get in Touch"}
    </Link>
  </div>
</section>



     {/* ✅ SECTION 5 – Testimonials */}
<section className="py-24 px-4 sm:px-6 bg-[#1a120b] max-w-7xl mx-auto reveal">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white">
    {t("testimonials_title")}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
    {[
      { text: t("testimonial1_text"), author: t("testimonial1_author") },
      { text: t("testimonial2_text"), author: t("testimonial2_author") },
      { text: t("testimonial3_text"), author: t("testimonial3_author") },
    ].map(({ text, author }, i) => (
      <motion.blockquote
        key={i}
        className="bg-[#2a1d13] p-6 sm:p-8 rounded-xl shadow-xl max-w-sm w-full"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.15 }}
      >
        <p className="italic text-stone-300 mb-6">"{text}"</p>
        <footer className="text-[#c9a36a] font-semibold">— {author}</footer>
        <div className="mt-4 flex gap-1 justify-center text-[#c9a36a]">
          {[...Array(5)].map((_, star) => (
            <FaStar key={star} />
          ))}
        </div>
      </motion.blockquote>
    ))}
  </div>
</section>

{/* ✅ SECTION 6 – Luxury Gallery Grid */}
<section className="py-24 px-4 sm:px-8 md:px-16 bg-[#1a120b] text-white">
  <h2 className="text-4xl sm:text-5xl font-bold text-center mb-16 drop-shadow-lg">
    {t("gallery_title") || "Gallery of Craftsmanship"}
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
    {[pipe1, pipe2, pipe3, artisan2, pipe3, pipe1].map((img, i) => (
      <motion.div
        key={i}
        className="relative group overflow-hidden rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.3)] bg-[#2a1d13]/40 border border-[#3b2f2f] hover:shadow-[0_0_30px_rgba(201,163,106,0.2)] transition-all duration-300"
        whileHover={{ scale: 1.015 }}
        transition={{ duration: 0.4 }}
        onClick={() => setSelectedImg(img)}
      >
        <img
          src={img}
          alt={`Gallery image ${i + 1}`}
          className="w-full h-80 object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent text-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm text-[#c9a36a] tracking-wide">
          {t("gallery_item_label") || "Tap to view"}
        </div>
      </motion.div>
    ))}
  </div>

  {/* Optional Modal View */}
  <AnimatePresence>
    {selectedImg && (
      <motion.div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedImg(null)}
      >
        <motion.img
          src={selectedImg}
          alt="Enlarged view"
          className="max-w-5xl w-full rounded-xl shadow-2xl"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )}
  </AnimatePresence>
</section>




{/* ✅ SECTION 7 – FAQ Accordion */}
<section className="py-20 px-4 sm:px-6 bg-[#1a120b] text-white max-w-5xl mx-auto">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 text-center reveal">
    {t("faq_title")}
  </h2>

  <div className="space-y-6 max-w-3xl mx-auto">
  <FAQ />
</div>

</section>


{/* ✅ SECTION 8 – CMS Live Content */}
<section className="py-24 px-4 sm:px-6 bg-[#1a120b] text-center max-w-4xl mx-auto rounded-xl shadow-xl reveal">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
    {cmsData?.cmsTitle || "Live Content Editing"}
  </h2>
  <p className="text-stone-400 text-base sm:text-lg mb-10 leading-relaxed">
    {cmsData?.cmsDescription ||
      "Easily manage your content using Sanity CMS — no code, no redeploy. Update product details, text, and media in real time."}
  </p>
  <button className="bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base font-medium transition shadow-lg">
    {cmsData?.cmsButton || "Connect Sanity CMS"}
  </button>
</section>


{showScrollTop && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 z-50 p-3 sm:p-3 rounded-full bg-[#2a1d1d] hover:bg-[#3b2f2f] text-white shadow-lg border border-[#3b2f2f] transition-transform duration-300 hover:scale-105"
    aria-label="Scroll to top"
  >
    <span className="text-2xl leading-none">↑</span>
  </button>
)}



    </div>
  );
};



export default Home;
