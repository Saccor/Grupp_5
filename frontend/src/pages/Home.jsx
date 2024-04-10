import React, { useEffect, useState } from "react";
import axios from 'axios';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

const Home = () => {
  const [products, setProducts] = useState([]); // Add this state to keep the original list
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch products from the backend when component mounts
  useEffect(() => {
    axios.get('/api/products')
      .then((response) => {
        console.log('Fetched products:', response.data); // Add this line
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);
  

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredProducts(products); // Reset to full list if search term is cleared
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered); // Update the filtered products based on search
    }
  };

  return (
    <div>
      <Header />
      <div className="content">
        <Searchbar onSearch={handleSearch} />
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
