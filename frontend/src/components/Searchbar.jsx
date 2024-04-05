import React, { useState } from "react";

const Searchbar = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    
    // Concatenates all values for each product into a string and compares it with the search term
    const filtered = products.filter((product) => {
      // Convert all values of the product to a single string
      const productValues = Object.values(product).join(" ").toLowerCase();
      // Checking if this string contains the search term
      return productValues.includes(searchTerm);
    });

    setFilteredProducts(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for products.."
        value={searchTerm}
        onChange={handleChange}
        className="search-bar"
      />
    </div>
  );
};

export default Searchbar;
