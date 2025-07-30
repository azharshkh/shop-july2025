import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

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

  if (loading) return <p style={{ padding: "50px" }}>Loading...</p>;
  if (!product) return <p style={{ padding: "50px" }}>Product not found.</p>;

  return (
    <div className="category-page">
      <h2 className="category-title">{product.name}</h2>
      <div className="category-grid" style={{ justifyContent: "center" }}>
        <ProductCard
          id={product.id}
          image={product.imageUrl}
          name={product.name}
          price={`₹${product.price}`}
        />
      </div>
    </div>
  );
}

export default ProductPage;
