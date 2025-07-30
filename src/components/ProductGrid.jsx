import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    };
    fetchData();
  }, []);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '1rem',
      padding: '2rem'
    }}>
      {products.map(prod => (
        <div key={prod.id} style={{
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
          textAlign: 'center'
        }}>
          <img
            src={prod.imageUrl}
            alt={prod.name}
            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
          />
          <h3>{prod.name}</h3>
          <p>₹ {prod.price}</p>
          <small>{prod.category}</small>
        </div>
      ))}
    </div>
  );
}

export default ProductGrid;
