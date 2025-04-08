"use client";

import {
  useState,
  ReactNode,
  useEffect,
  useContext,
  createContext,
} from "react";

// data.
import { Product } from "@/data/products";

type Cart = {
  [productId: string]: {
    product: Product;
    quantity: number;
  };
};

type MainContextType = {
  cart: Cart;
  incrementItem: (id: string) => void;
  decrementItem: (id: string) => void;
  removeFromCart: (id: string) => void;
  addToCard: (product: Product, quantity?: number) => void;
};

const MainContext = createContext<MainContextType | undefined>(undefined);

export const MainContextProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState({});

  const addToCard = (product: Product, quantity?: number) => {
    setCart((prevCart: Cart) => {
      const existingCartItem = prevCart[product.id];

      const updatedCartItem = {
        product: product,
        quantity: existingCartItem
          ? existingCartItem.quantity + (quantity || 1)
          : quantity || 1,
      };

      return {
        ...prevCart,
        [product.id]: updatedCartItem,
      };
    });
  };

  const incrementItem = (id: string) => {
    setCart((prevCart: Cart) => {
      const existingCartItem = prevCart[id];
      if (!existingCartItem) return prevCart;

      return {
        ...prevCart,
        [id]: {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        },
      };
    });
  };

  const decrementItem = (id: string) => {
    setCart((prevCart: Cart) => {
      const existingCartItem = prevCart[id];
      if (!existingCartItem || existingCartItem.quantity <= 1) return prevCart;

      return {
        ...prevCart,
        [id]: {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        },
      };
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart: Cart) => {
      const newCart = { ...prevCart };
      delete newCart[id];
      return newCart;
    });
  };

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const states = {
    cart,
    addToCard,
    incrementItem,
    decrementItem,
    removeFromCart,
  };

  return <MainContext.Provider value={states}>{children}</MainContext.Provider>;
};

export const useMainContext = () => {
  const context = useContext(MainContext);

  if (!context) {
    throw new Error("useMainContext must be used within a MainContextProvider");
  }

  return context;
};
