import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown, Filter, X } from 'lucide-react';
import { INITIAL_FOODS, CATEGORIES } from '../../data/mockFoods';
import FoodCard from '../../components/shared/FoodCard';
import QuickViewModal from '../../components/shared/QuickViewModal';

export const AllFoods = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'low-to-high' | 'high-to-low'
  const [priceRange, setPriceRange] = useState(2000);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Sync category param with state
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredFoods = useMemo(() => {
    return INITIAL_FOODS.filter((food) => {
      const matchesSearch =
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || food.category === selectedCategory;

      const effectivePrice = food.discountPrice || food.regularPrice;
      const matchesPrice = effectivePrice <= priceRange;

      return matchesSearch && matchesCategory && matchesPrice;
    }).sort((a, b) => {
      const priceA = a.discountPrice || a.regularPrice;
      const priceB = b.discountPrice || b.regularPrice;

      if (sortBy === 'low-to-high') return priceA - priceB;
      if (sortBy === 'high-to-low') return priceB - priceA;
      return 0; // Default order
    });
  }, [searchQuery, selectedCategory, sortBy, priceRange]);

  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Banner Header */}
        <div className="bg-[#5C162E] text-[#FFF8E7] rounded-3xl p-8 sm:p-12 mb-10 shadow-lg border border-[#D8C3A5]">
          <span className="text-xs font-bold uppercase tracking-widest text-[#E8D8C3]">
            Pure • Organic • Chemical-Free
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold mt-2">
            All Organic Food Catalog
          </h1>
          <p className="text-sm text-[#E8D8C3]/90 mt-2 max-w-2xl font-sans">
            Browse our full selection of farm-sourced raw wild honey, cold-pressed oils, organic spices, and healthy dry fruits delivered anywhere in Bangladesh.
          </p>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-[#D8C3A5] shadow-sm mb-8 space-y-4">
          
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Live Search Field */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food by name, ingredient, or recipe (e.g. Honey, Chia, Ghee)..."
                className="w-full pl-10 pr-10 py-3 bg-[#FFF8E7]/50 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort & Price Filter Controls */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-[#FFF8E7] border border-[#D8C3A5] px-3 py-2 rounded-xl text-xs font-semibold text-[#4A0E22]">
                <ArrowUpDown className="w-4 h-4 text-[#5C162E]" />
                <span>Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-[#5C162E] font-bold cursor-pointer"
                >
                  <option value="newest">Featured & Newest</option>
                  <option value="low-to-high">Price: Low to High</option>
                  <option value="high-to-low">Price: High to Low</option>
                </select>
              </div>

              {/* Price Max Range Indicator */}
              <div className="hidden sm:flex items-center gap-2 bg-[#FFF8E7] border border-[#D8C3A5] px-3 py-2 rounded-xl text-xs text-[#4A0E22]">
                <span>Max: ৳{priceRange}</span>
                <input
                  type="range"
                  min="150"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-20 accent-[#5C162E] cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('All')}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                selectedCategory === 'All'
                  ? 'bg-[#5C162E] text-[#FFF8E7] shadow'
                  : 'bg-[#FFF8E7] text-[#4A0E22] hover:bg-[#E8D8C3] border border-[#D8C3A5]'
              }`}
            >
              All Foods ({INITIAL_FOODS.length})
            </button>

            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                  selectedCategory === cat.name
                    ? 'bg-[#5C162E] text-[#FFF8E7] shadow'
                    : 'bg-[#FFF8E7] text-[#4A0E22] hover:bg-[#E8D8C3] border border-[#D8C3A5]'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-medium">
          <span>Showing {filteredFoods.length} items in catalogue</span>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => handleCategoryChange('All')}
              className="text-[#5C162E] font-bold hover:underline"
            >
              Clear filter
            </button>
          )}
        </div>

        {/* Product Grid */}
        {filteredFoods.length === 0 ? (
          <div className="text-center py-20 bg-white/70 rounded-3xl border border-[#D8C3A5]">
            <p className="text-lg font-serif font-bold text-[#4A0E22]">No organic items match your criteria</p>
            <p className="text-xs text-gray-500 mt-1">Try resetting the search keyword or price slider.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setPriceRange(2000);
              }}
              className="mt-4 px-5 py-2 bg-[#5C162E] text-white text-xs font-semibold rounded-xl"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFoods.map((food) => (
              <FoodCard
                key={food._id}
                product={food}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </div>
        )}

      </div>

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

export default AllFoods;
