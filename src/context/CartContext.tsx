import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  type: 'commercial' | 'custom';
  color?: string;
  
  // For commercial pipes
  category?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  inStock?: boolean;
  featured?: boolean;
  isNew?: boolean;
  isBestseller?: boolean;
  tags?: string[];
  specs?: {
    weight: string;
    length: string;
    bowlDepth: string;
    material: string;
  };
  
  // For custom pipes
  head?: {
    id: number;
    name: string;
    material: string;
    price: number;
    image: string;
    description: string;
    features: string[];
  };
  ring?: {
    id: number;
    name: string;
    material: string;
    price: number;
    image: string;
    description: string;
    features: string[];
  };
  tail?: {
    id: number;
    name: string;
    material: string;
    price: number;
    image: string;
    description: string;
    features: string[];
  };
}

interface CartContextType {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  clearCart: () => void;
  removeItem: (id: string | number, type?: string) => void;
  updateQuantity: (id: string | number, quantity: number, type?: string) => void;
  updateColor: (id: string | number, color: string, type?: string) => void;
  cartTotal: number;
  cartItemCount: number;
  cartSavings: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const availableColors = ["Natural", "Dark Walnut", "Ebony", "Mahogany"];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Helper to find item in cart
  const findCartItem = useCallback((id: string | number, type?: string) => {
    return cart.find(item => {
      if (type) {
        return item.id === id && item.type === type;
      }
      return item.id === id;
    });
  }, [cart]);

  // Add item to cart
  const addToCart = useCallback((item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setCart(prev => {
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && cartItem.type === item.type
      );

      if (existingItem) {
        // Update quantity if already in cart
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.type === item.type
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      // Add new item with default color
      return [...prev, {
        ...item,
        quantity,
        color: item.color || availableColors[0]
      }];
    });
  }, []);

  // Remove item from cart
  const removeItem = useCallback((id: string | number, type?: string) => {
    setCart(prev => prev.filter(item => {
      if (type) {
        return !(item.id === id && item.type === type);
      }
      return item.id !== id;
    }));
  }, []);

  // Clear entire cart
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Update item quantity
  const updateQuantity = useCallback((id: string | number, quantity: number, type?: string) => {
    if (quantity < 1) {
      removeItem(id, type);
      return;
    }

    setCart(prev => prev.map(item => {
      if (type) {
        return (item.id === id && item.type === type) 
          ? { ...item, quantity }
          : item;
      }
      return item.id === id ? { ...item, quantity } : item;
    }));
  }, [removeItem]);

  // Update item color
  const updateColor = useCallback((id: string | number, color: string, type?: string) => {
    setCart(prev => prev.map(item => {
      if (type) {
        return (item.id === id && item.type === type) 
          ? { ...item, color }
          : item;
      }
      return item.id === id ? { ...item, color } : item;
    }));
  }, []);

  // Calculate cart totals
  const cartTotal = useMemo(() => 
    cart.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  , [cart]);

  const cartItemCount = useMemo(() => 
    cart.reduce((acc, item) => acc + item.quantity, 0)
  , [cart]);

  const cartSavings = useMemo(() => 
    cart.reduce((acc, item) => {
      if (item.originalPrice) {
        return acc + ((item.originalPrice - item.price) * item.quantity);
      }
      return acc;
    }, 0)
  , [cart]);

  const contextValue = useMemo(() => ({
    cart,
    setCart,
    addToCart,
    removeItem,
    clearCart,
    updateQuantity,
    updateColor,
    cartTotal,
    cartItemCount,
    cartSavings,
  }), [
    cart,
    addToCart,
    removeItem,
    clearCart,
    updateQuantity,
    updateColor,
    cartTotal,
    cartItemCount,
    cartSavings,
  ]);

  return (
    <CartContext.Provider value={contextValue}>
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

export { availableColors };