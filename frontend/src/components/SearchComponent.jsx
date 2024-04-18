import React, { useState } from "react";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <input
      type="text"
      placeholder="Sök..."
      value={searchTerm}
      onChange={handleSearchChange}
      style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
    />
  );
};

export default SearchComponent;
