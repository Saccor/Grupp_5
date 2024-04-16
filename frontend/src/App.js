// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Checkout from "./pages/Checkout.jsx";
import "./styles.css";
import StripePayment from './pages/stripe.jsx';

// Replace with your Stripe public key
const stripePromise = loadStripe('pk_test_51P5nwiP3zLm7AEG22w3xeULUDk5JtAZ96m8OLvpO2oVXFfbWIyFqJIBU14s8Ys9H78BxFCMEo1rmgwHp1hGh9DiQ00wkNhcsez');

function App() {
  return (
    <Elements stripe={stripePromise}>
      <CartProvider>
        <div style={{ backgroundColor: "#f8f4f1", minHeight: "100vh" }}>
          <Navbar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/stripe" element={<StripePayment />} />
            {/* Add other routes here */}
          </Routes>
          <CartSidebar />
        </div>
      </CartProvider>
    </Elements>
  );
}

export default App;
