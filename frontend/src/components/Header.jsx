import React, { useState, useEffect } from "react";
import "../styles.css";

const images = [
  "/image1.webp",
  "/image2.png",
  "/image3.png",
  "/image4.png",
  "/image5.webp",
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
      <header className="header">
        <img
          src={images[index]}
          alt={`Slide ${index + 1}`}
          className="header-image"
        />
      </header>
    </div>
  );
};

export default Header;
