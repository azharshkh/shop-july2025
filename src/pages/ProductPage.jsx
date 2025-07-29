// src/pages/ProductPage.jsx
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './CategoryPage.css'; // reuse styles

const products = [
  { id: 1, name: "Earring A", image: "/prod1.jpg", price: "₹2,199" },
  { id: 2, name: "Bracelet B", image: "/prod2.jpg", price: "₹1,799" },
  { id: 3, name: "Ring C", image: "/prod3.jpg", price: "₹999" },
  { id: 4, name: "Necklace D", image: "/prod4.jpg", price: "₹3,499" },
  { id: 5, name: "Anklet E", image: "/prod5.jpg", price: "₹1,299" },
];

function ProductPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));

  if (!product) return <p style={{ padding: "50px" }}>Product not found.</p>;

  return (
    <div className="category-page">
      <h2 className="category-title">{product.name}</h2>
      <div className="category-grid" style={{ justifyContent: "center" }}>
        <ProductCard
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
        />
      </div>
    </div>
  );
}

export default ProductPage;
