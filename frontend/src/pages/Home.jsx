import React, { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          maxWidth: "1200px",
          margin: "20px auto",
          gap: "20px",
        }}
      >
        <div style={{ minWidth: "200px" }}>
          <CategoryFilter onCategorySelect={handleCategorySelect} />
        </div>
        <div style={{ flex: 1 }}>
          <ProductList className="productList" category={selectedCategory} />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default Home;
