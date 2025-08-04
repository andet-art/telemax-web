import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import heroVideo from "../assets/hero-home.mp4";
import { Layers } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";
const categoriesList = ["All", "Wood", "Metal", "Hybrid", "Luxury"];

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedProducts, setFetchedProducts] = useState<any[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [navbarHidden, setNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const itemsPerPage = 6;
  const navigate = useNavigate();
  const { cart, addToCart, updateQuantity } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((p: any) => ({
          id: p.id,
          product: p.name,
          category: p.category || "Uncategorized",
          date: p.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
          status: "Available",
          image: p.image_url,
          price: p.price,
        }));
        setFetchedProducts(mapped);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const isHiding = currentY > lastScrollY && currentY > 10;
      setNavbarHidden(isHiding);
      setLastScrollY(currentY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const filteredProducts = fetchedProducts
    .filter((p) => (selectedCategory === "All" ? true : p.category === selectedCategory))
    .filter((p) => p.product.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case "newest":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "oldest":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "az":
          return a.product.localeCompare(b.product);
        case "za":
          return b.product.localeCompare(a.product);
        default:
          return 0;
      }
    });

  const paginatedOrders = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleQuantityChange = (id: number, value: number) => {
    const newValue = Math.max(1, value);
    setQuantities((prev) => ({ ...prev, [id]: newValue }));
    updateQuantity(id, newValue);
  };

  const handleAddToCart = (item: any) => {
    const quantity = quantities[item.id] || 1;
    addToCart(item, quantity);
    toast.success(`Added ${quantity} × ${item.product} to cart!`);
  };

  return (
    <>
      <Toaster position="top-right" />

     {/* Sidebar Toggle Button */}
{!isSidebarExpanded && (
  <div
    onClick={() => setIsSidebarExpanded(true)}
    className="fixed top-4 left-0 z-50 bg-[#1a120b] hover:bg-[#2a1d13] border-r border-[#2a1d13] text-white flex items-center justify-center w-8 h-10 cursor-pointer transition duration-300 rounded-tr-md rounded-br-md shadow-md"
  >
    ☰
  </div>
)}

{/* Sidebar Panel */}
{/* Sidebar Panel */}
<aside
  className={`
    ${isSidebarExpanded ? "w-64" : "w-0"}
    ${navbarHidden ? "fixed top-0 h-screen" : "absolute top-16 h-[calc(100%-4rem)]"}
    left-0 z-40 bg-[#1a120b] border-r border-[#2a1d13] shadow-lg transition-all duration-500 ease-in-out overflow-y-auto
  `}
>
  {isSidebarExpanded && (
    <div className="relative text-white h-full flex flex-col px-6 pt-16 pb-6">
      {/* Close Button */}
      <button
        onClick={() => setIsSidebarExpanded(false)}
        className="absolute top-4 right-4 text-white hover:text-[#c9a36a] text-lg transition"
      >
        ✖
      </button>

      <h3 className="text-xl font-bold mb-6 mt-2 flex items-center gap-2 border-b border-[#2a1d13] pb-3">
        <Layers className="w-5 h-5 text-[#c9a36a]" />
        <span className="tracking-wide">Categories</span>
      </h3>

      <ul className="space-y-4 text-sm pb-8">
        {categoriesList.map((cat) => (
          <li
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
              setIsSidebarExpanded(false);
            }}
            className={`group cursor-pointer px-3 py-2 rounded-md transition-all duration-300 ${
              selectedCategory === cat
                ? "bg-[#2a1d13] text-[#c9a36a] font-semibold shadow-inner"
                : "text-white hover:bg-[#2a1d13] hover:text-[#c9a36a]"
            }`}
          >
            <span className="inline-block transition-transform group-hover:translate-x-1">
              • {cat}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )}
</aside>







    {/* Main Content */}
    <main className="relative min-h-screen pt-28 pb-24 flex overflow-auto bg-[url('/assets/woodgrain.jpg')] bg-cover bg-center text-white font-serif">
      <video
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
      />
      <div className="absolute inset-0 bg-black/70 z-0" />

      <motion.div
        className={`relative z-20 flex-1 px-6 transition-all duration-300 ${
          isSidebarExpanded ? "ml-64" : "ml-10"
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl font-bold mb-10 text-center drop-shadow-xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Our Custom Pipes
        </motion.h1>

        {/* Filters */}
        <motion.section
          className="max-w-5xl mx-auto bg-[#2a1d13] border border-stone-700 rounded-xl px-6 py-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
            <input
              type="text"
              placeholder="🔍 Search pipes..."
              className="w-full md:flex-1 px-4 py-2.5 text-sm rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2.5 text-sm rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="az">🔤 A–Z</option>
              <option value="za">🔤 Z–A</option>
            </select>
          </div>
        </motion.section>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedOrders.length === 0 ? (
            <div className="col-span-full text-center text-stone-400 py-20">
              <p className="text-2xl mb-2">😕 No products found</p>
            </div>
          ) : (
            paginatedOrders.map((product, idx) => {
              const quantity = quantities[product.id] || 1;
              const isInCart = cart.some((i) => i.id === product.id);
              return (
                <motion.div
                  key={product.id}
                  className="bg-[#1a120b] border border-[#2a1d13] rounded-2xl p-5 flex flex-col justify-between shadow-md hover:border-[#c9a36a]/50 transition-all duration-300 group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <div>
                    <img
                      src={product.image}
                      alt={product.product}
                      className="w-full h-48 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h2 className="text-xl font-semibold mb-2">{product.product}</h2>
                    <p className="text-sm text-stone-400 mb-2">🗓 {product.date}</p>
                    <span className="inline-block text-xs font-medium px-3 py-1 rounded-full bg-green-800 text-green-300">
                      {product.status}
                    </span>
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    {isInCart ? (
                      <>
                        <button
                          onClick={() => handleQuantityChange(product.id, quantity - 1)}
                          className="px-3 py-1 bg-stone-800 text-white rounded-l-md border border-stone-700"
                        >
                          −
                        </button>
                        <span className="px-3 py-1 bg-stone-700 text-white">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(product.id, quantity + 1)}
                          className="px-3 py-1 bg-stone-800 text-white rounded-r-md border border-stone-700"
                        >
                          +
                        </button>
                      </>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          handleQuantityChange(product.id, 1);
                          handleAddToCart(product);
                        }}
                        className="bg-[#c9a36a] hover:bg-[#b8915b] px-4 py-2 rounded-md text-black font-medium"
                      >
                        + Add
                      </motion.button>
                    )}
                  </div>
                </motion.div>
              );
            })
          )}
        </div>

        {/* Customize Button */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/customize-image/0")}
            className="bg-[#c9a36a] hover:bg-[#b8915b] text-black font-medium px-6 py-3 rounded-full shadow-lg transition"
          >
            🎨 Start Customizing
          </button>
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2 text-sm">
          {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md border ${
                i + 1 === currentPage
                  ? "bg-[#c9a36a] text-black border-[#c9a36a]"
                  : "bg-[#2a1d13] text-white border-stone-700 hover:bg-[#3b2f2f]"
              } transition`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Floating Cart */}
      {cart.length > 0 && (
        <motion.button
          className="fixed bottom-6 right-6 bg-[#c9a36a] text-black px-6 py-3 rounded-full shadow-lg hover:brightness-110 active:scale-95 z-50"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/cart")}
        >
          🛒 View Cart ({cart.reduce((acc, cur) => acc + cur.quantity, 0)})
        </motion.button>
      )}
    </main>
  </>
);


}