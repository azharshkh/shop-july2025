// src/components/Categories.jsx
import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Earrings", image: "/cat-earrings.jpg" },
  { name: "Bracelets", image: "/cat-bracelets.jpg" },
  { name: "Rings", image: "/cat-rings.jpg" },
  { name: "Necklaces", image: "/cat-necklaces.jpg" },
  { name: "Anklets", image: "/cat-anklets.jpg" }
];

function Categories() {
  return (
    <section className="categories-section">
      <h2 className="section-title">Our Categories</h2>

      <div className="categories-grid">
        {categories.map((cat, i) => (
          <Link
            to={`/category/${cat.name.toLowerCase()}`}
            className="category-card"
            key={i}
          >
            <img src={cat.image} alt={cat.name} className="category-image" />
            <div className="category-label">{cat.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Categories;
