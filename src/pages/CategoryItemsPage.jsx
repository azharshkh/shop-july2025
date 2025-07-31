import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

function CategoryItemsPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allSnap = await getDocs(collection(db, 'products'));
      const allProducts = allSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const final = allProducts.filter(p =>
        p.name?.toLowerCase().includes(categoryName.toLowerCase()) ||
        p.category?.toLowerCase().includes(categoryName.toLowerCase())
      );

      setProducts(final);
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
          <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryItemsPage;
