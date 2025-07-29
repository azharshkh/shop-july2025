// src/components/BestSellersSlider.jsx
import { useState } from 'react';
import { Link } from "react-router-dom";

const bestSellers = [
  { id: 1, name: "Earring A", image: "/prod1.jpg" },
  { id: 2, name: "Bracelet B", image: "/prod2.jpg" },
  { id: 3, name: "Ring C", image: "/prod3.jpg" },
  { id: 4, name: "Necklace D", image: "/prod4.jpg" },
  { id: 5, name: "Anklet E", image: "/prod5.jpg" }
];

function BestSellersSlider() {
  const [index, setIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = bestSellers.length - visibleCount;

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  return (
    <section className="bestseller-section">
      <h2 className="section-title">Best Sellers</h2>

      <div className="bestseller-slider">
        <button className="slider-arrow left" onClick={prev}>&#10094;</button>

        <div
          className="bestseller-track"
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
        >
          {bestSellers.map((item) => (
            <Link to={`/product/${item.id}`} className="bestseller-card" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="bestseller-name">{item.name}</div>
            </Link>
          ))}
        </div>

        <button className="slider-arrow right" onClick={next}>&#10095;</button>
      </div>
    </section>
  );
}

export default BestSellersSlider;
