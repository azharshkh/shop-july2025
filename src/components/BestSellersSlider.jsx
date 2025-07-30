import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import './BestSellersSlider.css';

const placeholder = 'https://via.placeholder.com/150x150.png?text=Product';

function BestSellersSlider() {
  const [bestSellers, setBestSellers] = useState([]);
  const [index, setIndex] = useState(0);
  const visibleCount = 3;

  useEffect(() => {
    const fetchBestSellers = async () => {
      const q = query(collection(db, 'products'), where('bestSeller', '==', true));
      const snapshot = await getDocs(q);
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBestSellers(items);
    };

    fetchBestSellers();
  }, []);

  const maxIndex = Math.max(0, bestSellers.length - visibleCount);

  const next = () => {
    if (index < maxIndex) setIndex(index + 1);
  };

  const prev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const addToCart = (item) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existing = cart.find(p => p.id === item.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: item.id,
        name: item.name,
        image: item.imageUrl || placeholder,
        price: item.price,
        quantity: 1,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    alert("Added to cart!");
  };

  return (
    <section className="bestseller-section">
      <h2 className="section-title">Best Sellers</h2>

      {bestSellers.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '20px' }}>No best sellers available.</p>
      ) : (
        <div className="bestseller-slider">
          {bestSellers.length > visibleCount && (
            <button className="slider-arrow left" onClick={prev}>&#10094;</button>
          )}

          <div
            className="bestseller-track"
            style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
          >
            {bestSellers.map(item => (
              <div className="bestseller-card" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageUrl || placeholder}
                    alt={item.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = placeholder;
                    }}
                  />
                  <div className="bestseller-name">{item.name}</div>
                </Link>
                <button className="add-to-cart-btn" onClick={() => addToCart(item)}>
                  Add to Cart
                </button>
              </div>
            ))}
          </div>

          {bestSellers.length > visibleCount && (
            <button className="slider-arrow right" onClick={next}>&#10095;</button>
          )}
        </div>
      )}
    </section>
  );
}

export default BestSellersSlider;
