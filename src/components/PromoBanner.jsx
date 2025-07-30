// src/components/PromoBanner.jsx

function PromoBanner() {
  return (
    <section className="promo-banner">
      <img src="/promo-banner.jpg" alt="Promo" className="promo-image" />

      <div className="promo-overlay">
        <p className="promo-text">xyz epsom dolor sit amet, consectetur adipiscing elit. Exclusive offers for limited time.</p>
        <button className="promo-button">Shop Now</button>
      </div>
    </section>
  );
}

export default PromoBanner;
