const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Sundarban Raw Wild Honey (খাঁটি সুন্দরবনের মধু)',
    category: 'Pure Honey & Ghee',
    description: '100% pure, unfiltered raw wild honey collected directly from the deep mangrove forest of Sundarbans. Packed with natural pollen, enzymes, and rich antioxidants.',
    weight: '500g',
    regularPrice: 750,
    discountPrice: 650,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: true,
  },
  {
    name: 'Artisan Cultured Grass-Fed Cow Ghee (গাওয়া ঘি)',
    category: 'Pure Honey & Ghee',
    description: 'Traditional slow-cooked bilona cow ghee made from pure milk of free-grazing cows. Aromatic, golden granular texture and rich in vitamins A, D, and butyric acid.',
    weight: '450g',
    regularPrice: 1200,
    discountPrice: 1050,
    stock: 20,
    images: [
      'https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: true,
  },
  {
    name: 'Premium Jumbo Royal Cashew Nuts (কাজু বাদাম)',
    category: 'Nuts & Dry Fruits',
    description: 'Whole white W240 grade jumbo cashews, naturally sun-dried without salt or preservatives. Creamy, nutrient-rich, and healthy snacking delight.',
    weight: '500g',
    regularPrice: 850,
    discountPrice: 790,
    stock: 45,
    images: [
      'https://images.unsplash.com/photo-1536591375315-1b83681e3be6?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: true,
  },
  {
    name: 'Organic California Almonds (কাঠবাদাম)',
    category: 'Nuts & Dry Fruits',
    description: 'Freshly shelled Nonpareil organic almonds packed with vitamin E, magnesium, and dietary fiber for optimal heart and brain health.',
    weight: '500g',
    regularPrice: 680,
    discountPrice: 620,
    stock: 30,
    images: [
      'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: false,
  },
  {
    name: 'Cold-Pressed Ghani Mustard Oil (ঘানি ভাঙা সরিষার তেল)',
    category: 'Cold-Pressed Oils',
    description: 'First press virgin mustard oil extracted traditionally using wooden kolhu/ghani below 40°C. Pungent, authentic aroma that elevates every traditional dish.',
    weight: '1 Liter',
    regularPrice: 380,
    discountPrice: 340,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: true,
  },
  {
    name: 'Organic Black Seed / Kalijira (কালোজিরা)',
    category: 'Organic Spices & Herbs',
    description: 'Premium sorted whole Nigella sativa seeds. Recognized globally as the wonder herb for immunity enhancement and metabolic health.',
    weight: '250g',
    regularPrice: 240,
    discountPrice: 195,
    stock: 60,
    images: [
      'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: false,
  },
  {
    name: 'Pure Organic Turmeric Powder (হলুদ গুঁড়া)',
    category: 'Organic Spices & Herbs',
    description: 'High curcumin content hand-ground organic turmeric roots. Free from artificial food coloring, lead chromate, and industrial polishing.',
    weight: '250g',
    regularPrice: 180,
    discountPrice: 150,
    stock: 40,
    images: [
      'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: false,
  },
  {
    name: 'Organic Superfood Chia Seeds (চিয়া সিড)',
    category: 'Healthy Snacks',
    description: 'USDA certified organic black chia seeds loaded with Omega-3 fatty acids, plant protein, and soluble dietary fiber for active digestion.',
    weight: '300g',
    regularPrice: 420,
    discountPrice: 360,
    stock: 35,
    images: [
      'https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: true,
  },
  {
    name: 'Raw Shelled Pumpkin Seeds (কুমড়ার বীজ)',
    category: 'Healthy Snacks',
    description: 'Crunchy zinc and antioxidant rich organic pepitas. Perfect for salads, smoothies, or direct guilt-free wholesome snacking.',
    weight: '250g',
    regularPrice: 350,
    discountPrice: 299,
    stock: 25,
    images: [
      'https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: false,
  },
  {
    name: 'Pure Himalayan Pink Rock Salt (হিমালয়ান পিংক সল্ট)',
    category: 'Organic Spices & Herbs',
    description: 'Mineral-rich unrefined crystal salt containing over 84 essential trace minerals without anti-caking chemical chemicals.',
    weight: '500g',
    regularPrice: 220,
    discountPrice: 180,
    stock: 50,
    images: [
      'https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80',
    ],
    isFeatured: false,
  },
];

async function seedDatabase() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uniquee_food';
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');
    await Product.deleteMany({});
    console.log('Cleared existing products.');
    await Product.insertMany(sampleProducts);
    console.log(`Successfully seeded ${sampleProducts.length} authentic organic products!`);
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  seedDatabase();
}

module.exports = sampleProducts;
