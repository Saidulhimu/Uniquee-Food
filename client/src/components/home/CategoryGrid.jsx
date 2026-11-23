import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../../data/mockFoods';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid = () => {
  return (
    <section className="py-16 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full">
            Artisanal Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E22] mt-3">
            Shop by Pure Category
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Handpicked, nutrient-dense organic groceries prepared with zero chemicals.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={`/foods?category=${encodeURIComponent(cat.name)}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-[#D8C3A5] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="aspect-square overflow-hidden bg-[#E8D8C3]/30 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 group-hover:bg-[#5C162E] group-hover:text-white flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 text-center bg-[#FFF8E7] flex-1 flex flex-col justify-center">
                <span className="text-xl mb-1">{cat.icon}</span>
                <h3 className="font-serif font-bold text-sm text-[#4A0E22] group-hover:text-[#5C162E] transition-colors line-clamp-1">
                  {cat.name}
                </h3>
                <p className="text-[11px] text-[#2E5A36] font-medium mt-0.5">
                  {cat.banglaName}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CategoryGrid;
