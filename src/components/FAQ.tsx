import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
  {
    q: "What materials do you use for your pipes?",
    a: "We use only high-quality briar wood, aged and cured for optimal smoking experience.",
  },
  {
    q: "Are your products handmade?",
    a: "Yes, each piece is handcrafted by skilled artisans with attention to detail.",
  },
  {
    q: "Do you ship internationally?",
    a: "Absolutely. We deliver worldwide with secure packaging to ensure your product arrives safely.",
  },
  {
    q: "Can I request a custom pipe design?",
    a: "Yes! Reach out via our contact form, and we’ll collaborate to craft your unique pipe.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {faqs.map((item, index) => (
        <div
          key={index}
          className="bg-[#2a1d13] rounded-xl shadow-lg overflow-hidden transition-all"
        >
          <button
            className="w-full text-left p-6 flex justify-between items-center text-lg font-medium focus:outline-none"
            onClick={() => toggle(index)}
          >
            <span>{item.q}</span>
            <FaChevronDown
              className={`ml-4 transform transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`px-6 pb-6 text-stone-300 text-base transition-all duration-300 ease-in-out ${
              activeIndex === index ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
