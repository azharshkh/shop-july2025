// src/components/ReviewsSlider.jsx
import { useState } from 'react';

const reviews = [
  {
    name: "Aarti S.",
    text: "Absolutely beautiful collection. Fast shipping and amazing quality!"
  },
  {
    name: "Megha T.",
    text: "I loved the packaging and detailing in the jewelry. Will order again."
  },
  {
    name: "Farah K.",
    text: "Best online jewelry store I’ve tried so far. Highly recommended!"
  }
];

function ReviewsSlider() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((index + 1) % reviews.length);
  };

  const prev = () => {
    setIndex((index - 1 + reviews.length) % reviews.length);
  };

  return (
    <section className="reviews-slider">
      <h2 className="section-title">What Our Customers Say</h2>

      <div className="review-box">
        <button className="slider-arrow left" onClick={prev}>&#10094;</button>

        <div className="review-text">
          <p>"{reviews[index].text}"</p>
          <span className="review-name">- {reviews[index].name}</span>
        </div>

        <button className="slider-arrow right" onClick={next}>&#10095;</button>
      </div>
    </section>
  );
}

export default ReviewsSlider;
