import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FoodCard } from '../shared/FoodCard';
import { INITIAL_FOODS } from '../../data/mockFoods';
import { ArrowRight, Sparkles } from 'lucide-react';

export const FeaturedFoods = ({ onQuickView }) => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Pure Honey & Ghee',
    'Nuts & Dry Fruits',
    'Cold-Pressed Oils',
    'Organic Spices & Herbs',
  ];

  const displayedFoods = activeCategory === 'All'
    ? INITIAL_FOODS.slice(0, 8)
    : INITIAL_FOODS.filter(item => item.category === activeCategory);

  return (
    <section className="py-16 bg-[#FFF8E7] border-t border-[#E8D8C3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading & Category Filter Pills */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trending & Pure Essentials</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E22]">
              Featured Healthy Foods
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Top-rated organic groceries freshly packed with seal of pure authenticity.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#5C162E] text-[#FFF8E7] shadow-sm'
                    : 'bg-[#E8D8C3]/50 text-[#4A0E22] hover:bg-[#E8D8C3]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 4-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedFoods.map((food) => (
            <FoodCard key={food._id} product={food} onQuickView={onQuickView} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/foods"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <span>View All Foods & Spices</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default FeaturedFoods;
