import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/CartContext";
import heroVideo from "../assets/hero-home.mp4";

const API_BASE = import.meta.env.VITE_API_URL || "http://209.38.231.125:4000";

export default function Orders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [fetchedProducts, setFetchedProducts] = useState<any[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const itemsPerPage = 6;

  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.map((p: any) => ({
          id: p.id,
          product: p.name,
          date: p.created_at?.slice(0, 10) || new Date().toISOString().slice(0, 10),
          status: "Available",
          image: p.image_url,
          isCustom: true, // force all fetched products to be customizable
        }));
        setFetchedProducts(mapped);
      })
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const filteredProducts = fetchedProducts
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

  const handleAddToCart = (item: any, quantity = 1) => {
    addToCart(item, quantity);
    toast.success(`Added ${quantity} × ${item.product} to cart!`);
  };

  return (
    <>
      <Toaster position="top-right" />
      <main className="relative min-h-screen text-white font-serif overflow-hidden bg-[url('/assets/woodgrain.jpg')] bg-cover bg-center">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 pt-36 px-4 pb-24 max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-10 text-center text-white drop-shadow-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Custom Pipes
          </motion.h1>

          <motion.section
            className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-[#2a1d13] border border-stone-700 px-6 py-8 mb-12"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrders.length === 0 ? (
              <div className="col-span-full text-center text-stone-400 py-20">
                <p className="text-2xl mb-2">😕 No products found</p>
              </div>
            ) : (
              paginatedOrders.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-[#1a120b] border border-[#2a1d13] hover:border-[#c9a36a]/50 transition-all duration-300 shadow-md rounded-2xl p-5 flex flex-col justify-between group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
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
                  <div className="mt-4 flex justify-between items-center gap-3">
                    <button
                      onClick={() => navigate(`/customize-image/${product.id}`)}
                      className="flex-1 bg-[#c9a36a] hover:bg-[#b8915b] text-black font-medium px-4 py-2 rounded-md transition"
                    >
                      🎨 Customize
                    </button>
                    <QuantityAddToCartButton item={product} onAdd={handleAddToCart} />
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center gap-2 text-sm">
            {Array.from({ length: Math.ceil(filteredProducts.length / itemsPerPage) }).map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md border ${
                    page === currentPage
                      ? "bg-[#c9a36a] text-black border-[#c9a36a]"
                      : "bg-[#2a1d13] text-white border-stone-700 hover:bg-[#3b2f2f]"
                  } transition`}
                >
                  {page}
                </button>
              );
            })}
          </div>
        </div>

        {cart.length > 0 && (
          <motion.button
            className="fixed bottom-6 right-6 bg-[#c9a36a] text-black px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-transform active:scale-95 z-50"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/cart")}
          >
            🛒 View Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})
          </motion.button>
        )}
      </main>
    </>
  );
}

const QuantityAddToCartButton = ({
  item,
  onAdd,
}: {
  item: any;
  onAdd: (item: any, quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex items-center gap-2">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
        className="w-16 text-center rounded bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onAdd(item, quantity)}
        className="bg-[#c9a36a] hover:bg-[#b8915b] px-4 py-2 rounded-md text-black font-medium"
      >
        + Add
      </motion.button>
    </div>
  );
};
