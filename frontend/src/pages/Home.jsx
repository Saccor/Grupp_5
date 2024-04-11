import React from "react";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import axios from "axios";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Searchbar
          items={filteredProducts}
          setFilteredProducts={setFilteredProducts}
        />
        <h1>Produkter</h1>
        <Row md={2} xs={1} lg={3} className="g-3">
          {filteredProducts.map((product) => (
            <Col key={product.id}>
              <StoreItem {...product} />
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
