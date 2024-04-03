import React from "react";
import { useState } from "react";
import productsData from "../components/products";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";

const Home = () => {

  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  return (
    <div>
      <Header />
      <div className="content">
        <Searchbar products={products} setFilteredProducts={setFilteredProducts} />
        <h1>Produkter</h1>
        <ul className="products">
          {filteredProducts.map((product) => (
            <li key={product.id} className="product">
              <h3>{product.name}</h3>
              <p>Pris: ${product.price}</p>
              <p>Beskrivning: {product.description}</p>
            </li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
