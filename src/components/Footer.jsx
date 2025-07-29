// src/components/Footer.jsx

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-columns">

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><a href="#">Shop All</a></li>
            <li><a href="#">Best Seller</a></li>
            <li><a href="#">Our Story</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Return Policy</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Info</h4>
          <ul>
            <li><a href="#">Terms & Condition</a></li>
            <li><a href="#">Shipping & Delivery</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Thauya. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
