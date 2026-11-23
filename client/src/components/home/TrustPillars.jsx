import React from 'react';
import { Leaf, Award, Heart, ShieldCheck } from 'lucide-react';

export const TrustPillars = () => {
  const pillars = [
    {
      icon: Leaf,
      title: '100% Organic',
      banglaTitle: '১০০% অর্গানিক',
      description: 'Grown and collected through sustainable, ethical chemical-free agro practices.',
    },
    {
      icon: Award,
      title: 'Natural Ingredients',
      banglaTitle: 'প্রাকৃতিক উপাদান',
      description: 'Zero artificial colors, synthetic flavors, or harmful adulteration.',
    },
    {
      icon: ShieldCheck,
      title: 'No Preservatives',
      banglaTitle: 'সংরক্ষণকারী মুক্ত',
      description: 'Raw, fresh, and unadulterated batch processing preserving vital nutrients.',
    },
    {
      icon: Heart,
      title: 'Healthy Choice',
      banglaTitle: 'স্বাস্থ্যকর পছন্দ',
      description: 'Crafted to nourish your immunity, active digestion, and wholesome family wellness.',
    },
  ];

  return (
    <section className="py-10 bg-[#E8D8C3]/50 border-y border-[#D8C3A5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#FFF8E7] p-6 rounded-2xl border border-[#D8C3A5] shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="p-3 bg-[#5C162E] text-[#FFF8E7] rounded-xl shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-[#4A0E22]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#2E5A36] font-semibold mb-1">
                    {item.banglaTitle}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustPillars;
