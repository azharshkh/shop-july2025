import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './CategoryPage.css'; // Reuse common styles
import './ProductPage.css';  // Optional: if separated product styles

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, 'products', id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setProduct({ id: snap.id, ...snap.data() });
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert('Added to cart');
  };

  if (loading) return <p style={{ padding: "50px" }}>Loading...</p>;
  if (!product) return <p style={{ padding: "50px" }}>Product not found.</p>;

  return (
    <div className="product-page">
      <h2 className="product-title">{product.name}</h2>
      <div className="product-wrapper">
        <div className="product-card">
          <img
            src={product.imageUrl || 'https://via.placeholder.com/150x150.png?text=No+Image'}
            alt={product.name}
            className="product-card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/150x150.png?text=No+Image';
            }}
          />
          <div className="product-card-info">
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-price">₹{product.price}</p>
            <button className="product-card-button" onClick={addToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
