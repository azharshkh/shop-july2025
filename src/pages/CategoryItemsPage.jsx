// src/pages/CategoryItemsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css'; // reuse styles

function CategoryItemsPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, 'products'), where('category', '==', categoryName));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };

    fetchProducts();
  }, [categoryName]);

  return (
    <div className="category-page">
      <h2 className="category-title">{categoryName.toUpperCase()}</h2>
      <div className="category-grid">
        {products.length > 0 ? (
          products.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.imageUrl || "https://via.placeholder.com/150x150.png?text=Product"}
              name={product.name}
              price={`₹${product.price}`}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryItemsPage;
