// ✅ React & Core Hooks
import { useEffect, useState } from "react";

// ✅ Routing & Translations
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

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
  const { t } = useLang();
  const pipes = [pipe1, pipe2, pipe3];

  // 🔹 UI State
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
      to="/products"
      className="inline-flex items-center gap-3 bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-sm sm:text-base md:text-lg font-medium shadow-md transition"
    >
      {t("home.view_collection")} <FaArrowRight className="w-4 h-4" />
    </Link>
  </div>
</motion.section>

{/* ✅ SECTION 1 */}
<section
  className="relative py-16 px-4 sm:px-6 md:px-10 text-white"
  style={{
    backgroundImage: `url(${woodBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  <div className="absolute inset-0 bg-[#1b1008]/95 z-0" />

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Left Content */}
    <motion.div
      className="w-full md:w-1/2 space-y-6"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
        {t("home.section1_title")}
      </h2>

      <ul className="space-y-3">
        {[t("home.section1_feat1"), t("home.section1_feat2"), t("home.section1_feat3"), t("home.section1_feat4")].map((feat, i) => (
          <li key={i} className="flex items-start gap-3 text-base text-stone-300">
            <FaCheckCircle className="text-[#c9a36a] w-5 h-5 mt-1 flex-shrink-0" />
            <span>{feat}</span>
          </li>
        ))}
      </ul>

      <blockquote className="italic text-[#c9a36a] text-base border-l-4 border-[#c9a36a] pl-4 max-w-xl mt-4">
        {t("home.section1_quote")}
      </blockquote>

      <Link
        to="/about"
        className="inline-block mt-4 text-sm font-medium bg-[#3b2f2f] hover:bg-[#2a1d1d] transition text-white px-5 py-2.5 rounded-full shadow"
      >
        {t("home.learn_more_button") || "Learn More"}
      </Link>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="w-full md:w-1/2 flex justify-center"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <img
        src={artisanImg}
        alt="Craftsmanship"
        className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
      />
    </motion.div>
  </div>
</section>


      {/* ✅ SECTION 2 – Carousel Cards */}
<section className="py-16 px-4 sm:px-6 md:px-10 bg-[#1b130e] w-full reveal">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center text-white">
    {t("home.section2_title")}
  </h2>

  <div className="overflow-hidden">
    <Slider {...settings} className="no-scrollbar">
      {[pipe1, pipe2, pipe3].map((img, i) => (
        <div key={i} className="px-2 sm:px-4 py-6">
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(201, 163, 106, 0.3)",
            }}
            transition={{ duration: 0.3 }}
            className="bg-[#2a1d13] rounded-xl p-4 max-w-sm mx-auto flex flex-col items-center shadow-md"
          >
            <img
              src={img}
              alt={`Model ${i + 1}`}
              className="rounded-lg mb-4 w-full object-cover h-48 sm:h-56 md:h-64"
              loading="lazy"
            />
            <h3 className="text-lg sm:text-xl font-semibold mb-1 text-white">
              {t("home.model")} {i + 1}
            </h3>
            <p className="text-sm sm:text-base text-[#c9a36a] font-medium mb-1">$149 · Handmade</p>
            <p className="text-sm text-stone-400 text-center">{t("home.model_sub")}</p>
            <button
              onClick={() => setSelectedImg(img)}
              className="mt-4 bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white text-sm font-medium px-5 py-2 rounded-full transition shadow"
            >
              {t("home.view_detail")}
            </button>
          </motion.div>
        </div>
      ))}
    </Slider>
  </div>

  {/* Modal Preview */}
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

{/* ✅ SECTION 3 – Timeline */}
<section className="relative py-20 px-4 sm:px-6 md:px-12 bg-[#1a120b] text-white reveal">
  <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">{t("home.timeline_title")}</h2>
    <p className="text-stone-400 text-sm sm:text-base">
      {t("home.timeline_intro") || "Decades of craftsmanship, shaped by fire and time."}
    </p>
  </div>

  <div className="relative border-l border-[#3b2f2f] max-w-2xl mx-auto space-y-12 pl-5">
    {[
      { year: "1982", description: t("home.timeline_event1") },
      { year: "1995", description: t("home.timeline_event2") },
      { year: "2005", description: t("home.timeline_event3") },
      { year: "2020", description: t("home.timeline_event4") },
    ].map(({ year, description }, index) => (
      <div key={index} className="relative">
        <div className="absolute -left-3 top-1 w-3 h-3 bg-[#c9a36a] rounded-full border border-[#1a120b]" />
        <div>
          <h3 className="text-[#c9a36a] text-sm font-semibold">{year}</h3>
          <p className="text-sm sm:text-base text-stone-300">{description}</p>
        </div>
      </div>
    ))}
  </div>

  <div className="mt-12 sm:mt-16 text-center">
    <Link
      to="/about"
      className="inline-block bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 py-2.5 rounded-full text-sm font-medium transition"
    >
      {t("home.learn_more_button") || "Discover Our Story"}
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
      {t("home.quote_text") || "Every pipe tells a story — one of patience, fire, and legacy."}
    </p>
    <p className="text-sm sm:text-base md:text-lg font-medium tracking-wide text-stone-300">
      — {t("home.quote_author") || "Master Artisan, Telemax"}
    </p>
    <Link
      to="/contact"
      className="inline-block bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition"
    >
      {t("home.contact_cta") || "Get in Touch"}
    </Link>
  </div>
</section>



     {/* ✅ SECTION 5 – Testimonials */}
<section className="py-24 px-4 sm:px-6 bg-[#1a120b] max-w-7xl mx-auto reveal">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 text-center text-white">
    {t("home.testimonials_title")}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 justify-items-center">
    {[
      { text: t("home.testimonial1_text"), author: t("home.testimonial1_author") },
      { text: t("home.testimonial2_text"), author: t("home.testimonial2_author") },
      { text: t("home.testimonial3_text"), author: t("home.testimonial3_author") },
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

{/* ✅ SECTION 6 – Gallery */}
<Gallery
  images={[pipe1, pipe2, pipe3, artisan2, pipe3, pipe1]}
  selectedImg={selectedImg}
  setSelectedImg={setSelectedImg}
  t={t}
/>


{/* ✅ SECTION 7 – FAQ Accordion */}
<section className="py-20 px-4 sm:px-6 bg-[#1a120b] text-white max-w-5xl mx-auto">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-14 text-center reveal">
    {t("home.faq_title")}
  </h2>

  <div className="space-y-6 max-w-3xl mx-auto">
  <FAQ />
</div>

</section>


{/* ✅ SECTION 8 – CMS Placeholder */}
<section className="py-24 px-4 sm:px-6 bg-[#1a120b] text-center max-w-4xl mx-auto rounded-xl shadow-xl reveal">
  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
    {t("home.cms_title") ?? "Live Content Editing"}
  </h2>
  <p className="text-stone-400 text-base sm:text-lg mb-10 leading-relaxed">
    {t("home.cms_description") ??
      "Easily manage your content using Sanity CMS — no code, no redeploy. Update product details, text, and media in real time."}
  </p>
  <button className="bg-[#3b2f2f] hover:bg-[#2a1d1d] text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full text-base font-medium transition shadow-lg">
    {t("home.connect_sanity") ?? "Connect Sanity CMS"}
  </button>
</section>

{/* ✅ SCROLL TO TOP BUTTON */}
{showScrollTop && (
  <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 z-50 p-3 bg-[#3b2f2f] hover:bg-[#2a1d1d] rounded-full text-white shadow-xl transition-all duration-300"
    aria-label="Scroll to top"
  >
    ↑
  </button>
)}


    </div>
  );
};



export default Home;
