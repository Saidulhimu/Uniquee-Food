import React, { useState } from 'react';
import HeroBanner from '../../components/home/HeroBanner';
import TrustPillars from '../../components/home/TrustPillars';
import CategoryGrid from '../../components/home/CategoryGrid';
import FeaturedFoods from '../../components/home/FeaturedFoods';
import PromoSection from '../../components/home/PromoSection';
import ReviewsSection from '../../components/home/ReviewsSection';
import QuickViewModal from '../../components/shared/QuickViewModal';

export const Home = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div className="bg-[#FFF8E7]">
      <HeroBanner />
      <TrustPillars />
      <CategoryGrid />
      <FeaturedFoods onQuickView={(product) => setQuickViewProduct(product)} />
      <PromoSection />
      <ReviewsSection />

      {/* Quick View Modal */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};

export default Home;
