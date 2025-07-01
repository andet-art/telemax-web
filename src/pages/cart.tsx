import { useLocation } from "react-router-dom";
import { useState } from "react";

interface CartItem {
  id: number;
  product: string;
  date: string;
  status: string;
  image: string;
  quantity: number;
  color: string;
}

const colorOptions = ["Natural", "Dark Walnut", "Ebony", "Mahogany"];

const Cart = () => {
  const location = useLocation();
  const initialCart: CartItem[] = (location.state?.cart || []).map((item: any) => ({
    ...item,
    quantity: 1,
    color: colorOptions[0],
  }));

  const [cart, setCart] = useState<CartItem[]>(initialCart);

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
    );
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateColor = (id: number, newColor: string) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, color: newColor } : item
      )
    );
  };

  return (
    <main className="pt-32 min-h-screen bg-stone-950 text-white px-4">
      <h1 className="text-3xl font-semibold mb-6 text-center">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-center text-stone-400">Your cart is empty.</p>
      ) : (
        <ul className="max-w-2xl mx-auto grid gap-6">
          {cart.map((item) => (
            <li
              key={item.id}
              className="bg-stone-800 border border-stone-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <img
                src={item.image}
                alt={item.product}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div className="flex-1 space-y-1">
                <h2 className="text-xl font-medium">{item.product}</h2>
                <p className="text-stone-400 text-sm">Date: {item.date}</p>
                <p className="text-stone-400 text-sm">Status: {item.status}</p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    className="bg-stone-700 px-2 rounded text-lg"
                    onClick={() => updateQuantity(item.id, -1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="bg-stone-700 px-2 rounded text-lg"
                    onClick={() => updateQuantity(item.id, 1)}
                  >
                    +
                  </button>
                </div>

                {/* Color Dropdown */}
                <div className="mt-2">
                  <label className="text-sm text-stone-400 mr-2">Color:</label>
                  <select
                    value={item.color}
                    onChange={(e) => updateColor(item.id, e.target.value)}
                    className="bg-stone-700 text-white px-2 py-1 rounded"
                  >
                    {colorOptions.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => removeItem(item.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded self-start sm:self-auto"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
};

export default Cart;
