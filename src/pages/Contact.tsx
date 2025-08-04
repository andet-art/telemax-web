// import { useState } from "react";
// import { motion } from "framer-motion";
// import { useLang } from "../context/LanguageContext";
// import contactBg from "../assets/artisan2.jpg";

// const Contact = () => {
//   const { t } = useLang();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     message: "",
//   });

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log("Form Submitted", formData);
//     // Here you'd send the data to your backend
//   };

//   return (
//     <div className="bg-[#1a120b] text-white overflow-hidden font-serif relative min-h-screen">
//       {/* Background Image */}
//       <img
//         src={contactBg}
//         alt="Contact background"
//         className="absolute inset-0 w-full h-full object-cover opacity-40"
//       />
//       <div className="absolute inset-0 bg-black/70 z-0" />

//       {/* Contact Section */}
//       <main className="relative z-10 px-6 py-32 max-w-4xl mx-auto text-center">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl sm:text-5xl font-bold mb-6"
//         >
//           {t("contact.title") || "Contact Us"}
//         </motion.h1>

//         <motion.p
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="text-stone-300 max-w-2xl mx-auto mb-10"
//         >
//           {t("contact.subtitle") ||
//             "We’re here to answer your questions, hear your feedback, and assist with your custom orders."}
//         </motion.p>

//         <motion.form
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.3, duration: 0.6 }}
//           onSubmit={handleSubmit}
//           className="space-y-6 bg-[#201b17] p-8 rounded-xl shadow-xl text-left"
//         >
//           <div>
//             <label htmlFor="name" className="block text-sm font-medium mb-2 text-white">
//               {t("contact.name") || "Name"}
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-sm font-medium mb-2 text-white">
//               {t("contact.email") || "Email"}
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
//             />
//           </div>

//           <div>
//             <label htmlFor="message" className="block text-sm font-medium mb-2 text-white">
//               {t("contact.message") || "Message"}
//             </label>
//             <textarea
//               name="message"
//               id="message"
//               rows={5}
//               value={formData.message}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
//             />
//           </div>

//           <button
//             type="submit"
//             className="bg-[#c9a36a] hover:bg-[#b8915b] text-black px-6 py-3 rounded-full font-semibold transition shadow"
//           >
//             {t("contact.submit") || "Send Message"}
//           </button>
//         </motion.form>
//       </main>
//     </div>
//   );
// };

// export default Contact;

import { useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../context/LanguageContext";
import emailjs from "emailjs-com";
import contactBg from "../assets/artisan2.jpg";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_d1b5j9g",       // Service ID yt
        "template_4zire33",      // Template ID yt
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
        },
        "hi1DZXtrDukkT92NU"     // Public Key yt
      )
      .then(
        (result) => {
          console.log("Mesazhi u dërgua me sukses:", result.text);
          alert("Mesazhi u dërgua me sukses! 📬");
          setFormData({ name: "", email: "", message: "" }); // pastron fushat
        },
        (error) => {
          console.error("Gabim gjatë dërgimit:", error);
          alert("Dështoi dërgimi. Kontrollo lidhjen ose provo përsëri.");
        }
      );
  };

  if (isSubmitted) {
    return (
      <div className="bg-[#1a120b] text-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-[#c9a36a] mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Thank You!</h2>
          <p className="text-stone-300">Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1a120b] text-white min-h-screen font-serif">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[#2a1810] via-[#1a120b] to-[#0f0a07] opacity-90"
        />
<div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23c9a36a%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%227%22%20cy=%227%22%20r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />
      </div>

      {/* Contact Section */}
<main className="relative z-10 px-6 py-32 max-w-4xl mx-auto text-center">
  <motion.h1
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="text-4xl sm:text-5xl font-bold mb-6"
  >
    {t("contact_title")}
  </motion.h1>

  <motion.p
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
    className="text-stone-300 max-w-2xl mx-auto mb-10"
  >
    {t("contact_subtitle")}
  </motion.p>

  <motion.form
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.3, duration: 0.6 }}
    onSubmit={handleSubmit}
    className="space-y-6 bg-[#201b17] p-8 rounded-xl shadow-xl text-left"
  >
    <div>
      <label
        htmlFor="name"
        className="block text-sm font-medium mb-2 text-white"
      >
        {t("contact_name")}
      </label>
      <input
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
      />
    </div>

    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium mb-2 text-white"
      >
        {t("contact_email")}
      </label>
      <input
        type="email"
        name="email"
        id="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
      />
    </div>

    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium mb-2 text-white"
      >
        {t("contact_message")}
      </label>
      <textarea
        name="message"
        id="message"
        rows={5}
        value={formData.message}
        onChange={handleChange}
        required
        className="w-full px-4 py-3 rounded-md bg-stone-700 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
      />
    </div>

    <button
      type="submit"
      className="bg-[#c9a36a] hover:bg-[#b8915b] text-black px-6 py-3 rounded-full font-semibold transition shadow"
    >
      {t("contact_submit")}
    </button>
  </motion.form>
</main>

    </div>
  );
};

export default Contact;
