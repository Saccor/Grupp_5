// App.js
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import { Navbar } from "./components/Navbar.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import "./styles.css";
import { SearchContext } from "./context/SearchContext.jsx";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      <CartProvider>
        <div style={{ minHeight: "100vh" }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment" element={<Payment />} />
          </Routes>
          <CartSidebar />
        </div>
      </CartProvider>
    </SearchContext.Provider>
  );
}

export default App;
