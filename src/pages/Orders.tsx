import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const demoProducts = [
  {
    id: 1,
    product: "Classic Oak Pipe",
    date: "2025-06-30",
    status: "Shipped",
    image: "/assets/pipe1.jpg", // use /public/assets or adjust path
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

const Orders = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  const handleAddToCart = (item: any) => {
    if (!cart.find((i) => i.id === item.id)) {
      setCart((prev) => [...prev, item]);
    }
  };

  return (
    <main className="pt-32 min-h-screen bg-stone-950 text-white px-4 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8 text-center">Your Orders</h1>

        <div className="grid gap-6">
          {demoProducts.map((order, index) => (
            <motion.div
              key={order.id}
              className="bg-stone-800 border border-stone-700 rounded-lg p-5 shadow-md flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
            >
              <img
                src={order.image}
                alt={order.product}
                className="w-24 h-24 object-cover rounded-md"
              />
              <div className="flex-1">
                <h2 className="text-xl font-medium mb-1">{order.product}</h2>
                <p className="text-sm text-stone-400">Ordered on: {order.date}</p>
                <p className="text-sm text-stone-400">
                  Status:{" "}
                  <span className="font-semibold text-white">
                    {order.status}
                  </span>
                </p>
              </div>
              <button
                className="bg-amber-600 hover:bg-amber-700 transition px-4 py-2 rounded text-sm font-medium"
                onClick={() => handleAddToCart(order)}
              >
                Order Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Cart Button - bottom right */}
      {cart.length > 0 && (
        <motion.button
          className="fixed bottom-6 right-6 bg-amber-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-amber-700 transition"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() => navigate("/cart", { state: { cart } })}
        >
          🛒 View Cart ({cart.length})
        </motion.button>
      )}
    </main>
  );
};

export default Orders;
