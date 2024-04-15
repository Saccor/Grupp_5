// CartItem.jsx
import React from "react";
import { useCart } from "../context/CartContext.jsx";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div
      style={{
        marginBottom: "10px",
        borderBottom: "1px solid #ccc",
        paddingBottom: "10px",
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3>{item.name}</h3>
      {/* <p>Description: {item.description}</p> */}
      {/* <p>Category: {item.category}</p> */}
      <p>
        {item.quantity}st * {item.price} ={" "}
        {(item.quantity * parseFloat(item.price)).toFixed(2)}Kr
      </p>
      <div>
        <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>
          +
        </button>
        <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>
          -
        </button>
        <button onClick={() => removeFromCart(item._id)}>Remove</button>
      </div>
    </div>
  );
};

export default CartItem;
