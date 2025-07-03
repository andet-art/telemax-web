// ✅ React & Core Hooks
import { useEffect, useState } from "react";

// ✅ Routing & Translations
import { Link } from "react-router-dom";
import { useLang } from "../context/LanguageContext";

// ✅ Animation & Scrolling
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

// ✅ UI & Carousel
import Slider from "react-slick";
import Modal from "react-modal";
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
import smokeGif from "../assets/smoke.gif";

// ✅ Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const { t } = useLang();
  const pipes = [pipe1, pipe2, pipe3];

  // 🔹 UI State
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  // 🔹 Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState<string | null>(null);

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
  dots: false, // ✅ Removed dots
  pauseOnHover: false, // ✅ Keeps moving on hover
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


  // ✅ Smooth Scroll with Lenis
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const onScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ✅ GSAP ScrollTrigger Animation Setup
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
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  // ✅ Modal Functions
  const openModal = (src: string) => {
    setModalImage(src);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  // ✅ Scroll to top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  // ... return JSX ...


  return (
    <div className="bg-[#1a120b] text-white overflow-hidden font-serif">

      {/* Hero Section - immersive full screen with video background */}
<motion.section
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 1 }}
  className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 overflow-hidden"
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

  {/* Single soft overlay to improve text contrast */}
  <div className="absolute inset-0 	bg-[#1e1007]/60 z-10" />

  {/* Hero Content */}
  <div className="relative z-20 max-w-3xl">
    <h1 className="text-6xl md:text-8xl font-extrabold tracking-wide drop-shadow-2xl mb-6">
      {t("home.hero_title")}
    </h1>
    <p className="text-2xl md:text-3xl text-stone-300 mb-10 leading-relaxed max-w-3xl mx-auto">
      {t("home.hero_subtitle")}
    </p>
    <Link
      to="/products"
      className="inline-flex items-center gap-3 bg-amber-600 hover:bg-amber-700 text-white px-10 py-4 rounded-full text-xl shadow-xl transition"
    >
      {t("home.view_collection")} <FaArrowRight className="w-5 h-5" />
    </Link>
  </div>
</motion.section>


      {/* Section 1 - Feature List + Large Image + Quote */}
