import Header from '../components/Header';
import TopNav from '../components/TopNav';
import HeroSlider from '../components/HeroSlider';
import Categories from '../components/Categories';
import BestSellersSlider from '../components/BestSellersSlider';
import PromoBanner from '../components/PromoBanner';
import ReviewsSlider from '../components/ReviewsSlider';
import Footer from '../components/Footer';

import ProductGrid from '../components/ProductGrid';


function HomePage() {
  return (
    <div>
      <HeroSlider />
      <Categories />
      <BestSellersSlider />
      <PromoBanner />
      <ReviewsSlider />

      <ProductGrid />


    </div>
  );
}

export default HomePage;
