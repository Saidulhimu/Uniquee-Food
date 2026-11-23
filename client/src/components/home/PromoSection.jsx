import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';

export const PromoSection = () => {
  return (
    <section className="py-16 bg-[#E8D8C3]/30 border-y border-[#D8C3A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-[#FFF8E7] rounded-3xl border border-[#D8C3A5] overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
          
          {/* Left Column: Benefits & Combo Offer */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Special Wellness Combo</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E22] leading-tight">
                Pure Nutrition Combo: Honey, Ghee & Royal Nuts
              </h2>

              <p className="mt-4 text-sm text-gray-700 leading-relaxed font-sans">
                Experience nature’s purest immunity boosters. Our organic combo bundle brings together Sundarban raw mangrove honey, bilona cultured cow ghee, and crisp jumbo cashews at a special bundled price.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  '100% Unpasteurized Honey retaining wild floral pollen',
                  'Traditional Wooden Ghani Cold-Pressed Mustard Oil',
                  'Grass-Fed Pure Butter-churned Cow Ghee',
                  'Free Home Delivery on all orders over ৳1500',
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-[#4A0E22]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E5A36] shrink-0" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E8D8C3] flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs text-gray-500 uppercase tracking-wider">Combo Bundle Price</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-[#5C162E]">৳2,250</span>
                  <span className="text-sm text-gray-400 line-through">৳2,700</span>
                </div>
              </div>

              <Link
                to="/foods?combo=true"
                className="px-6 py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2"
              >
                <span>Claim Combo Offer</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: High-Resolution Lifestyle Photography */}
          <div className="relative min-h-[360px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80"
              alt="Fresh Organic Food Lifestyle"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#FFF8E7]/90 backdrop-blur-md border border-[#E8D8C3] shadow-lg">
              <div className="flex items-center gap-3">
                <Truck className="w-6 h-6 text-[#2E5A36]" />
                <div>
                  <p className="text-xs font-bold text-[#4A0E22]">Direct Farm-to-Table Logistics</p>
                  <p className="text-[11px] text-gray-600">Delivering across Dhaka & all 64 districts in Bangladesh</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default PromoSection;
