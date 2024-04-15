import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/apiServices.js";

const ProductList = ({ category, search }) => {
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const initFetch = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setAllProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    initFetch();
  }, []);

  const filteredProducts = allProducts.filter((product) => {
    const productMatchesCategory = category
      ? product.category === category
      : true;
    const productName = product.name || "";
    const productMatchesSearch = search
      ? productName.toLowerCase().includes(search.toLowerCase())
      : true;
    return productMatchesCategory && productMatchesSearch;
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
        gap: "20px",
        padding: "20px",
      }}
    >
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#ffff",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: "160px",
              height: "160px",
              objectFit: "contain",
            }}
          />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>Kategori: {product.category}</p>
          <p>Pris: {product.price} Kr</p>
          <button onClick={() => addToCart(product)}>Köp</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
