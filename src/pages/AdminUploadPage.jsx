import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function AdminUploadPage() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!name || !price || !category) {
      alert('All fields required');
      return;
    }

    setLoading(true);
    try {
      const imageUrl = "https://via.placeholder.com/300x300.png?text=Product";

      await addDoc(collection(db, 'products'), {
        name,
        price: parseFloat(price),
        category,
        imageUrl,
        createdAt: new Date()
      });

      alert('Product uploaded!');
      setName('');
      setPrice('');
      setCategory('');
    } catch (err) {
      alert('Upload failed: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Upload New Product (Text only)</h2>
      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="number"
          placeholder="Price (₹)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ width: '100%', marginBottom: '1rem', padding: '0.5rem' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '0.5rem 1rem' }}>
          {loading ? 'Uploading...' : 'Upload Product'}
        </button>
      </form>
    </div>
  );
}

export default AdminUploadPage;
