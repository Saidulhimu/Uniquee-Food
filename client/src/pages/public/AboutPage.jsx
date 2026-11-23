import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Award, ShieldCheck, Heart, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Banner */}
        <div className="bg-[#5C162E] text-[#FFF8E7] rounded-3xl p-8 sm:p-14 mb-12 shadow-xl border border-[#D8C3A5] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#E8D8C3]">
              Our Organic Story & Mission
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-black mt-2 leading-tight">
              Quality Inside, Perfection Outside
            </h1>
            <p className="text-sm sm:text-base text-[#E8D8C3]/90 mt-4 leading-relaxed font-sans">
              Uniquee Food was born with a singular mission: to safeguard Bangladeshi families from toxic food adulteration by delivering raw, unpasteurized honey, grass-fed bilona ghee, and fresh cold-pressed oils straight from ethical farms.
            </p>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-radial from-white to-transparent pointer-events-none" />
        </div>

        {/* Brand Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            {
              icon: Leaf,
              title: '100% Organic Origin',
              desc: 'Direct partnerships with ethical beekeepers in the Sundarbans and organic growers in northern Bangladesh.',
            },
            {
              icon: Award,
              title: 'Zero Chemical Processing',
              desc: 'No synthetic bleaching, sulfur fumigation, or industrial solvents used in any of our batches.',
            },
            {
              icon: ShieldCheck,
              title: 'Guaranteed Unadulterated',
              desc: 'Every batch of honey, oil, and ghee is rigorously tested for natural purity and uncompromised aroma.',
            },
            {
              icon: Heart,
              title: 'Wholesome Vitality',
              desc: 'Dedicated to preserving active enzymes, healthy fatty acids, and natural trace minerals.',
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl border border-[#D8C3A5] shadow-xs">
                <div className="w-12 h-12 rounded-xl bg-[#5C162E] text-white flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#4A0E22]">{pillar.title}</h3>
                <p className="text-xs text-gray-600 mt-2 leading-relaxed">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Physical Store Details from Documentation */}
        <div className="bg-white rounded-3xl border border-[#D8C3A5] p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#2E5A36]">
              Store & Fulfillment Hub
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#4A0E22] mt-2">
              Visit Uniquee Food Hub in Mirpur-2
            </h2>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              We operate an active storage and packing facility in Mirpur 2, Dhaka, ensuring swift same-day dispatch for Mirpur and nationwide deliveries.
            </p>

            <div className="mt-6 space-y-3 text-sm text-[#4A0E22]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#5C162E] shrink-0 mt-0.5" />
                <span>34/35 House, Top Floor, Rainkhola, Road 3, Block A, Mirpur 2, Dhaka-1216, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#5C162E] shrink-0" />
                <span>Hotline & WhatsApp: 01341-180530 / +880 1341-180530</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#5C162E] shrink-0" />
                <span>orders@uniqueefood.com</span>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Link
                to="/foods"
                className="px-6 py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs shadow transition-all flex items-center gap-2"
              >
                <span>Browse Products</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 bg-[#E8D8C3] hover:bg-[#D8C3A5] text-[#4A0E22] rounded-xl font-bold text-xs transition-colors"
              >
                Get In Touch
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-[#D8C3A5] aspect-video">
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80"
              alt="Artisan Organic Food Selection"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;
