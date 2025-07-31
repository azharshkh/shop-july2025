import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './CategoryPage.css'; // Reuse common styles
import './ProductPage.css';  // Product-specific styles
import '../components/ProductCard.css'; // Import ProductCard styles for .product-card classes

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'products', id);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        } else {
          setProduct(null);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(item => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.imageUrl || "https://via.placeholder.com/150x150.png?text=Product",
        quantity: 1
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage')); // notify header
    alert('Added to cart');
  };

  if (loading) {
    return <p style={{ padding: "50px", textAlign: "center" }}>Loading...</p>;
  }

  if (!product) {
    return <p style={{ padding: "50px", textAlign: "center" }}>Product not found.</p>;
  }

  return (
    <div className="product-page">
      <h2 className="product-title">{product.name}</h2>
      <div className="product-wrapper">
        <div className="product-card">
          <img
            src={product.imageUrl || "https://via.placeholder.com/150x150.png?text=Product"}
            alt={product.name}
            className="product-card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/150x150.png?text=No+Image";
            }}
          />
          <div className="product-card-info">
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-price">₹{product.price}</p>
            {product.description && (
              <p className="product-description" style={{ marginBottom: "15px", color: "#666" }}>
                {product.description}
              </p>
            )}
            <button className="product-card-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
