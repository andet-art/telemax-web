import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.address) {
      alert("Please fill all the fields.");
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      navigate("/payment", {
        state: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          total: totalPrice,
        },
      });
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="pt-32 min-h-screen w-full bg-[#1a120b] text-white font-serif px-4 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">🛒 Your cart is empty.</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="pt-32 min-h-screen w-full bg-[#1a120b] text-white font-serif px-4 sm:px-6 md:px-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-[#c9a36a]">
        🧾 Checkout
      </h1>

      {/* Order Summary */}
      <div className="mb-10 bg-[#2a1d13] p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-800 w-full">
        <h2 className="text-2xl font-bold mb-4 text-white">Order Summary</h2>
        <ul className="divide-y divide-stone-700 text-stone-300 text-base">
          {cart.map((item) => (
            <li key={item.id} className="py-3 flex justify-between">
              <span>{item.product} × {item.quantity}</span>
              <span className="text-[#c9a36a] font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right text-xl font-bold text-white">
          Total: <span className="text-[#c9a36a]">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 bg-[#2a1d13] p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-800 w-full">
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-[#c9a36a]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-[#c9a36a]">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 font-semibold text-[#c9a36a]">
            Shipping Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-[#c9a36a]"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-bold shadow-lg transition disabled:opacity-70"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </main>
  );
};

export default Checkout;
