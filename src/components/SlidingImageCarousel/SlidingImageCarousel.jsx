import React, { useEffect, useState } from "react";
import "./SlidingImageCarousel.css";

const ACCESS_KEY = "809yueGOS6YbcK5QgtvYSfBE6Ho6xq0131Ew-7n_xmU"; 

const SlidingImageCarousel = ({ materialName }) => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${materialName}&per_page=5&client_id=${ACCESS_KEY}`
        );
        const data = await response.json();
        setImages(data.results || []);
      } catch (error) {
        console.error("Error fetching Unsplash images:", error);
      }
    };

    fetchImages();
  }, [materialName]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  if (!images.length) return <p>Loading images...</p>;

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        <button className="carousel-btn prev" onClick={goToPrevious}>
          &#10094;
        </button>
        <img
          src={images[currentIndex].urls.regular}
          alt={materialName}
          className="carousel-image"
        />
        <button className="carousel-btn next" onClick={goToNext}>
          &#10095;
        </button>
      </div>
      <div className="carousel-indicators">
        {images.map((img, index) => (
          <span
            key={img.id}
            className={`indicator ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlidingImageCarousel;
