// ✅ React & Core Hooks
import { useState } from "react";

// ✅ Routing
import { useNavigate, Link } from "react-router-dom";

// ✅ Animation & Toasts
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

// ✅ Context
import { useCart } from "../context/CartContext";

// ✅ Data
const demoProducts = [
  {
    id: 1,
    product: "Classic Oak Pipe",
    date: "2025-06-30",
    status: "Shipped",
    image: "/assets/pipe1.jpg",
  },
  {
    id: 2,
    product: "Modern Walnut Pipe",
    date: "2025-06-28",
    status: "Processing",
    image: "https://placehold.co/300x300?text=Pipe+2",
  },
  {
    id: 3,
    product: "Vintage Briar Pipe",
    date: "2025-06-26",
    status: "Delivered",
    image: "https://placehold.co/300x300?text=Pipe+3",
  },
];

const statusTabs = ["All", "Shipped", "Processing", "Delivered"];

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [activeStatus, setActiveStatus] = useState("All");
  const navigate = useNavigate();

  const { cart, addToCart } = useCart();

  const handleAddToCart = (item: any, quantity = 1) => {
    addToCart(item, quantity);
    toast.success(`Added ${quantity} × ${item.product} to cart!`);
  };

  let filteredProducts = demoProducts.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (activeStatus !== "All") {
    filteredProducts = filteredProducts.filter(
      (order) => order.status === activeStatus
    );
  }

  filteredProducts.sort((a, b) => {
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

  return (
    <>
      <Toaster position="top-right" />
      <main className="pt-32 min-h-screen bg-[#1a120b] text-white px-4 font-serif">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-10 text-center text-white reveal"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Orders
          </motion.h1>

          {/* Filters */}
          <motion.div
            className="flex justify-center gap-4 mb-6 flex-wrap reveal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {statusTabs.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-4 py-2 rounded-full font-medium transition text-sm sm:text-base ${
                  activeStatus === status
                    ? "bg-[#c9a36a] text-black shadow-md"
                    : "bg-[#2a1d13] text-stone-300 hover:bg-[#c9a36a] hover:text-black"
                } focus:outline-none focus:ring-2 focus:ring-[#c9a36a]`}
              >
                {status}
              </button>
            ))}
          </motion.div>

          {/* Enhanced Search & Sort */}
          <motion.section
            className="relative w-full max-w-5xl mx-auto rounded-xl overflow-hidden bg-[#2a1d13] border border-stone-700 px-6 py-8 mb-10 reveal"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
              <input
                type="text"
                placeholder="🔍 Search orders..."
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
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-stone-400 py-20">
                <p className="text-2xl mb-2">😕 No results found</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              filteredProducts.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="bg-[#2a1d13] border border-stone-700 rounded-2xl p-5 shadow-lg hover:border-[#c9a36a] hover:shadow-[#c9a36a]/30 transition-all flex flex-col reveal"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h2 className="text-xl font-semibold mb-1 text-white">{order.product}</h2>
                  <p className="text-sm text-stone-400 mb-1">
                    🗓 {order.date}
                  </p>
                  <p className="text-sm text-stone-400 mb-4">
                    🚚 Status: <span className="text-[#c9a36a]">{order.status}</span>
                  </p>
                  <QuantityAddToCartButton item={order} onAdd={handleAddToCart} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Floating Cart Button */}
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
};

const QuantityAddToCartButton = ({
  item,
  onAdd,
}: {
  item: any;
  onAdd: (item: any, quantity: number) => void;
}) => {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="mt-auto flex items-center gap-2">
      <input
        type="number"
        min={1}
        value={quantity}
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 1) setQuantity(val);
        }}
        className="w-16 text-center rounded bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
      />
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onAdd(item, quantity)}
        className="bg-[#c9a36a] hover:bg-[#b48a59] px-5 py-2 rounded-md font-medium text-black shadow-md transition"
      >
        + Add
      </motion.button>
    </div>
  );
};

export default Orders;
