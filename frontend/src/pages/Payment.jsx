import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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

      const orderData = {
        orderItems: orderItems,
        customer: customerDetails,
        paymentDetails: paymentDetails,
        paymentStatus: "Unpaid",
        total: total,
        totalIncludingVAT: totalIncludingVAT,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        orderData
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="payment-form" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
        <div className="payment-section">
          <h2>Kunduppgifter</h2>
          <label>
            Förnamn:
            <input type="text" name="firstName" value={customerDetails.firstName} onChange={handleInputChange} required />
          </label>
          <label>
            Efternamn:
            <input type="text" name="lastName" value={customerDetails.lastName} onChange={handleInputChange} required />
          </label>
          <label>
            Email:
            <input type="email" name="email" value={customerDetails.email} onChange={handleInputChange} required />
          </label>
          <label>
            Adress:
            <input type="text" name="address" value={customerDetails.address} onChange={handleInputChange} required />
          </label>
        </div>
        <div className="payment-section">
          <h2>Betalningsuppgifter</h2>
          <label>
            Kortnummer:
            <input type="text" name="cardNumber" value={paymentDetails.cardNumber} onChange={handlePaymentInputChange} required />
          </label>
          <label>
            CVV:
            <input type="text" name="cvv" value={paymentDetails.cvv} onChange={handlePaymentInputChange} required />
          </label>
          <label>
            Löper ut:
            <input type="text" name="expiryDate" value={paymentDetails.expiryDate} onChange={handlePaymentInputChange} required />
          </label>
        </div>
        <button type="submit" style={{ width: '100%', padding: '8px 14px', backgroundColor: '##e60000', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer', marginTop: '20px' }}>Bekräfta köp</button>
      </form>
    </div>
  );
};

export default Payment;
