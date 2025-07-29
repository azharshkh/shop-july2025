// src/components/HeroSlider.jsx
import { useState, useEffect } from 'react';

const images = [
  '/banner1.jpg',
  '/banner2.jpg',
  '/banner3.jpg'
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((current - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <div className="hero-slider">
      <button className="slider-arrow left" onClick={prevSlide}>&#10094;</button>

      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="hero-image"
      />

      <button className="slider-arrow right" onClick={nextSlide}>&#10095;</button>
    </div>
  );
}

export default HeroSlider;
