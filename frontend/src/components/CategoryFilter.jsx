import React from "react";

const CategoryFilter = ({ onCategorySelect }) => {
  const categories = [
    "Skafferi",
    "Storpack",
    "Drycker",
    "Snacks & Godis",
    "Bröd & Kakor",
    "Barn & Baby",
    "Frukt och Grönt",
    "Eko",
    "Glutenfri mat",
    "Veganskt",
  ];

  return (
    <div>
      <h4>Kategorier</h4>
      <a
        href="/"
        style={{
          display: "block",
          width: "100%",
          padding: "10px",
          textAlign: "left",
          color: "black",
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: "20px",
          textDecoration: "none",
        }}
      >
        Alla kategorier
      </a>
      <div>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
