import React, { useState, useEffect } from "react";
import "../styles.css";

const images = [
  "/image9.webp",
  "/image1.webp",
  "/image2.png",
  "/image3.png",
  "/image6.webp",
  "/image7.webp",
];

const Header = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container">
      <header>
        <div className="slideshow">
          <img
            src={images[index]}
            alt={`Slide ${index + 1}`}
            className="header-image"
          />
        </div>
        <div>
          {/* <img src="image9.webp" alt="Logo" className="logo-image" /> */}
          <h1 className="header">Upptäck Vårt Sortiment!</h1>
        </div>
      </header>
    </div>
  );
};

export default Header;
