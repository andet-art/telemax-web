import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import heroVideo from "../assets/hero-home.mp4";
import { useCart } from "../context/CartContext";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 6;

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

  const paginatedOrders = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Toaster position="top-right" />
      <main className="relative min-h-screen text-white font-serif overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="absolute inset-0 bg-black/70 z-10" />

        <div className="relative z-20 pt-40 px-4 pb-24 max-w-6xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-10 text-center drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Orders
          </motion.h1>

                    <motion.div
            className="flex justify-center gap-4 mb-10 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {statusTabs.map((status) => (
              <button
                key={status}
                onClick={() => {
                  setCurrentPage(1);
                  setActiveStatus(status);
                }}
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedOrders.length === 0 ? (
              <div className="col-span-full text-center text-stone-400 py-20">
                <p className="text-2xl mb-2">😕 No results found</p>
                <p className="text-sm">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              paginatedOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  className="cursor-pointer bg-[#1a120b] border border-[#2a1d13] hover:border-[#c9a36a]/40 transition-all duration-300 shadow-md hover:shadow-[#c9a36a]/20 rounded-2xl p-5 flex flex-col group"
                >
                  <div className="overflow-hidden rounded-xl mb-4">
                    <img
                      src={order.image}
                      alt={order.product}
                      className="w-full h-48 object-cover rounded-xl transition-transform duration-300 group-hover:scale-105 opacity-90"
                    />
                  </div>
                  <h2 className="text-lg sm:text-xl font-semibold text-white mb-1">
                    {order.product}
                  </h2>
                  <p className="text-sm text-stone-400 mb-1">🗓 {order.date}</p>
                  <span
                    className={`inline-block text-xs font-medium px-3 py-1 rounded-full mb-4 w-fit ${
                      order.status === "Shipped"
                        ? "bg-blue-800 text-blue-300"
                        : order.status === "Processing"
                        ? "bg-yellow-800 text-yellow-300"
                        : order.status === "Delivered"
                        ? "bg-green-800 text-green-300"
                        : "bg-stone-700 text-stone-300"
                    }`}
                  >
                    {order.status}
                  </span>
                  <QuantityAddToCartButton item={order} onAdd={handleAddToCart} />
                </motion.div>
              ))
            )}
          </div>

          <div className="mt-12 flex justify-center gap-2 text-sm">
            {Array.from({
              length: Math.ceil(filteredProducts.length / itemsPerPage),
            }).map((_, i) => {
              const page = i + 1;
              const isActive = page === currentPage;
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-md border ${
                    isActive
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

        <AnimatePresence>
          {selectedOrder && (
            <motion.div
              className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedOrder(null)}
            >
              <motion.div
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1a120b] rounded-2xl p-6 max-w-lg w-full text-white shadow-xl"
              >
                <h2 className="text-xl font-semibold mb-4">{selectedOrder.product}</h2>
                <img
                  src={selectedOrder.image}
                  alt={selectedOrder.product}
                  className="w-full h-56 object-cover rounded-lg mb-4"
                />
                <p className="text-sm text-stone-400 mb-2">🗓 {selectedOrder.date}</p>
                <p className="text-sm text-stone-400 mb-6">
                  Status: <span className="text-[#c9a36a] font-medium">{selectedOrder.status}</span>
                </p>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="bg-[#c9a36a] text-black px-4 py-2 rounded-md hover:bg-[#b8915b] transition w-full"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
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
        className="bg-[#c9a36a] hover:bg-[#b8915b] px-5 py-2 rounded-md font-medium text-black shadow-md transition"
      >
        + Add
      </motion.button>
    </div>
  );
};

export default Orders;
