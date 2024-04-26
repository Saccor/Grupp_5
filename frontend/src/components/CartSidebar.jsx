import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import "../styles.css";
import { formatPrice } from "../utilities/formatPrice";

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
        <div className="total-section">
          <div className="cart-moms">Moms (12%): {formatPrice(tax)}</div>
          <div className="cart-totalsum">
            Totalsumma: {formatPrice(totalPrice)}
          </div>
        </div>
        <button
          onClick={() => navigate("/checkout")}
          className="checkout-button"
        >
          Till kassan
        </button>
      </div>
    </>
  );
};

export default CartSidebar;
