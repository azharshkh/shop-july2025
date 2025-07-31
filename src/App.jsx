import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import LoginPage from './pages/LoginPage';
import AdminUploadPage from './pages/AdminUploadPage';
import CategoryItemsPage from './pages/CategoryItemsPage';
import CartPage from './pages/CartPage';

function App() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY && currentY > 100) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

 useEffect(() => {
  const checkAdmin = () => {
    setIsAdmin(!!localStorage.getItem('adminUser'));
  };

  checkAdmin();
  window.addEventListener('storage', checkAdmin); // optional: sync across tabs
  return () => window.removeEventListener('storage', checkAdmin);
}, []);

  return (
    <>
      <div className={`sticky-header ${showNav ? 'visible' : 'hidden'}`}>
        <Header />
        <TopNav />
      </div>

      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/category/:categoryName" element={<CategoryItemsPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cart" element={<CartPage />} />
          
          {/* ✅ Protected Admin Route */}
          <Route
            path="/admin/upload"
            element={isAdmin ? <AdminUploadPage /> : <Navigate to="/" />}
          />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

export default App;
