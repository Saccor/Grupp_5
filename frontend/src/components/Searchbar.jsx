import React, { useState } from "react";

const Searchbar = ({ products, setFilteredProducts }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    
    // Her bir ürün için tüm değerleri bir dize olarak birleştirip arama terimi ile karşılaştırma yapılıyor
    const filtered = products.filter((product) => {
      // Ürünün tüm değerlerini tek bir dizeye çevirme
      const productValues = Object.values(product).join(" ").toLowerCase();
      // Bu dizenin arama terimi içerip içermediğini kontrol etme
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
