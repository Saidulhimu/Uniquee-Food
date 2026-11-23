import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: 'Dr. Mahfuzur Rahman',
      location: 'Uttara, Dhaka',
      rating: 5,
      review: 'Uniquee Food-er Sundarban Honey ta asholei osadharon! Flavor and texture ekdom raw honey-er moto. Shokale gorom panir sathe regular khachhi. Truly unadulterated quality.',
      date: '2 days ago',
      product: 'Sundarban Raw Wild Honey',
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      location: 'Mirpur DOHS, Dhaka',
      rating: 5,
      review: 'Gawa ghee-er ghraan ta puro purono diner kotha mone koriye dey. Packaging was very secure and delivered within 24 hours to Mirpur. Will order regularly!',
      date: '1 week ago',
      product: 'Cultured Cow Ghee',
    },
    {
      id: 3,
      name: 'Tanvir Hossain',
      location: 'Dhanmondi, Dhaka',
      rating: 5,
      review: 'Ghani mustard oil and Jumbo cashew nuts 2 tai top notch. Ajkal bajarer bhejaler moddhe emon reliable organic food shop paoa asholei boro sujog.',
      date: '2 weeks ago',
      product: 'Cold-Pressed Mustard Oil',
    },
  ];

  return (
    <section className="py-16 bg-[#FFF8E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#2E5A36] bg-[#2E5A36]/10 px-3 py-1 rounded-full">
            Customer Happiness
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E22] mt-3">
            What Pure Food Lovers Say
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Real feedback from health-conscious families who trust Uniquee Food every day.
          </p>
        </div>

        {/* Reviews Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8C3A5] shadow-xs hover:shadow-lg transition-shadow flex flex-col justify-between relative"
            >
              <Quote className="w-8 h-8 text-[#E8D8C3] absolute top-6 right-6" />

              <div>
                <div className="flex text-amber-500 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic mb-6">
                  "{rev.review}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8D8C3] flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#4A0E22] flex items-center gap-1.5">
                    {rev.name}
                    <CheckCircle className="w-3.5 h-3.5 text-[#2E5A36]" />
                  </h4>
                  <p className="text-[11px] text-gray-500">{rev.location}</p>
                </div>
                <span className="text-[10px] bg-[#E8D8C3]/50 text-[#4A0E22] px-2 py-0.5 rounded font-semibold">
                  {rev.product}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewsSection;