<section
  className="relative py-16 px-6 md:px-10 text-white"
  style={{
    backgroundImage: `url(${woodBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Dark overlay */}
  <div className="absolute inset-0 bg-[#1b1008]/95 z-0" />

  <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
    
    {/* Left Content */}
    <motion.div
      className="md:w-1/2 space-y-6"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <h2 className="text-3xl md:text-4xl font-bold leading-snug">
        {t("home.section1_title")}
      </h2>

      <ul className="space-y-3">
        {[
          t("home.section1_feat1"),
          t("home.section1_feat2"),
          t("home.section1_feat3"),
          t("home.section1_feat4"),
        ].map((feat, i) => (
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
      className="md:w-1/2 flex justify-center"
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <img
        src={artisanImg}
        alt="Craftsmanship"
        className="w-full md:w-[80%] object-cover rounded-2xl shadow-xl transition-transform duration-500 hover:scale-105"
      />
    </motion.div>
  </div>
</section>

      {/* Section 2 - Grid cards + hover animations */}
      <section className="py-16 px-6 md:px-10 bg-[#1b130e] w-full reveal">
  <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
    {t("home.section2_title")}
  </h2>

  <div className="overflow-hidden">
    <Slider {...settings} className="no-scrollbar">
      {[pipe1, pipe2, pipe3].map((img, i) => (
        <div key={i} className="px-4 py-6">
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
              className="rounded-lg mb-4 w-full object-cover h-56"
              loading="lazy"
            />
            <h3 className="text-xl font-semibold mb-1 text-white">
              {t("home.model")} {i + 1}
            </h3>
            <p className="text-sm text-[#c9a36a] font-medium mb-1">$149 · Handmade</p>
            <p className="text-stone-400 text-center text-sm">{t("home.model_sub")}</p>
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
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-6"
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




      {/* Section 3 - Timeline with icons and animated line */}
      
    <section className="py-28 px-8 bg-[#231a13] max-w-7xl mx-auto relative reveal">
        <h2 className="text-5xl font-bold mb-16 text-center">{t("home.timeline_title")}</h2>
        <div className="relative before:absolute before:top-16 before:left-1/2 before:-translate-x-1/2 before:w-1 before:h-[90%] before:bg-amber-600">
          {[ 
            { year: "1982", event: t("home.timeline_event1") },
            { year: "1995", event: t("home.timeline_event2") },
            { year: "2005", event: t("home.timeline_event3") },
            { year: "2020", event: t("home.timeline_event4") },
          ].map(({ year, event }, i) => (
            <div
              key={i}
              className={`mb-20 w-full md:w-1/2 px-8 relative flex flex-col items-center ${
                i % 2 === 0 ? "md:items-start md:pl-16" : "md:items-end md:pr-16"
              }`}
            >
              <div className="bg-amber-600 rounded-full w-12 h-12 flex items-center justify-center text-black font-bold text-xl shadow-lg">
                {year}
              </div>
              <div className="bg-[#2a1d13] rounded-xl p-6 mt-6 max-w-sm shadow-lg">
                <p className="text-stone-300 text-lg">{event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 - Quote with large image background */}
      <section
        className="relative py-32 px-8 bg-cover bg-center bg-no-repeat reveal"
        style={{ backgroundImage: `url(${artisan2})` }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-4xl mx-auto text-center text-amber-400 space-y-8">
          <FaQuoteLeft className="mx-auto text-7xl opacity-50" />
          <p className="text-3xl italic font-serif tracking-wide">{t("home.quote_text")}</p>
          <p className="text-xl font-semibold">{t("home.quote_author")}</p>
          <Link
            to="/contact"
            className="inline-block mt-6 bg-amber-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition"
          >
            {t("home.contact_cta")}
          </Link>
        </div>
      </section>

      {/* Section 5 - Testimonials horizontally scrollable */}
      <section className="py-24 px-6 bg-[#1a120b] max-w-7xl mx-auto reveal">
        <h2 className="text-5xl font-bold mb-12 text-center">{t("home.testimonials_title")}</h2>
        <div
          className="flex overflow-x-auto gap-8 snap-x snap-mandatory px-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {[
            { text: t("home.testimonial1_text"), author: t("home.testimonial1_author") },
            { text: t("home.testimonial2_text"), author: t("home.testimonial2_author") },
            { text: t("home.testimonial3_text"), author: t("home.testimonial3_author") },
          ].map(({ text, author }, i) => (
            <motion.blockquote
              key={i}
              className="snap-center min-w-[320px] max-w-sm bg-[#2a1d13] p-8 rounded-xl shadow-xl flex-shrink-0"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <p className="italic text-stone-300 mb-6">{text}</p>
              <footer className="text-amber-600 font-semibold">— {author}</footer>
              <div className="mt-4 flex gap-1 justify-center text-amber-500">
                {[...Array(5)].map((_, star) => (
                  <FaStar key={star} />
                ))}
              </div>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* Section 6 - Gallery with lightbox */}
      <section className="py-32 px-6 bg-[#231a13] text-center reveal">
        <h2 className="text-5xl font-bold mb-10">{t("home.gallery_title")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[pipe1, pipe2, pipe3, artisan2, pipe3, pipe1].map((src, i) => (
            <LazyLoad key={i} height={250} offset={100} once>
              <img
                onClick={() => openModal(src)}
                src={src}
                alt={`Gallery image ${i + 1}`}
                className="rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                loading="lazy"
              />
            </LazyLoad>
          ))}
        </div>
      </section>

      {/* Modal Lightbox */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Image Modal"
        ariaHideApp={false}
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-6"
        overlayClassName="fixed inset-0 bg-black bg-opacity-75"
      >
        {modalImage && (
          <img
            src={modalImage}
            alt="Expanded view"
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl"
          />
        )}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 text-white text-3xl font-bold hover:text-amber-500"
          aria-label="Close Modal"
        >
          &times;
        </button>
      </Modal>

      {/* Section 7 - FAQ with accordions */}
      <section className="py-24 px-6 bg-[#1a120b] max-w-5xl mx-auto">
        <h2 className="text-5xl font-bold mb-10 text-center reveal">{t("home.faq_title")}</h2>
        <FAQ />
      </section>

      {/* CMS Integration Placeholder */}
      <section className="py-24 px-6 bg-[#231a13] text-center reveal max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Live Updates with Sanity CMS</h2>
        <p className="text-stone-300 max-w-3xl mx-auto mb-8">
          This section is connected to a headless CMS (Sanity) and can be edited in real-time without redeploying the site. Ask us how to set it up!
        </p>
        <button className="mt-6 bg-amber-600 px-8 py-4 rounded shadow hover:bg-amber-700 transition font-semibold text-lg">
          Connect Sanity
        </button>
      </section>

      {/* Scroll To Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-amber-600 hover:bg-amber-700 rounded-full text-white shadow-lg transition-all"
          aria-label="Scroll to top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

// Accordion FAQ component
const FAQ = () => {
  const { t } = useLang();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="reveal">
          <button
            onClick={() => toggle(i)}
            className="w-full text-left text-xl font-semibold bg-[#2a1d13] rounded px-4 py-3 flex justify-between items-center"
            aria-expanded={activeIndex === i}
            aria-controls={`faq-answer-${i}`}
            id={`faq-question-${i}`}
          >
            {t(`home.faq_q${i}`)}
            <span className="text-amber-500 text-2xl">{activeIndex === i ? "-" : "+"}</span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            aria-labelledby={`faq-question-${i}`}
            className={`overflow-hidden transition-all duration-500 px-4 ${
              activeIndex === i ? "max-h-96 py-4" : "max-h-0"
            }`}
          >
            <p className="text-stone-300">{t(`home.faq_a${i}`)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
