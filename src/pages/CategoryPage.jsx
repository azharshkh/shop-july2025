import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './CategoryPage.css';

function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(list);
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-page">
      <h2 className="category-title">Browse Categories</h2>
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
              background: '#f9f9f9'
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
    </div>
  );
}

export default CategoryPage;
