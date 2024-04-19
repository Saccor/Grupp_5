import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import "../styles.css";

const CartSidebar = () => {
  const { cart, isCartOpen, toggleCart, tax, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {isCartOpen && <div className="backdrop" onClick={toggleCart}></div>}

      <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
        <button onClick={toggleCart} className="close-button">
          Stäng
        </button>
        <h4 className="cartSidebar-title">Varukorg</h4>
        {cart.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
        <div className="total-section">Moms (12% inkluderat): {tax} Kr</div>
        <div className="total-section bold">
          Totalsumma: {totalPrice.toFixed(2)} Kr
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="checkout-button"
        >
          Till varukogen
        </button>
      </div>
    </>
  );
};

export default CartSidebar;
