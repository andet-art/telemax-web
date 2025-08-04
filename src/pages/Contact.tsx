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
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
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

  return (
    <div className="bg-[#1a120b] text-white overflow-hidden font-serif relative min-h-screen">
      {/* Background Image */}
      <img
        src={contactBg}
        alt="Contact background"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

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
