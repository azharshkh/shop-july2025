import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "../pages/CategoryPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const ref = doc(db, 'products', id);
      const snapshot = await getDoc(ref);
      if (snapshot.exists()) {
        setProduct({ id: snapshot.id, ...snapshot.data() });
      } else {
        setProduct(null);
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

  if (!product) {
    return <p style={{ padding: "50px" }}>Product not found.</p>;
  }

  return (
    <div className="category-page">
      <h2 className="category-title">{product.name}</h2>
      <div className="category-grid" style={{ justifyContent: "center" }}>
        <div className="product-card">
          <img
            src={product.imageUrl || "https://via.placeholder.com/150x150.png?text=Product"}
            alt={product.name}
            className="product-card-image"
          />
          <div className="product-card-info">
            <h3 className="product-card-name">{product.name}</h3>
            <p className="product-card-price">₹{product.price}</p>
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
