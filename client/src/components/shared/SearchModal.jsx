import React, { useState } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { INITIAL_FOODS } from '../../data/mockFoods';

export const SearchModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filteredFoods = searchTerm.trim()
    ? INITIAL_FOODS.filter(
        (food) =>
          food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          food.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative mx-auto max-w-2xl bg-[#FFF8E7] rounded-2xl shadow-2xl border border-[#D8C3A5] overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#D8C3A5] bg-white">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search organic honey, cold-pressed oil, dry fruits..."
            autoFocus
            className="w-full bg-transparent text-[#4A0E22] placeholder-gray-400 focus:outline-none text-base font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto p-4">
          {searchTerm.trim() === '' ? (
            <div className="py-8 text-center text-gray-400 text-sm">
              <p>Type keywords to search foods by name or category...</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {['Honey', 'Ghee', 'Mustard Oil', 'Cashew', 'Chia Seeds'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchTerm(tag)}
                    className="text-xs bg-[#E8D8C3]/50 hover:bg-[#D8C3A5] text-[#4A0E22] px-3 py-1 rounded-full transition-colors font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : filteredFoods.length === 0 ? (
            <div className="py-8 text-center text-gray-500 text-sm">
              No organic items found for "{searchTerm}".
            </div>
          ) : (
            <div className="divide-y divide-[#E8D8C3]/60">
              {filteredFoods.map((food) => (
                <Link
                  key={food._id}
                  to={`/food/${food._id}`}
                  onClick={onClose}
                  className="flex items-center gap-4 py-3 px-2 rounded-xl hover:bg-white/70 transition-colors"
                >
                  <img
                    src={food.images[0]}
                    alt={food.name}
                    className="w-12 h-12 rounded-lg object-cover border border-[#E8D8C3]"
                  />
                  <div className="flex-1">
                    <h4 className="text-sm font-serif font-bold text-[#4A0E22]">{food.name}</h4>
                    <span className="text-xs text-[#2E5A36]">{food.category} • {food.weight}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#5C162E]">৳{food.discountPrice || food.regularPrice}</p>
                    <ArrowRight className="w-4 h-4 text-gray-400 ml-auto mt-1" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
