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

    // Simulate order submission delay
    setTimeout(() => {
      alert(`Thank you, ${formData.name}! Your order has been placed.`);
      clearCart();
      navigate("/");
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <main className="pt-32 min-h-screen bg-stone-950 text-white px-4 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-semibold">Your cart is empty.</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-semibold shadow-lg"
        >
          Continue Shopping
        </button>
      </main>
    );
  }

  return (
    <main className="pt-32 min-h-screen bg-stone-950 text-white px-4">

      <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-400 to-pink-500 bg-clip-text text-transparent">
        Checkout
      </h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
        <ul className="divide-y divide-stone-700">
          {cart.map((item) => (
            <li key={item.id} className="py-3 flex justify-between">
              <span>{item.product} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 text-right text-xl font-bold">
          Total: <span className="text-amber-400">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block mb-1 font-semibold">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="w-full px-4 py-2 rounded-md bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 font-semibold">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 rounded-md bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="address" className="block mb-1 font-semibold">
            Shipping Address
          </label>
          <textarea
            name="address"
            id="address"
            rows={4}
            className="w-full px-4 py-2 rounded-md bg-stone-800 border border-stone-700 text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-amber-600 hover:bg-amber-700 text-black px-6 py-3 rounded-lg font-bold shadow-lg transition disabled:opacity-70"
        >
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </main>
  );
};

export default Checkout;
