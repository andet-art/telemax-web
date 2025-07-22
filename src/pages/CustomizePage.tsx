// CustomizePage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/CartContext";

const starterImages = [
  "/images/starter1.png",
  "/images/starter2.png",
  "/images/starter3.png",
];
const ringImages = [
  "/images/ring1.png",
  "/images/ring2.png",
  "/images/ring3.png",
];
const topImages = [
  "/images/top1.png",
  "/images/top2.png",
  "/images/top3.png",
];

const CustomizePage = () => {
  const [starter, setStarter] = useState(0);
  const [ring, setRing] = useState(0);
  const [top, setTop] = useState(0);
  const [engraving, setEngraving] = useState("");
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const customItem = {
      id: Date.now(),
      product: `Custom Pipe`,
      image: topImages[top],
      date: new Date().toISOString().split("T")[0],
      status: "Custom",
      customization: {
        starter: `Starter ${starter + 1}`,
        ring: `Ring ${ring + 1}`,
        top: `Top ${top + 1}`,
        engraving,
      },
    };
    addToCart(customItem, quantity);
    toast.success("Custom pipe added to cart!");
    navigate("/orders");
  };

  const renderOptions = (
    images: string[],
    selectedIndex: number,
    setSelected: (index: number) => void,
    label: string
  ) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-2">{label}</h2>
      <div className="flex gap-4 overflow-auto">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`${label} ${index + 1}`}
            onClick={() => setSelected(index)}
            className={`w-24 h-24 object-contain rounded-lg cursor-pointer border-4 transition-all duration-200 ${
              selectedIndex === index ? "border-yellow-400 scale-105" : "border-transparent"
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#1a120b] text-white p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">🛠 Build Your Custom Pipe</h1>

      {/* Live Preview */}
      <section className="mb-10 text-center">
        <h2 className="text-xl font-bold mb-2">Live Preview</h2>
        <div className="w-52 h-72 relative mx-auto">
          <img
            src={starterImages[starter]}
            alt="Starter"
            className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-full"
          />
          <img
            src={ringImages[ring]}
            alt="Ring"
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20 w-full"
          />
          <img
            src={topImages[top]}
            alt="Top"
            className="absolute top-2/3 left-1/2 -translate-x-1/2 z-30 w-full"
          />
        </div>
      </section>

      {renderOptions(starterImages, starter, setStarter, "Starter")}
      {renderOptions(ringImages, ring, setRing, "Ring")}
      {renderOptions(topImages, top, setTop, "Top")}

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Engraving (optional)</label>
        <input
          type="text"
          placeholder="e.g. To My Love 💛"
          value={engraving}
          onChange={(e) => setEngraving(e.target.value)}
          className="w-full bg-stone-800 border border-stone-600 text-white p-3 rounded-md"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium">Quantity</label>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
          className="w-full bg-stone-800 border border-stone-600 text-white p-3 rounded-md"
        />
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-[#c9a36a] text-black py-3 rounded-md font-semibold hover:bg-[#b8915b]"
      >
        ➕ Add Custom Pipe to Cart
      </button>
    </main>
  );
};

export default CustomizePage;
