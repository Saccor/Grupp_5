import React from "react";
import { useState } from "react";
import storeItems from "../data/items.json";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Searchbar from "../components/Searchbar";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

const Home = () => {
  const [filteredProducts, setFilteredProducts] = useState(storeItems);

  return (
    <div>
      <Header />
      <div className="content">
        <Searchbar
          items={storeItems}
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
