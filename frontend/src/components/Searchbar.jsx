import React from "react";
import { useState } from "react";

const Searchbar = ({ products, setFilteredProducts }) => {

  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm)
    )
    setFilteredProducts(filtered)
  }

  return <div>
    <input 
    type="text"
    placeholder="Search for products.."
    value={searchTerm} 
    onChange={handleChange}
    className="search-bar"
    />
  </div>;
};

export default Searchbar;
