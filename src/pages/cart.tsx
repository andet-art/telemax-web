import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useCart, CartItem } from "../context/CartContext";

const colorOptions = ["Natural", "Dark Walnut", "Ebony", "Mahogany"];

const colorSwatches: Record<string, string> = {
  Natural: "#D2B48C",
  "Dark Walnut": "#5C3A21",
  Ebony: "#2B2B2B",
  Mahogany: "#7B3F00",
};

const Cart = () => {
  const {
    cart,
    removeItem,
    clearCart,
    updateQuantity,
    updateColor,
  } = useCart();
  const navigate = useNavigate();

  const saveCartForLater = () => {
    localStorage.setItem("savedCart", JSON.stringify(cart));
    alert("Your cart has been saved for later!");
  };

  const loadSavedCart = () => {
    const saved = localStorage.getItem("savedCart");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          alert("Load functionality requires setCart in context.");
        }
      } catch {
        alert("Failed to load saved cart.");
      }
    } else {
      alert("No saved cart found.");
    }
  };

  if (cart.length === 0) {
    return (
      <main className="pt-32 min-h-screen bg-[#1a120b] text-white font-serif px-4 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold drop-shadow text-white">🛒 Your Cart is Empty</h1>
        <Link
          to="/"
          className="bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Continue Shopping
        </Link>
        <button
          onClick={loadSavedCart}
          className="underline text-stone-400 hover:text-[#c9a36a]"
        >
          Load Saved Cart
        </button>
      </main>
    );
  }

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <main className="pt-32 min-h-screen bg-[#1a120b] text-white font-serif px-4 sm:px-6 md:px-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-[#c9a36a] mb-12">
        🛒 Your Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
      </h1>

      <AnimatePresence>
        <ul className="grid gap-6 max-w-5xl mx-auto">
          {cart.map((item) => (
            <motion.li
              key={item.id}
              className="bg-[#2a1d13] border border-stone-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-6 shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              layout
            >
              <img
                src={item.image}
                alt={item.product}
                className="w-28 h-28 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-semibold text-white">{item.product}</h2>
                <p className="text-sm text-stone-400">Ordered on: {item.date}</p>
                <p className="text-sm text-stone-400">Status: {item.status}</p>
                <p className="text-lg font-bold text-[#c9a36a]">${item.price.toFixed(2)}</p>

                <label className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-stone-300 min-w-[45px]">Color:</span>
                  <select
                    aria-label={`Select color for ${item.product}`}
                    value={item.color}
                    onChange={(e) => updateColor(item.id, e.target.value)}
                    className="bg-[#1e130a] text-white px-3 py-2 rounded border border-stone-700 focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <span
                    style={{ backgroundColor: colorSwatches[item.color] }}
                    className="w-6 h-6 rounded-full border border-stone-600"
                    title={item.color}
                  />
                </label>
              </div>

              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-[#1e130a] px-3 py-1 rounded text-2xl hover:bg-[#2a1d13] transition"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value) || 1);
                      updateQuantity(item.id, val);
                    }}
                    className="w-14 text-center rounded bg-[#1e130a] border border-stone-700 text-white"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-[#1e130a] px-3 py-1 rounded text-2xl hover:bg-[#2a1d13] transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() =>
                    window.confirm(`Remove ${item.product}?`) && removeItem(item.id)
                  }
                  className="mt-2 bg-red-700 hover:bg-red-800 text-white px-3 py-1 rounded font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto">
        <button
          onClick={() =>
            window.confirm("Clear your entire cart?") && clearCart()
          }
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Clear Cart
        </button>

        <div className="text-2xl font-bold text-white">
          Total: <span className="text-[#c9a36a]">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-[#1e130a] hover:bg-[#2a1d13] text-white px-6 py-3 rounded-full font-semibold shadow transition"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/checkout")}
            className="bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-bold shadow-lg transition"
          >
            Checkout
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-6 text-center text-stone-400 space-x-6">
        <button
          onClick={saveCartForLater}
          className="underline hover:text-[#c9a36a]"
        >
          Save Cart for Later
        </button>
        <button
          onClick={loadSavedCart}
          className="underline hover:text-[#c9a36a]"
        >
          Load Saved Cart
        </button>
      </div>
    </main>
  );
};

export default Cart;
