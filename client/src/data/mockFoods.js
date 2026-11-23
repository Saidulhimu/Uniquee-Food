// Fallback high-quality food dataset based on the documentation
export const INITIAL_FOODS = [
  {
    _id: "65e23a101b0f12a1",
    name: "Sundarban Raw Wild Honey (সুন্দরবনের প্রাকৃতিক মধু)",
    category: "Pure Honey & Ghee",
    description: "100% pure, unfiltered raw wild honey collected directly from the mangrove forest of Sundarbans. Packed with natural pollen, enzymes, and rich antioxidants.",
    weight: "500g",
    regularPrice: 750,
    discountPrice: 650,
    stock: 28,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 38,
    nutrition: "Calories: 304 kcal per 100g, Sugars: 82g, Iron: 0.4mg, Potassium: 52mg",
    healthBenefits: ["Boosts immune system naturally", "Soothes cough and sore throat", "Aids healthy digestion", "Natural antioxidant powerhouse"]
  },
  {
    _id: "65e23a101b0f12a2",
    name: "Artisan Cultured Grass-Fed Cow Ghee (গাওয়া ঘি)",
    category: "Pure Honey & Ghee",
    description: "Traditional slow-cooked bilona cow ghee made from pure milk of free-grazing cows. Aromatic, golden granular texture and rich in vitamins A, D, and butyric acid.",
    weight: "450g",
    regularPrice: 1200,
    discountPrice: 1050,
    stock: 15,
    images: [
      "https://images.unsplash.com/photo-1628088062854-d1870b4553da?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    rating: 5.0,
    reviewsCount: 44,
    nutrition: "Calories: 884 kcal per 100g, Healthy Fats: 99.5g, Vitamin A: 840mcg",
    healthBenefits: ["Enhances nutrient absorption", "Nourishes brain and nervous system", "Supports gut microbiome health", "High smoke point for cooking"]
  },
  {
    _id: "65e23a101b0f12a3",
    name: "Premium Jumbo Royal Cashew Nuts (কাজু বাদাম)",
    category: "Nuts & Dry Fruits",
    description: "Whole white W240 grade jumbo cashews, naturally sun-dried without salt or preservatives. Creamy, nutrient-rich, and healthy snacking delight.",
    weight: "500g",
    regularPrice: 850,
    discountPrice: 790,
    stock: 40,
    images: [
      "https://images.unsplash.com/photo-1536591375315-1b83681e3be6?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    rating: 4.8,
    reviewsCount: 29,
    nutrition: "Calories: 553 kcal per 100g, Protein: 18g, Magnesium: 292mg, Iron: 6.7mg",
    healthBenefits: ["Supports heart wellness", "Boosts bone density", "Provides sustained day-long stamina", "Rich in copper & zinc"]
  },
  {
    _id: "65e23a101b0f12a4",
    name: "Organic California Almonds (কাঠবাদাম)",
    category: "Nuts & Dry Fruits",
    description: "Freshly shelled Nonpareil organic almonds packed with vitamin E, magnesium, and dietary fiber for optimal heart and brain health.",
    weight: "500g",
    regularPrice: 680,
    discountPrice: 620,
    stock: 32,
    images: [
      "https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 31,
    nutrition: "Calories: 579 kcal per 100g, Fiber: 12.5g, Vitamin E: 25.6mg",
    healthBenefits: ["Lowers LDL cholesterol", "Improves cognitive memory", "Stabilizes blood glucose levels"]
  },
  {
    _id: "65e23a101b0f12a5",
    name: "Cold-Pressed Ghani Mustard Oil (ঘানি ভাঙা খাঁটি সরিষার তেল)",
    category: "Cold-Pressed Oils",
    description: "First press virgin mustard oil extracted traditionally using wooden kolhu/ghani below 40°C. Pungent, authentic aroma that elevates every traditional dish.",
    weight: "1 Liter",
    regularPrice: 380,
    discountPrice: 340,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 52,
    nutrition: "100% Unrefined Cold-Pressed Oil, Omega-3 & Omega-6 ratio 1:1.2",
    healthBenefits: ["Anti-microbial and heart friendly", "Free from toxic argemone adulteration", "Promotes joint lubrication"]
  },
  {
    _id: "65e23a101b0f12a6",
    name: "Organic Black Seed / Kalijira (প্রাকৃতিক কালোজিরা)",
    category: "Organic Spices & Herbs",
    description: "Premium sorted whole Nigella sativa seeds. Recognized globally as the wonder herb for immunity enhancement and metabolic health.",
    weight: "250g",
    regularPrice: 240,
    discountPrice: 195,
    stock: 50,
    images: [
      "https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    rating: 5.0,
    reviewsCount: 26,
    nutrition: "Thymoquinone, Essential Fatty Acids, Amino Acids",
    healthBenefits: ["Immunity boosting powerhouse", "Respiratory and allergy relief", "Traditional natural remedy"]
  },
  {
    _id: "65e23a101b0f12a7",
    name: "Pure Organic Turmeric Powder (নিখাদ হলুদের গুঁড়া)",
    category: "Organic Spices & Herbs",
    description: "High curcumin content hand-ground organic turmeric roots. Free from artificial food coloring, lead chromate, and industrial polishing.",
    weight: "250g",
    regularPrice: 180,
    discountPrice: 150,
    stock: 35,
    images: [
      "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    rating: 4.8,
    reviewsCount: 19,
    nutrition: "Curcumin > 4.5%, Naturally Sun-dried Root Powder",
    healthBenefits: ["Potent anti-inflammatory", "Enhances glowing skin", "Cellular detoxification"]
  },
  {
    _id: "65e23a101b0f12a8",
    name: "Organic Superfood Chia Seeds (অর্গানিক চিয়া সিড)",
    category: "Healthy Snacks",
    description: "USDA certified organic black chia seeds loaded with Omega-3 fatty acids, plant protein, and soluble dietary fiber for active digestion.",
    weight: "300g",
    regularPrice: 420,
    discountPrice: 360,
    stock: 38,
    images: [
      "https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    rating: 4.9,
    reviewsCount: 34,
    nutrition: "Dietary Fiber: 34g per 100g, Plant Protein: 17g, Omega-3: 18g",
    healthBenefits: ["Supports natural weight management", "Regulates healthy hydration", "Rich in bone calcium"]
  },
  {
    _id: "65e23a101b0f12a9",
    name: "Raw Shelled Pumpkin Seeds (কুমড়ার বীজ)",
    category: "Healthy Snacks",
    description: "Crunchy zinc and antioxidant rich organic pepitas. Perfect for salads, smoothies, or direct guilt-free wholesome snacking.",
    weight: "250g",
    regularPrice: 350,
    discountPrice: 299,
    stock: 22,
    images: [
      "https://images.unsplash.com/photo-1509358271058-acd22cc93898?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    rating: 4.7,
    reviewsCount: 14,
    nutrition: "Zinc: 7.8mg per 100g, Magnesium: 592mg, Protein: 30g",
    healthBenefits: ["Immunity booster with zinc", "Promotes restorative sleep", "Prostate and heart support"]
  },
  {
    _id: "65e23a101b0f12a0",
    name: "Pure Himalayan Pink Rock Salt (হিমালয়ান পিংক সল্ট)",
    category: "Organic Spices & Herbs",
    description: "Mineral-rich unrefined crystal salt containing over 84 essential trace minerals without anti-caking chemical additives.",
    weight: "500g",
    regularPrice: 220,
    discountPrice: 180,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    rating: 4.9,
    reviewsCount: 22,
    nutrition: "84+ Active trace minerals including Potassium, Magnesium, Calcium",
    healthBenefits: ["Balances internal electrolytes", "Enhances hydration", "Pure unprocessed seasoning"]
  }
];

export const CATEGORIES = [
  {
    id: "honey-ghee",
    name: "Pure Honey & Ghee",
    banglaName: "খাঁটি মধু ও গাওয়া ঘি",
    icon: "🍯",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    itemCount: 12,
  },
  {
    id: "nuts-dry-fruits",
    name: "Nuts & Dry Fruits",
    banglaName: "বাদাম ও ড্রাই ফ্রুটস",
    icon: "🥜",
    image: "https://images.unsplash.com/photo-1536591375315-1b83681e3be6?auto=format&fit=crop&w=600&q=80",
    itemCount: 16,
  },
  {
    id: "cold-pressed-oils",
    name: "Cold-Pressed Oils",
    banglaName: "ঘানি ভাঙা খাঁটি তেল",
    icon: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    itemCount: 8,
  },
  {
    id: "organic-spices",
    name: "Organic Spices & Herbs",
    banglaName: "প্রাকৃতিক মসলা ও ভেষজ",
    icon: "🌿",
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=600&q=80",
    itemCount: 14,
  },
  {
    id: "healthy-snacks",
    name: "Healthy Snacks",
    banglaName: "হেলদি স্ন্যাকস ও বীজ",
    icon: "🌱",
    image: "https://images.unsplash.com/photo-1596797882870-8c33deeac224?auto=format&fit=crop&w=600&q=80",
    itemCount: 10,
  },
];
