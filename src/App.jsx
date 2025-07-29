import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import TopNav from './components/TopNav';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';

function App() {
  return (
    <>
      <Header />
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
