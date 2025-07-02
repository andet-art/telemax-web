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

  // Save/load for later using localStorage
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
          // We want to update context cart here
          // But useCart doesn't expose setCart directly, so we must extend or add a function.
          // Let's assume useCart exposes setCart:
          // If not, we can workaround or add it to context.

          // For now, just alert
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
      <main className="pt-32 min-h-screen bg-stone-950 text-white px-4 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">🛒 Your Cart is Empty</h1>
        <Link
          to="/"
          className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Continue Shopping
        </Link>
        <button
          onClick={loadSavedCart}
          className="underline text-stone-400 hover:text-amber-500"
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
  <main className="pt-32 min-h-screen bg-stone-950 text-white px-4">
    <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
      🛒 Your Cart ({cart.reduce((acc, i) => acc + i.quantity, 0)} items)
    </h1>


      <AnimatePresence>
        <ul className="grid gap-6">
          {cart.map((item) => (
            <motion.li
              key={item.id}
              className="bg-stone-800 border border-stone-700 rounded-lg p-5 flex flex-col sm:flex-row sm:items-center gap-6 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50, scale: 0.9 }}
              layout
            >
              <img
                src={item.image}
                alt={item.product}
                className="w-28 h-28 rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-semibold">{item.product}</h2>
                <p className="text-sm text-stone-400">Ordered on: {item.date}</p>
                <p className="text-sm text-stone-400">Status: {item.status}</p>
                <p className="text-lg font-semibold">${item.price.toFixed(2)}</p>

                <label className="flex items-center gap-2">
                  <span className="text-sm text-stone-400 min-w-[45px]">Color:</span>
                  <select
                    aria-label={`Select color for ${item.product}`}
                    value={item.color}
                    onChange={(e) => updateColor(item.id, e.target.value)}
                    className="bg-stone-700 text-white px-3 py-1 rounded"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    style={{ backgroundColor: colorSwatches[item.color] }}
                    className="w-6 h-6 rounded-full border border-stone-600 inline-block"
                    title={item.color}
                  />
                </label>
              </div>

              <div className="flex flex-col items-center gap-2">
                <label htmlFor={`quantity-${item.id}`} className="sr-only">
                  Quantity for {item.product}
                </label>
                <div className="flex items-center gap-2">
                  <button
                    aria-label={`Decrease quantity of ${item.product}`}
                    onClick={() =>
                      updateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="bg-stone-700 px-3 py-1 rounded text-2xl select-none hover:bg-stone-600 transition"
                  >
                    −
                  </button>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => {
                      const val = Math.max(1, Number(e.target.value) || 1);
                      updateQuantity(item.id, val);
                    }}
                    className="w-14 text-center rounded bg-stone-700 border border-stone-600 text-white"
                    aria-live="polite"
                  />
                  <button
                    aria-label={`Increase quantity of ${item.product}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="bg-stone-700 px-3 py-1 rounded text-2xl select-none hover:bg-stone-600 transition"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        `Are you sure you want to remove ${item.product}?`
                      )
                    )
                      removeItem(item.id);
                  }}
                  aria-label={`Remove ${item.product} from cart`}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded font-semibold transition"
                >
                  Remove
                </button>
              </div>
            </motion.li>
          ))}
        </ul>
      </AnimatePresence>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl mx-auto">
        <button
          onClick={() => {
            if (window.confirm("Clear your entire cart?")) clearCart();
          }}
          className="bg-red-700 hover:bg-red-800 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
        >
          Clear Cart
        </button>
        <div className="text-xl font-bold">
          Total: <span className="text-amber-400">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-stone-700 hover:bg-stone-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition"
          >
            Continue Shopping
          </button>
         <button
  onClick={() => navigate("/checkout")}
  className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-bold shadow-lg transition"
>
  Checkout
</button>

        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-6 text-center text-stone-400 space-x-6">
        <button
          onClick={saveCartForLater}
          className="underline hover:text-amber-500"
          aria-label="Save cart for later"
        >
          Save Cart for Later
        </button>
        <button
          onClick={loadSavedCart}
          className="underline hover:text-amber-500"
          aria-label="Load saved cart"
        >
          Load Saved Cart
        </button>
      </div>
    </main>
  );
};

export default Cart;
