import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    description: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill all the fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://209.38.231.125:4000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          full_name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          description: formData.description,
          items: cart.map(item => ({
            product_id: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          total_price: totalPrice,
        }),
      });

      if (!response.ok) throw new Error("Failed to place order");

      clearCart();
      navigate("/payment", {
        state: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          total: totalPrice,
        },
      });
    } catch (err) {
      alert("Error placing order.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
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

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-[#2a1d13] p-6 sm:p-8 rounded-2xl shadow-xl border border-stone-800 w-full"
      >
        <div>
          <label htmlFor="name" className="block mb-2 font-semibold text-[#c9a36a]">Full Name</label>
          <input type="text" name="name" id="name" className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white" value={formData.name} onChange={handleChange} required disabled={isSubmitting} />
        </div>

        <div>
          <label htmlFor="email" className="block mb-2 font-semibold text-[#c9a36a]">Email</label>
          <input type="email" name="email" id="email" className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white" value={formData.email} onChange={handleChange} required disabled={isSubmitting} />
        </div>

        <div>
          <label htmlFor="phone" className="block mb-2 font-semibold text-[#c9a36a]">Phone</label>
          <input type="text" name="phone" id="phone" className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white" value={formData.phone} onChange={handleChange} required disabled={isSubmitting} />
        </div>

        <div>
          <label htmlFor="address" className="block mb-2 font-semibold text-[#c9a36a]">Shipping Address</label>
          <textarea name="address" id="address" rows={3} className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white" value={formData.address} onChange={handleChange} required disabled={isSubmitting} />
        </div>

        <div>
          <label htmlFor="description" className="block mb-2 font-semibold text-[#c9a36a]">Order Notes (optional)</label>
          <textarea name="description" id="description" rows={3} className="w-full px-4 py-2 rounded-md bg-[#1e130a] border border-stone-700 text-white" value={formData.description} onChange={handleChange} disabled={isSubmitting} />
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full bg-[#c9a36a] hover:bg-[#b68d58] text-[#1a120b] px-6 py-3 rounded-full font-bold shadow-lg transition disabled:opacity-70">
          {isSubmitting ? "Processing..." : "Place Order"}
        </button>
      </form>
    </main>
  );
};

export default Checkout;
