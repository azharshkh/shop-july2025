// src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

import HeroSlider from '../components/HeroSlider';
import PromoBanner from '../components/PromoBanner';
import ReviewsSlider from '../components/ReviewsSlider';

import ProductCard from '../components/ProductCard';
import './CategoryPage.css'; // Reuse styling

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(list);
    };

    const fetchBestSellers = async () => {
      const q = query(collection(db, 'products'), where('bestSeller', '==', true));
      const snap = await getDocs(q);
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Best sellers from Firestore:', list); // <=== ADD THIS


      setBestSellers(list);
    };

    fetchCategories();
    fetchBestSellers();
  }, []);

  return (
    <div>
      <HeroSlider />
      <PromoBanner />

      {/* Category Grid */}
      <section className="category-page">
        <h2 className="category-title">Shop by Category</h2>
        <div className="category-grid">
          {categories.map(cat => (
            <div
              key={cat.id}
              className="category-card"
              onClick={() => navigate(`/category/${cat.name}`)}
              style={{
                cursor: 'pointer',
                border: '1px solid #ccc',
                padding: '1rem',
                textAlign: 'center',
                borderRadius: '8px',
                background: '#f9f9f9',
              }}
            >
              <img
                src={cat.imageUrl}
                alt={cat.name}
                width="150"
                height="150"
                style={{ objectFit: 'cover', borderRadius: '6px' }}
              />
              <h4 style={{ marginTop: '0.5rem' }}>{cat.name.toUpperCase()}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="category-page">
        <h2 className="category-title">Best Sellers</h2>
        <div className="category-grid">
          {bestSellers.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.imageUrl}
              name={product.name}
              price={`₹${product.price}`}
            />
          ))}
        </div>
      </section>

      <ReviewsSlider />
    </div>
  );
}

export default HomePage;
