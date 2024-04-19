import React, { createContext, useContext, useState, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalPrice = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const taxRate = 0.12;

  const basePrice = useMemo(() => {
    return (totalPrice / (1 + taxRate)).toFixed(2);
  }, [totalPrice]);

  const tax = useMemo(() => {
    return (totalPrice - parseFloat(basePrice)).toFixed(2);
  }, [totalPrice, basePrice]);

  const addToCart = (product) => {
    const found = cart.find((item) => item._id === product._id);
    if (found) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity > 0) {
      setCart(
        cart.map((item) =>
          item._id === productId ? { ...item, quantity } : item
        )
      );
    } else {
      removeFromCart(productId);
    }
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        basePrice,
        tax,
        totalPrice,
        setCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
