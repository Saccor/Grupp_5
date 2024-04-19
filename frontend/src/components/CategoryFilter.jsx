import React from "react";

const CategoryFilter = ({ onCategorySelect }) => {
  const categories = [
    "Skafferi",
    "Storpack",
    "Drycker",
    "Snacks & Godis",
    "Bröd & Kakor",
    "Barn & Baby",
  ];

  return (
    <>
      <h4>Kategorier</h4>
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
            }}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
};

export default CategoryFilter;