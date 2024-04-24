import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, totalPrice, tax, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  console.log("State before navigation:", { products: cart });
  const handlePurchase = () => {
    navigate("/payment", { state: { products: cart } });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (cart.length === 0) {
    return <p>Din varukorg är tom.</p>;
  }

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2 style={{ textAlign: "center" }}>Din varukorg</h2>
        {cart.map((item) => (
          <div key={item._id} className="checkout-item">
            <div className="checkout-item-details">
              <img
                src={item.image}
                alt={item.name}
                className="checkout-item-image"
              />
              <div>
                <p className="item-name" style={{ margin: "0" }}>
                  {item.name}
                </p>
                <p style={{ margin: "0" }}>{item.price.toFixed(2)} Kr</p>
              </div>
            </div>
            <div className="quantity-container">
              <button
                className="quantity-btn"
                onClick={() =>
                  updateQuantity(item._id, Math.max(1, item.quantity - 1))
                }
              >
                -
              </button>
              <span className="quantity-text">{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => updateQuantity(item._id, item.quantity + 1)}
              >
                +
              </button>
            </div>
            <div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="remove-button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 100 100"
                  width="25px"
                  height="25px"
                >
                  <path d="M 46 13 C 44.35503 13 43 14.35503 43 16 L 43 18 L 32.265625 18 C 30.510922 18 28.879517 18.922811 27.976562 20.427734 L 26.433594 23 L 23 23 C 20.802666 23 19 24.802666 19 27 C 19 29.197334 20.802666 31 23 31 L 24.074219 31 L 27.648438 77.458984 C 27.88773 80.575775 30.504529 83 33.630859 83 L 66.369141 83 C 69.495471 83 72.11227 80.575775 72.351562 77.458984 L 75.925781 31 L 77 31 C 79.197334 31 81 29.197334 81 27 C 81 24.802666 79.197334 23 77 23 L 73.566406 23 L 72.023438 20.427734 C 71.120481 18.922811 69.489078 18 67.734375 18 L 57 18 L 57 16 C 57 14.35503 55.64497 13 54 13 L 46 13 z M 46 15 L 54 15 C 54.56503 15 55 15.43497 55 16 L 55 18 L 45 18 L 45 16 C 45 15.43497 45.43497 15 46 15 z M 32.265625 20 L 43.832031 20 A 1.0001 1.0001 0 0 0 44.158203 20 L 55.832031 20 A 1.0001 1.0001 0 0 0 56.158203 20 L 67.734375 20 C 68.789672 20 69.763595 20.551955 70.306641 21.457031 L 71.833984 24 L 68.5 24 A 0.50005 0.50005 0 1 0 68.5 25 L 73.5 25 L 77 25 C 78.116666 25 79 25.883334 79 27 C 79 28.116666 78.116666 29 77 29 L 23 29 C 21.883334 29 21 28.116666 21 27 C 21 25.883334 21.883334 25 23 25 L 27 25 L 61.5 25 A 0.50005 0.50005 0 1 0 61.5 24 L 28.166016 24 L 29.693359 21.457031 C 30.236405 20.551955 31.210328 20 32.265625 20 z M 64.5 24 A 0.50005 0.50005 0 1 0 64.5 25 L 66.5 25 A 0.50005 0.50005 0 1 0 66.5 24 L 64.5 24 z M 26.078125 31 L 73.921875 31 L 70.357422 77.306641 C 70.196715 79.39985 68.46881 81 66.369141 81 L 33.630859 81 C 31.53119 81 29.803285 79.39985 29.642578 77.306641 L 26.078125 31 z M 38 35 C 36.348906 35 35 36.348906 35 38 L 35 73 C 35 74.651094 36.348906 76 38 76 C 39.651094 76 41 74.651094 41 73 L 41 38 C 41 36.348906 39.651094 35 38 35 z M 50 35 C 48.348906 35 47 36.348906 47 38 L 47 73 C 47 74.651094 48.348906 76 50 76 C 51.651094 76 53 74.651094 53 73 L 53 69.5 A 0.50005 0.50005 0 1 0 52 69.5 L 52 73 C 52 74.110906 51.110906 75 50 75 C 48.889094 75 48 74.110906 48 73 L 48 38 C 48 36.889094 48.889094 36 50 36 C 51.110906 36 52 36.889094 52 38 L 52 63.5 A 0.50005 0.50005 0 1 0 53 63.5 L 53 38 C 53 36.348906 51.651094 35 50 35 z M 62 35 C 60.348906 35 59 36.348906 59 38 L 59 39.5 A 0.50005 0.50005 0 1 0 60 39.5 L 60 38 C 60 36.889094 60.889094 36 62 36 C 63.110906 36 64 36.889094 64 38 L 64 73 C 64 74.110906 63.110906 75 62 75 C 60.889094 75 60 74.110906 60 73 L 60 47.5 A 0.50005 0.50005 0 1 0 59 47.5 L 59 73 C 59 74.651094 60.348906 76 62 76 C 63.651094 76 65 74.651094 65 73 L 65 38 C 65 36.348906 63.651094 35 62 35 z M 38 36 C 39.110906 36 40 36.889094 40 38 L 40 73 C 40 74.110906 39.110906 75 38 75 C 36.889094 75 36 74.110906 36 73 L 36 38 C 36 36.889094 36.889094 36 38 36 z M 59.492188 41.992188 A 0.50005 0.50005 0 0 0 59 42.5 L 59 44.5 A 0.50005 0.50005 0 1 0 60 44.5 L 60 42.5 A 0.50005 0.50005 0 0 0 59.492188 41.992188 z" />
                </svg>
              </button>
              <p className="item-price">
                {(item.quantity * item.price).toFixed(2)} Kr
              </p>
            </div>
          </div>
        ))}
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          Moms (12%): {tax} Kr
        </p>
        <p style={{ textAlign: "center", fontWeight: "bold" }}>
          Totalt att betala: {totalPrice.toFixed(2)} Kr
        </p>
        <div style={{ textAlign: "center" }}>
          <button
            type="button"
            onClick={handleContinueShopping}
            className="checkout-confirm-button"
            style={{ marginRight: "10px" }}
          >
            Fortsätt handla
          </button>
          <button
            type="button"
            onClick={handlePurchase}
            className="checkout-confirm-button"
          >
            Till betalning
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
