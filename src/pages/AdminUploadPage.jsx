import React, { useEffect, useRef, useState } from 'react'; // useRef added
import { db } from '../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  where,
  doc,
  updateDoc,
} from 'firebase/firestore';

const placeholderImg = "https://via.placeholder.com/150x150.png?text=Product";

function AdminUploadPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [productsByCategory, setProductsByCategory] = useState({});
  const [newProducts, setNewProducts] = useState({});
  const [loading, setLoading] = useState(false);

  const debounceTimers = useRef({}); // ✅ Track timers per product ID

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCategories(list);
    list.forEach(cat => fetchProducts(cat.name));
  };

  const fetchProducts = async (category) => {
    const q = query(collection(db, 'products'), where('category', '==', category));
    const snapshot = await getDocs(q);
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProductsByCategory(prev => ({ ...prev, [category]: items }));
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const exists = categories.some(c => c.name === newCategory);
    if (exists) return alert('Category already exists');
    await addDoc(collection(db, 'categories'), {
      name: newCategory,
      imageUrl: `https://via.placeholder.com/150x150.png?text=${encodeURIComponent(newCategory)}`,
      createdAt: new Date(),
    });
    setNewCategory('');
    fetchCategories();
  };

  const handleDeleteCategory = async (catName, catId) => {
    const hasProducts = productsByCategory[catName]?.length;
    if (hasProducts) return alert('Empty category first');
    await deleteDoc(doc(db, 'categories', catId));
    setCategories(categories.filter(c => c.id !== catId));
  };

  const handleAddProduct = async (catName) => {
    const data = newProducts[catName];
    if (!data?.name || !data?.price) return;
    setLoading(true);
    await addDoc(collection(db, 'products'), {
      name: data.name,
      price: parseFloat(data.price),
      category: catName,
      imageUrl: placeholderImg,
      bestSeller: false,
      createdAt: new Date(),
    });
    setNewProducts(prev => ({ ...prev, [catName]: { name: '', price: '' } }));
    fetchProducts(catName);
    setLoading(false);
  };

  const handleDeleteProduct = async (prodId, category) => {
    await deleteDoc(doc(db, 'products', prodId));
    fetchProducts(category);
  };

  // ✅ Debounced toggle for best seller
  const handleBestSellerChange = (prodId, currentValue, category) => {
    if (debounceTimers.current[prodId]) {
      clearTimeout(debounceTimers.current[prodId]);
    }

    debounceTimers.current[prodId] = setTimeout(async () => {
      const ref = doc(db, 'products', prodId);
      await updateDoc(ref, { bestSeller: !currentValue });
      fetchProducts(category);
    }, 400); // Adjust debounce delay if needed
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Panel</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          style={{ padding: '0.5rem', marginRight: '1rem' }}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>

      {categories.map(cat => (
        <div key={cat.id} style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img src={cat.imageUrl} alt={cat.name} width="50" height="50" />
              <h3>{cat.name.toUpperCase()}</h3>
            </div>
            <button onClick={() => handleDeleteCategory(cat.name, cat.id)}>Delete Category</button>
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Product name"
              value={newProducts[cat.name]?.name || ''}
              onChange={(e) =>
                setNewProducts(prev => ({
                  ...prev,
                  [cat.name]: { ...prev[cat.name], name: e.target.value },
                }))
              }
              style={{ padding: '0.5rem', marginRight: '0.5rem' }}
            />
            <input
              type="number"
              placeholder="Price"
              value={newProducts[cat.name]?.price || ''}
              onChange={(e) =>
                setNewProducts(prev => ({
                  ...prev,
                  [cat.name]: { ...prev[cat.name], price: e.target.value },
                }))
              }
              style={{ padding: '0.5rem', marginRight: '0.5rem' }}
            />
            <button onClick={() => handleAddProduct(cat.name)} disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </button>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Image</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Name</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Price (₹)</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Best Seller</th>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {(productsByCategory[cat.name] || []).map(prod => (
                <tr key={prod.id}>
                  <td style={{ textAlign: 'center' }}>
                    <img src={prod.imageUrl} alt="" width="60" height="60" />
                  </td>
                  <td>{prod.name}</td>
                  <td>{prod.price}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={prod.bestSeller}
                      onChange={() => handleBestSellerChange(prod.id, prod.bestSeller, cat.name)}
                    />
                  </td>
                  <td>
                    <button onClick={() => handleDeleteProduct(prod.id, cat.name)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default AdminUploadPage;
