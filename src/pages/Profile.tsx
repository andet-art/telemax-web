import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { useLang } from "../context/LanguageContext";
import { Link, useNavigate } from "react-router-dom";
import profileBg from "../assets/wood-bg10.jpg";
import profilePic from "../assets/artisan.jpg";

const Profile = () => {
  const { t } = useLang();
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    fetch("/api/profile.php", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Not authenticated");
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setUser(data.user);
        } else {
          navigate("/signin");
        }
      })
      .catch(() => navigate("/signin"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a120b] text-white flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="bg-[#1a120b] text-white font-serif overflow-hidden">
      {/* 🔹 Profile Header */}
      <section className="relative min-h-screen flex items-center justify-center text-center px-4 sm:px-6 md:px-10 overflow-hidden">
        <img
          src={profileBg}
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-20 text-center"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold drop-shadow mb-4">
            {t("profile.title") || "Welcome Back!"}
          </h1>
          <p className="text-lg text-stone-300">
            {t("profile.subtitle") || "Here's your profile overview"}
          </p>
        </motion.div>
      </section>

      {/* 🔹 Profile Card */}
      <section className="py-20 px-4 sm:px-6 md:px-10 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="bg-[#2a1d13] rounded-2xl p-8 shadow-lg text-center"
        >
          <img
            src={profilePic}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-6 shadow-inner border-4 border-[#c9a36a]"
          />
          <h2 className="text-2xl font-semibold mb-2">{user.name}</h2>
          <p className="text-stone-400 mb-1">{user.email}</p>
          <p className="text-stone-500 text-sm">
            {t("profile.joined") || "Joined"}: {user.joined}
          </p>

          <div className="mt-6 space-x-4">
            <Link
              to="/orders"
              className="inline-block bg-[#c9a36a] text-[#1a120b] px-6 py-2 rounded-full font-semibold hover:bg-[#dcb174] transition"
            >
              {t("profile.orders") || "My Orders"}
            </Link>
            <Link
              to="/logout"
              className="inline-block bg-stone-700 text-white px-6 py-2 rounded-full font-semibold hover:bg-stone-600 transition"
            >
              {t("profile.logout") || "Logout"}
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Profile;
