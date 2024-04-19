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
        console.log("State:", state);
        const orderItems = state.products ? state.products.map((product) => ({
            product: product,
            quantity: product.quantity,
          })) : [];

          
          const total = orderItems.reduce(
            (acc, item) => acc + item.product.price * item.quantity, 0
              );
              
              
    const totalIncludingVAT = total * 1.12; // Assuming VAT is 12%
              
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

      navigate("/order-confirmation");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div>
      <h2>Payment Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={customerDetails.firstName}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Last Name:
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
          Address:
          <input
            type="text"
            name="address"
            value={customerDetails.address}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Card Number:
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
          Expiry Date:
          <input
            type="text"
            name="expiryDate"
            value={paymentDetails.expiryDate}
            onChange={handlePaymentInputChange}
            required
          />
        </label>
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default Payment;
