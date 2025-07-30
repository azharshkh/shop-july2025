import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import './BestSellersSlider.css'; // if you have custom styles

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

  return (
    <section className="bestseller-section">
      <h2 className="section-title">Best Sellers</h2>

      <div className="bestseller-slider">
        <button className="slider-arrow left" onClick={prev}>&#10094;</button>

        <div
          className="bestseller-track"
          style={{ transform: `translateX(-${index * (100 / visibleCount)}%)` }}
        >
          {bestSellers.map(item => (
            <div className="bestseller-card" key={item.id}>
              <Link to={`/product/${item.id}`}>
                <img src={item.imageUrl} alt={item.name} />
                <div className="bestseller-name">{item.name}</div>
              </Link>
              <button className="add-to-cart-btn">Add to Cart</button>
            </div>
          ))}
        </div>

        <button className="slider-arrow right" onClick={next}>&#10095;</button>
      </div>
    </section>
  );
}

export default BestSellersSlider;
