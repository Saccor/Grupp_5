import React from "react";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";

const CartSidebar = () => {
  const { cart, isCartOpen, toggleCart } = useCart();
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  if (!isCartOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        width: "300px",
        maxHeight: "100vh",
        overflowY: "auto",
        background: "white",
        boxShadow: "-2px 0 4px rgba(0,0,0,0.1)",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1100,
      }}
    >
      <button
        onClick={toggleCart}
        style={{ marginLeft: "auto", cursor: "pointer" }}
      >
        Close
      </button>
      {cart.map((item) => (
        <CartItem key={item._id} item={item} />
      ))}
      <div style={{ marginTop: "auto", fontWeight: "bold" }}>
        Totalt: {totalPrice}Kr
      </div>
    </div>
  );
};

export default CartSidebar;
