import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

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
    image: "https://placehold.co/100x100?text=Pipe",
  },
  {
    id: 3,
    product: "Vintage Briar Pipe",
    date: "2025-06-26",
    status: "Delivered",
    image: "https://placehold.co/100x100?text=Pipe",
  },
];

const statusTabs = ["All", "Shipped", "Processing", "Delivered"];

const Orders = () => {
  const [cart, setCart] = useState<
    { id: number; product: string; quantity: number }[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [activeStatus, setActiveStatus] = useState("All");
  const navigate = useNavigate();

  // Add with quantity & toast
  const handleAddToCart = (item: any, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        // Increase quantity
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
    toast.success(`Added ${quantity} × ${item.product} to cart!`);
  };

  // Filter by search term and status
  let filteredProducts = demoProducts.filter((order) =>
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (activeStatus !== "All") {
    filteredProducts = filteredProducts.filter(
      (order) => order.status === activeStatus
    );
  }

  // Sort filtered results
  filteredProducts = filteredProducts.sort((a, b) => {
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
      <main className="pt-32 min-h-screen bg-gradient-to-br from-stone-900 via-stone-950 to-black text-white px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <motion.h1
            className="text-4xl sm:text-5xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-pink-500"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Your Pipe Orders
          </motion.h1>

          {/* Tabs */}
          <motion.div
            className="flex justify-center gap-6 mb-8 flex-wrap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {statusTabs.map((status) => (
              <button
                key={status}
                onClick={() => setActiveStatus(status)}
                className={`px-5 py-2 rounded-full font-semibold transition
                  ${
                    activeStatus === status
                      ? "bg-amber-600 text-black shadow-lg"
                      : "bg-stone-800 text-stone-400 hover:bg-amber-600 hover:text-black"
                  }
                  focus:outline-none focus:ring-2 focus:ring-amber-500`}
                aria-pressed={activeStatus === status}
              >
                {status}
              </button>
            ))}
          </motion.div>

          {/* Search & Sort */}
          <motion.div
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10 bg-stone-900 p-4 rounded-xl shadow-md border border-stone-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <input
              type="text"
              placeholder="🔍 Search by product name..."
              className="flex-1 px-4 py-2 rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-4 py-2 rounded-md bg-stone-800 text-white border border-stone-600 focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="newest">📅 Newest First</option>
              <option value="oldest">📅 Oldest First</option>
              <option value="az">🔤 A–Z</option>
              <option value="za">🔤 Z–A</option>
            </select>
          </motion.div>

          {/* Empty Orders State */}
          {demoProducts.length === 0 && (
            <motion.div
              className="text-center text-stone-400 py-16"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-3xl mb-4">🎉 You have no orders yet!</p>
              <Link
                to="/"
                className="inline-block bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-full font-semibold shadow-lg transition"
              >
                Start Shopping
              </Link>
            </motion.div>
          )}

          {/* Orders List */}
          <div className="grid gap-6">
            {filteredProducts.length === 0 && demoProducts.length > 0 ? (
              <motion.div
                className="text-center text-stone-400 py-16"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-2xl">😕 No orders found</p>
                <p className="text-sm mt-2">Try a different product name or status.</p>
              </motion.div>
            ) : (
              filteredProducts.map((order, index) => (
                <motion.div
                  key={order.id}
                  className="bg-stone-900 border border-stone-700 rounded-2xl p-5 shadow-lg flex items-center gap-4 hover:border-amber-500 hover:shadow-amber-500/20 transition-all"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-24 h-24 object-cover rounded-xl shadow-inner"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-white mb-1">
                      {order.product}
                    </h2>
                    <p className="text-sm text-stone-400">🗓 Ordered on: {order.date}</p>
                    <p className="text-sm text-stone-400">
                      🚚 Status:{" "}
                      <span className="font-semibold text-white">{order.status}</span>
                    </p>
                  </div>

                  {/* Quantity selector + animated button */}
                  <QuantityAddToCartButton item={order} onAdd={handleAddToCart} />
                </motion.div>
              ))
            )}
          </div>
        </div>

        {/* Floating Cart Button */}
        {cart.length > 0 && (
          <motion.button
            className="fixed bottom-6 right-6 bg-gradient-to-r from-amber-500 to-pink-500 text-white px-6 py-3 rounded-full shadow-lg hover:brightness-110 transition-transform active:scale-95"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate("/cart", { state: { cart } })}
          >
            🛒 View Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)})
          </motion.button>
        )}
      </main>
    </>
  );
};

// Separate component for quantity + animated add button
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
        onChange={(e) => {
          const val = Number(e.target.value);
          if (val >= 1) setQuantity(val);
        }}
        className="w-16 text-center rounded-md bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
      />
      <motion.button
        whileTap={{ scale: 0.9 }}
        className="bg-amber-600 hover:bg-amber-700 transition px-5 py-2 rounded-lg text-sm font-medium shadow-md select-none"
        onClick={() => onAdd(item, quantity)}
      >
        🛍 Add
      </motion.button>
    </div>
  );
};

export default Orders;
