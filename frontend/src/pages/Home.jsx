import React, { useState } from "react";
import ProductList from "../components/ProductList.jsx";
import CategoryFilter from "../components/CategoryFilter.jsx";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [animationKey, setAnimationKey] = useState(0);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setAnimationKey((prevKey) => prevKey + 1);
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
          {selectedCategory && (
            <div key={animationKey} className="category-title">
              {selectedCategory}
            </div>
          )}
          <ProductList className="productList" category={selectedCategory} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
