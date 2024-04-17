import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Home from "./pages/Home.jsx";
import Header from "./components/Header.jsx";
import { CartProvider, useCart } from "./context/CartContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Checkout from "./pages/Checkout.jsx";
import StripePayment from './pages/stripe.jsx';
import "./styles.css";
import { createPaymentIntent } from './services/apiServices.js';

const stripePromise = loadStripe('your_stripe_key_here');

function App() {
  const [clientSecret, setClientSecret] = useState('');
  const cart = useCart(); // use entire cart context

  useEffect(() => {
    // Only attempt to create payment intent if totalIncludingTax is defined
    if (cart && cart.totalIncludingTax) {
      const initPaymentIntent = async () => {
        try {
          const secret = await createPaymentIntent(cart.totalIncludingTax);
          setClientSecret(secret);
        } catch (error) {
          console.error('Error creating payment intent:', error);
        }
      };

      initPaymentIntent();
    }
  }, [cart ? cart.totalIncludingTax : null]);  // React to changes in totalIncludingTax

  const stripeOptions = clientSecret ? { clientSecret } : undefined;

  return (
    <Elements stripe={stripePromise} options={stripeOptions}>
      <CartProvider>
        <div style={{ backgroundColor: "#f8f4f1", minHeight: "100vh" }}>
          <Navbar />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/stripe" element={<StripePayment />} />
          </Routes>
          <CartSidebar />
        </div>
      </CartProvider>
    </Elements>
  );
}

export default App;
