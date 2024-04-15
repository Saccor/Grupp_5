import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalIncludingTax, tax, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p>Din varukorg är tom.</p>;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "#ffff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
          maxWidth: "600px",
          width: "100%",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Din varukorg</h2>
        {cart.map((item) => (
          <div
            key={item._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "8px",
              backgroundColor: "white",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                marginRight: "10px",
                objectFit: "contain",
              }}
            />
            <div
              style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
            >
              <p style={{ margin: "0" }}>{item.name}</p>
              <p style={{ margin: "0" }}>{item.price.toFixed(2)} Kr</p>
            </div>
            <div>
              <button
                onClick={() =>
                  updateQuantity(item._id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              {item.quantity}
              <button
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <p>{(item.quantity * item.price).toFixed(2)} Kr</p>
          </div>
        ))}
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Moms (12%): {tax} Kr
        </p>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Totalt att betala: {totalIncludingTax} Kr
        </p>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={() => navigate("/stripe")}
            style={{
              padding: "10px",
              borderRadius: "5px",
              border: "none",
              backgroundColor: "#007bff",
              color: "white",
              cursor: "pointer",
              marginTop: "20px",
            }}
          >
            Till kassan
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
