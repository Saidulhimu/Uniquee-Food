import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export const HeroBanner = () => {
  return (
    <section className="relative w-full pt-20 md:pt-24 pb-12 overflow-hidden bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width Responsive Banner Card */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#D8C3A5] min-h-[460px] md:min-h-[540px] flex items-center">
          
          {/* Cover Photo as full background */}
          <img
            src="/assets/hero-banner.jpg"
            alt="Uniquee Food Artisanal Cover Banner"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />

          {/* Soft Gradient Overlay for Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

          {/* Left/Bottom Sleek Glassmorphic Floating Card */}
          <div className="relative z-10 max-w-xl p-6 sm:p-10 m-4 sm:m-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="bg-[#FFF8E7]/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#E8D8C3] shadow-glass"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2E5A36] text-[#FFF8E7] text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>100% Pure & Organic Grocery</span>
              </div>

              {/* Tagline & Headline */}
              <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-[#4A0E22] tracking-tight leading-tight">
                Pure Food, <br />
                <span className="text-[#5C162E]">Pure Life.</span>
              </h1>

              <p className="mt-3 text-sm sm:text-base text-[#4A0E22]/90 leading-relaxed font-sans">
                "Quality Inside, Perfection Outside" — Raw wild Sundarban honey, cultured bilona cow ghee, ghani-pressed oils & superfoods directly from nature.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 flex flex-wrap gap-4 items-center">
                <Link
                  to="/foods"
                  className="px-6 py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                >
                  <span>Explore Pure Foods</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <a
                  href="https://wa.me/8801341180530"
                  target="_blank"
                  rel="noreferrer"
                  className="px-5 py-3.5 bg-white/90 hover:bg-white text-[#2E5A36] border border-[#2E5A36] rounded-xl font-semibold text-sm transition-all shadow-sm"
                >
                  Order via WhatsApp
                </a>
              </div>

              {/* Trust Tag */}
              <div className="mt-5 pt-4 border-t border-[#D8C3A5]/60 flex items-center gap-2 text-xs text-[#2E5A36] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Chemical & Preservative Free Guarantee</span>
              </div>
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroBanner;
