// src/components/TopNav.jsx
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function TopNav() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const snap = await getDocs(collection(db, 'categories'));
      const list = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(list);
    };

    fetchCategories();
  }, []);

  const navStyle = {
    backgroundColor: '#f5f5f5',
    padding: '10px 0',
    borderBottom: '1px solid #ddd',
  };

  const ulStyle = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
    gap: '20px',
  };

  const liStyle = {
    fontSize: '16px',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
  };

  const linkHoverStyle = {
    textDecoration: 'underline',
  };

  return (
    <nav style={navStyle}>
      <ul style={ulStyle}>
        {categories.map(cat => (
          <li key={cat.id} style={liStyle}>
            <Link
              to={`/category/${cat.name}`}
              style={linkStyle}
              onMouseOver={e => (e.target.style.textDecoration = 'underline')}
              onMouseOut={e => (e.target.style.textDecoration = 'none')}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default TopNav;
