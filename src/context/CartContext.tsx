import React, { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  product: string;
  date: string;
  status: string;
  image: string;
  quantity: number;
  color: string;
  price: number;
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, "quantity" | "color" | "price">, quantity?: number) => void;
  clearCart: () => void;
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  updateColor: (id: number, color: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const defaultColor = "Natural";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Helper to add an item with defaults
  const addToCart = (
    item: Omit<CartItem, "quantity" | "color" | "price">,
    quantity: number = 1
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex !== -1) {
        // Update quantity if already in cart
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      // Add new item with default color and price
      const price = 59.99 + item.id * 10; // example price calc, adjust as needed
      return [
        ...prev,
        {
          ...item,
          quantity,
          color: defaultColor,
          price,
        },
      ];
    });
  };

  const removeItem = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const updateColor = (id: number, color: string) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, color } : item))
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeItem,
        clearCart,
        updateQuantity,
        updateColor,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
