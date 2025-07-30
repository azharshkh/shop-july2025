import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (loginId === '0000' && password === '0000') {
      setShowLogin(false);
      setLoginId('');
      setPassword('');
      navigate('/admin/upload');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <Link to="/" className="logo">
          <h1>Thauya</h1>
        </Link>
      </div>

      {/* Center: Search bar */}
      <div className="header-center">
        <input
          type="text"
          className="search-input"
          placeholder="Search products..."
        />
      </div>

      {/* Right: Login and Cart */}
      <div className="header-right">
        <button
          className="icon-button"
          title="Login"
          onClick={() => setShowLogin(true)}
        >
          <img src="/login-icon.png" alt="Login" />
        </button>

        <Link to="/cart" className="icon-button cart-button" title="Cart">
          <img src="/cart-icon.png" alt="Cart" />
          <span className="cart-count">0</span>
        </Link>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div className="login-popup">
          <div className="login-box">
            <h3>Admin Login</h3>
            <input
              type="text"
              placeholder="Login ID"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Enter</button>
            <button onClick={() => setShowLogin(false)}>Cancel</button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
