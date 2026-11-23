import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  ShieldCheck, 
  Leaf, 
  HeartHandshake, 
  Send 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#4A0E22] text-[#FFF8E7] pt-16 pb-8 border-t-4 border-[#5C162E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#E8D8C3]/20">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.jpg"
                alt="Uniquee Food Logo"
                className="h-12 w-auto rounded-lg shadow object-cover bg-white p-1"
              />
              <div>
                <h3 className="text-2xl font-bold font-serif text-[#FFF8E7]">Uniquee Food</h3>
                <p className="text-xs text-[#E8D8C3] tracking-widest uppercase">Pure Food, Pure Life</p>
              </div>
            </div>
            <p className="text-sm text-[#E8D8C3]/90 leading-relaxed font-light">
              Quality Inside, Perfection Outside. We source 100% natural, unadulterated organic groceries, wild forest honey, bilona ghee, and pure cold-pressed oils right to your dining table.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#5C162E] flex items-center justify-center text-[#FFF8E7] hover:bg-[#2E5A36] transition-colors"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#5C162E] flex items-center justify-center text-[#FFF8E7] hover:bg-[#2E5A36] transition-colors"
              >
                ig
              </a>
              <a
                href="https://wa.me/8801341180530"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#2E5A36] flex items-center justify-center text-[#FFF8E7] hover:bg-emerald-600 transition-colors"
              >
                wa
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FFF8E7] mb-4 border-b border-[#E8D8C3]/30 pb-2">
              Explore Store
            </h4>
            <ul className="space-y-2.5 text-sm text-[#E8D8C3]/80">
              <li>
                <Link to="/foods" className="hover:text-[#FFF8E7] transition-colors">
                  All Organic Foods
                </Link>
              </li>
              <li>
                <Link to="/foods?category=Pure%20Honey%20%26%20Ghee" className="hover:text-[#FFF8E7] transition-colors">
                  Pure Honey & Ghee
                </Link>
              </li>
              <li>
                <Link to="/foods?category=Nuts%20%26%20Dry%20Fruits" className="hover:text-[#FFF8E7] transition-colors">
                  Nuts & Dry Fruits
                </Link>
              </li>
              <li>
                <Link to="/foods?category=Cold-Pressed%20Oils" className="hover:text-[#FFF8E7] transition-colors">
                  Cold-Pressed Virgin Oils
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#FFF8E7] transition-colors">
                  Our Organic Philosophy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#FFF8E7] transition-colors">
                  Store Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Physical Address & Contact Info from Doc */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FFF8E7] mb-4 border-b border-[#E8D8C3]/30 pb-2">
              Physical Store & Hotline
            </h4>
            <ul className="space-y-3 text-sm text-[#E8D8C3]/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-[#E8D8C3] shrink-0 mt-0.5" />
                <span>34/35 House, Top Floor, Rainkhola, Road 3, Block A, Mirpur 2, Dhaka-1216, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E8D8C3] shrink-0" />
                <a href="tel:01341180530" className="hover:text-white">
                  01341-180530 / +880 1341-180530
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E8D8C3] shrink-0" />
                <span>orders@uniqueefood.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#E8D8C3] shrink-0" />
                <span>Always Open (24/7 Online Ordering)</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h4 className="text-lg font-serif font-bold text-[#FFF8E7] mb-4 border-b border-[#E8D8C3]/30 pb-2">
              Pure Food Club
            </h4>
            <p className="text-xs text-[#E8D8C3]/80 mb-3 leading-relaxed">
              Subscribe for weekly organic farm harvests, discounts, and pure nutrition advice.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Uniquee Food!'); }} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  required
                  className="w-full px-4 py-2.5 rounded-lg bg-[#5C162E] text-[#FFF8E7] placeholder-[#E8D8C3]/60 border border-[#E8D8C3]/30 focus:outline-none focus:border-[#E8D8C3] text-sm"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-[#2E5A36] hover:bg-[#42784D] text-white rounded-md flex items-center justify-center transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
            <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-[#E8D8C3]">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Organic Certified Safe Grocery</span>
            </div>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E8D8C3]/70 gap-4">
          <p>© {new Date().getFullYear()} Uniquee Food. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <span className="text-red-400">♥</span> for healthy living in Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
