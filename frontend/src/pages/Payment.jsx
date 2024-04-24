import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Payment = () => {
  const { state } = useLocation();
  // const navigate = useNavigate();
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const { clearCart } = useCart();

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    cvv: "",
    expiryDate: "",
  });

  const [customerDetails, setCustomerDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    postalCode: "",
    city: "",
  });

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setCustomerDetails({ ...customerDetails, [name]: value });
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (
      ["firstName", "lastName", "city"].includes(name) &&
      !/^[a-zA-Z\s]*$/.test(value)
    ) {
      return; // Only allow letters and spaces
    }

    if (name === "postalCode") {
      formattedValue = value.replace(/[^\d]/g, "").slice(0, 5); // Only allow numbers and limit length to 5
      setCustomerDetails({ ...customerDetails, [name]: formattedValue });
      return;
    }

    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  // const handlePaymentInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setPaymentDetails({ ...paymentDetails, [name]: value });
  // };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "cardNumber" && (!/^\d*$/.test(value) || value.length > 16)) {
      return; // Only allow up to 16 digits
    }
    if (name === "cvv" && (!/^\d*$/.test(value) || value.length > 3)) {
      return; // Only allow up to 3 digits
    }
    if (name === "expiryDate") {
      // Remove non-digits and limit length
      formattedValue = value.replace(/[^\d]/g, "").slice(0, 4);
      if (formattedValue.length >= 3) {
        // Insert slash after MM (2 digits)
        formattedValue =
          formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
      }
      if (formattedValue.length > 5) {
        return; // Prevent more input after MM/YY
      }
    }
    setPaymentDetails({ ...paymentDetails, [name]: formattedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("State:", state);
      const orderItems = state.products
        ? state.products.map((product) => ({
            product: product,
            quantity: product.quantity,
          }))
        : [];

      const total = orderItems.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );

      const totalIncludingVAT = total * 1.12;

      console.log("Order Items:", orderItems);
      console.log("Total:", total);
      console.log("Total Including VAT:", totalIncludingVAT);

      const orderData = {
        orderItems: orderItems,
        customer: customerDetails,
        paymentDetails: paymentDetails,
        paymentStatus: "Unpaid",
        total: total,
        totalIncludingVAT: totalIncludingVAT,
      };

      console.log("Order Data:", orderData);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        orderData
      );

      console.log("Order created:", response.data);
      setIsPaymentSuccessful(true); 
      clearCart();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  if (isPaymentSuccessful) {
    const totalPrice = state.products.reduce(
      (total, product) => total + product.price,
      0
    );
  
    return (
      <>
        <div className="confirmation-message">
          <h2>Tack för ditt köp!</h2>
          <h4>Du kan plocka upp din order inom 2 timmar på St:eriksgatan 33.</h4>
        </div>
        <div className="checkout-container">
          <div className="checkout-box">
            <h2 style={{ textAlign: "center" }}>Beställda produkter:</h2>
            {state.products.map((product) => (
              <div key={product.id} className="checkout-item">
                <img
                  src={product.image}
                  alt={product.name}
                  className="checkout-item-image"
                />
                <div className="checkout-item-details">
                  <p className="item-name">{product.name}</p>
                  <p className="item-price" style={{ marginLeft: "10px" }}>
                    {product.price.toFixed(2)} Kr
                  </p>
                </div>
              </div>
            ))}
            <div className="total-price">
              <p style={{ textAlign: "center", fontWeight: "bold" }}>
                Totalt pris: {totalPrice.toFixed(2)} Kr
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  

  return (
    <div className="payment-form">
      <form onSubmit={handleSubmit}>
        <div className="payment-section">
          <h2>Kunduppgifter</h2>
          <label>
            Förnamn:
            <input
              type="text"
              name="firstName"
              value={customerDetails.firstName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Efternamn:
            <input
              type="text"
              name="lastName"
              value={customerDetails.lastName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={customerDetails.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Adress:
            <input
              type="text"
              name="address"
              value={customerDetails.address}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Postnummer:
            <input
              type="text"
              name="postalCode"
              value={customerDetails.postalCode}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Ort:
            <input
              type="text"
              name="city"
              value={customerDetails.city}
              onChange={handleInputChange}
              required
            />
          </label>
        </div>

        <div className="payment-section">
          <h2>Betalningsuppgifter</h2>

          <label>
            Kortnummer:
            <input
              type="text"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handlePaymentInputChange}
              required
            />
          </label>
          <label>
            CVV:
            <input
              type="text"
              name="cvv"
              value={paymentDetails.cvv}
              onChange={handlePaymentInputChange}
              required
            />
          </label>
          <label>
            Giltighetstid:
            <input
              type="text"
              name="expiryDate"
              value={paymentDetails.expiryDate}
              onChange={handlePaymentInputChange}
              required
            />
          </label>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px 20px",
            backgroundColor: "#e60000",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Bekräfta köp
        </button>
      </form>
    </div>
  );
};

export default Payment;
