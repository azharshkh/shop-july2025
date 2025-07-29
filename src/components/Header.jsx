// src/components/Header.jsx
function Header() {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <h1 className="logo">Thauya</h1>
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
        <button className="icon-button" title="Login">
          <img src="/login-icon.png" alt="Login" />
        </button>
        <button className="icon-button cart-button" title="Cart">
          <img src="/cart-icon.png" alt="Cart" />
          <span className="cart-count">0</span>
        </button>
      </div>
    </header>
  );
}

export default Header;
