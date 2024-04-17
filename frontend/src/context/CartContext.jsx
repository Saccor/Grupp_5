import React, { createContext, useContext, useState, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage.jsx";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useLocalStorage("cart", []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const totalPrice = useMemo(() => 
    cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const tax = useMemo(() => parseFloat((totalPrice * 0.12).toFixed(2)), [totalPrice]);
  
  const totalIncludingTax = useMemo(() => totalPrice + tax, [totalPrice, tax]);

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
        totalPrice, // Use this for display purposes
        totalIncludingTax, // Use this for the payment intent
        tax,
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
