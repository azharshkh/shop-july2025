import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { signInWithPopup, signOut } from 'firebase/auth';
import { auth, provider, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Header() {
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [admin, setAdmin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((acc, item) => acc + item.quantity, 0);
      setCartCount(count);
    };
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('adminUser'));
    if (stored) setAdmin(stored);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/category/${searchQuery.trim().toLowerCase()}`);
      setSearchQuery('');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log('USER UID:', user.uid);


      // Check Firestore for admin UID
      const docRef = doc(db, 'admins', user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert('Access denied: Not an admin');
        await signOut(auth);
        return;
      }

      // Store user info in localStorage
      localStorage.setItem('adminUser', JSON.stringify({
        email: user.email,
        name: user.displayName,
        uid: user.uid
      }));

      setAdmin(user);
      navigate('/admin/upload');
    } catch (err) {
      console.error(err);
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem('adminUser');
      setAdmin(null);
    });
  };

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="logo">
          <h1>Thauya</h1>
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
        />
      </div>

      <div className="header-right">
        {admin ? (
          <>
            <button
              className="icon-button"
              onClick={() => navigate('/admin/upload')}
              title="Admin Panel"
            >
              <img src="/admin-icon.png" alt="Admin" />
            </button>

            <button
              className="icon-button"
              onClick={handleLogout}
              title="Logout"
            >
              <img src="/logout-icon.png" alt="Logout" />
            </button>
          </>
        ) : (
          <button
            className="icon-button"
            onClick={handleGoogleLogin}
            title="Admin Login"
          >
            <img src="/login-icon.png" alt="Login" />
          </button>
        )}

        <Link to="/cart" className="icon-button cart-button" title="Cart">
          <img src="/cart-icon.png" alt="Cart" />
          <span className="cart-count">{cartCount}</span>
        </Link>
      </div>

    </header>
  );
}

export default Header;
