import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

function ProductCard({ id, image, name, price }) {
  console.log("Rendering ProductCard with id:", id);

  return (
    <Link to={`/product/${id}`} className="product-card-link">
      <div className="product-card">
        <img src={image} alt={name} className="product-card-image" />
        <div className="product-card-info">
          <h3 className="product-card-name">{name}</h3>
          <p className="product-card-price">{price}</p>
          <button className="product-card-button">Add to Cart</button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;