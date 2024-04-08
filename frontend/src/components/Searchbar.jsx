import React from "react";
import { useState } from "react";

const Searchbar = ({ items, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filtered = items.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setFilteredProducts(filtered);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Sök efter varor..."
        value={searchTerm}
        onChange={handleChange}
        className="search-bar"
      />
    </div>
  );
};

export default Searchbar;
