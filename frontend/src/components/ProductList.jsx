import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext.jsx";
import { useCart } from "../context/CartContext";
import { fetchProducts } from "../services/apiServices.js";
import ProductDetailModal from "./ProductDetailModal";
import Pagination from "./Pagination.jsx";

const ProductList = ({ category }) => {
  const { searchTerm } = useContext(SearchContext);
  const [allProducts, setAllProducts] = useState([]);
  const { addToCart } = useCart();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(16);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeDetailModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = searchTerm
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : category
    ? allProducts.filter((product) => product.category === category)
    : allProducts;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="product-grid-container">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="product-card"
            onClick={() => handleProductClick(product)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "160px",
                height: "160px",
                objectFit: "contain",
                marginBottom: "10px",
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Kategori: {product.category}</p>
            <p>Pris: {product.price} Kr</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              style={{
                alignSelf: "center",
                marginTop: "auto",
                padding: "10px 20px",
                backgroundColor: "#ff0000",
                color: "white",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
                transition: "background-color 0.3s ease-in-out",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#cc0000")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ff0000")
              }
            >
              Köp
            </button>
          </div>
        ))}
      </div>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredProducts.length}
        paginate={paginate}
        currentPage={currentPage}
      />
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={closeDetailModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
};

export default ProductList;
