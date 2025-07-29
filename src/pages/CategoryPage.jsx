import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css';

const products = [
  {
    id: 1,
    name: "Gold Ring",
    image: "/ring1.jpg",
    price: "₹4,999",
  },
  {
    id: 2,
    name: "Silver Bracelet",
    image: "/bracelet1.jpg",
    price: "₹2,499",
  },
  {
    id: 3,
    name: "Pearl Necklace",
    image: "/necklace1.jpg",
    price: "₹7,999",
  },
  {
    id: 4,
    name: "Diamond Earrings",
    image: "/earring1.jpg",
    price: "₹10,499",
  },
  {
    id: 5,
    name: "Platinum Chain",
    image: "/chain1.jpg",
    price: "₹12,299",
  },
  {
    id: 6,
    name: "Gemstone Pendant",
    image: "/pendant1.jpg",
    price: "₹3,499",
  },
];

function CategoryPage() {
  return (
    <>
      <Header />
      <div className="category-page">
        <h2 className="category-title">Browse Collection</h2>
        <div className="category-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id} // ✅ important for routing
              image={product.image}
              name={product.name}
              price={product.price}
            />

          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CategoryPage;
