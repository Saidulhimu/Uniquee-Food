import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Minus, 
  Plus, 
  CheckCircle2, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { INITIAL_FOODS } from '../../data/mockFoods';
import { useCart } from '../../providers/CartProvider';
import { useWishlist } from '../../providers/WishlistProvider';
import toast from 'react-hot-toast';

export const FoodDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find product by id from mock or fallback
  const product = INITIAL_FOODS.find((item) => item._id === id) || INITIAL_FOODS[0];
  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description'); // 'description' | 'nutrition' | 'reviews'

  const isFav = isInWishlist(product._id);
  const effectivePrice = product.discountPrice || product.regularPrice;
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.regularPrice);
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`Added ${quantity} × ${product.name} to cart!`, {
      style: { background: '#4A0E22', color: '#FFF8E7' },
      icon: '🛒',
    });
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product);
    if (isFav) {
      toast('Removed from favorites', { icon: '💔' });
    } else {
      toast.success('Added to favorites!', { icon: '❤️' });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-6">
          <Link to="/" className="hover:text-[#5C162E]">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/foods" className="hover:text-[#5C162E]">All Foods</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#4A0E22] font-semibold">{product.name}</span>
        </nav>

        {/* Product Main Container */}
        <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#FFF8E7] border border-[#E8D8C3] relative">
              <img
                src={selectedImage || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-[#5C162E] text-[#FFF8E7] text-xs font-bold px-3 py-1 rounded-full shadow">
                  SAVE {discountPercent}%
                </div>
              )}
            </div>

            {/* Thumbnail list */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === img ? 'border-[#5C162E] scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-[#2E5A36] text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  100% Organic
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  In Stock ({product.stock} units available)
                </span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl font-extrabold text-[#4A0E22] mt-2">
                {product.name}
              </h1>

              {/* Rating & Category */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-gray-100 text-xs">
                <div className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-4 h-4 fill-current" />
                  <span>{product.rating || 5.0}</span>
                  <span className="text-gray-400 font-normal">({product.reviewsCount || 24} customer reviews)</span>
                </div>
                <span className="text-gray-300">|</span>
                <span className="text-[#2E5A36] font-semibold">{product.category}</span>
              </div>

              {/* Pricing Display */}
              <div className="mt-5 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-serif font-black text-[#5C162E]">
                  ৳{effectivePrice}
                </span>
                {hasDiscount && (
                  <span className="text-base text-gray-400 line-through">
                    ৳{product.regularPrice}
                  </span>
                )}
                <span className="text-xs bg-[#E8D8C3] text-[#4A0E22] font-bold px-2.5 py-1 rounded-md">
                  Pack: {product.weight}
                </span>
              </div>

              {/* Quick Summary */}
              <p className="mt-4 text-sm text-gray-600 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Highlights Pill Badges */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  '100% Raw & Chemical-Free',
                  'Fresh Harvested Organic Batch',
                  'Same Day Dispatch in Mirpur & Dhaka',
                  'Cash on Delivery / Card Accepted',
                ].map((highlight, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#4A0E22]">
                    <CheckCircle2 className="w-4 h-4 text-[#2E5A36] shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Stepper & Buttons */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-[#4A0E22]">Quantity:</span>
                <div className="flex items-center border border-[#D8C3A5] rounded-xl bg-[#FFF8E7] overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-[#E8D8C3] text-[#4A0E22] transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#4A0E22]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-[#E8D8C3] text-[#4A0E22] transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-400">Total: ৳{effectivePrice * quantity}</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className={`p-3.5 rounded-xl border border-[#D8C3A5] flex items-center justify-center transition-all ${
                    isFav ? 'bg-[#5C162E] text-white' : 'bg-[#FFF8E7] text-[#4A0E22] hover:bg-[#E8D8C3]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Express Delivery / Store Info */}
              <div className="p-3 bg-[#FFF8E7] rounded-xl border border-[#E8D8C3] flex items-center justify-between text-xs text-[#4A0E22]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#2E5A36]" />
                  <span>Dhaka Delivery: 24-48 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-[#2E5A36]" />
                  <span>7 Days Quality Return</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Nutritional & Health Benefits Tabs */}
        <div className="mt-12 bg-white rounded-3xl border border-[#D8C3A5] p-6 sm:p-10 shadow-sm">
          <div className="flex border-b border-gray-200 gap-8">
            <button
              onClick={() => setActiveTab('description')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'description'
                  ? 'text-[#5C162E] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#5C162E]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Description & Source
            </button>
            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'nutrition'
                  ? 'text-[#5C162E] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#5C162E]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Nutrition & Health Benefits
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 text-sm font-bold transition-all relative ${
                activeTab === 'reviews'
                  ? 'text-[#5C162E] after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#5C162E]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              Customer Reviews ({product.reviewsCount || 24})
            </button>
          </div>

          <div className="pt-6">
            {activeTab === 'description' && (
              <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
                <p>{product.description}</p>
                <div className="bg-[#FFF8E7] p-4 rounded-xl border border-[#E8D8C3] text-xs space-y-1 text-[#4A0E22]">
                  <p><strong>Physical Dispatch Center:</strong> 34/35 House, Rainkhola, Road 3, Block A, Mirpur 2, Dhaka-1216</p>
                  <p><strong>Hotline & WhatsApp Support:</strong> 01341-180530</p>
                  <p><strong>Quality Assurance:</strong> Checked for Zero Adulteration & 100% Pure Natural Origin.</p>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <div className="p-4 bg-[#FFF8E7] rounded-xl border border-[#D8C3A5]">
                  <h4 className="font-serif font-bold text-sm text-[#4A0E22] mb-1">Nutritional Profile:</h4>
                  <p className="text-xs text-gray-700">{product.nutrition || 'Rich in natural antioxidants, micronutrients, and healthy fatty acids.'}</p>
                </div>

                <div>
                  <h4 className="font-serif font-bold text-sm text-[#4A0E22] mb-2">Key Health Benefits:</h4>
                  <ul className="space-y-2">
                    {(product.healthBenefits || [
                      'Boosts cellular immunity naturally',
                      'Free from harmful preservatives and pesticides',
                      'Maintains long-lasting vitality and stamina',
                    ]).map((b, i) => (
                      <li key={i} className="flex items-center gap-2 text-xs text-gray-700">
                        <Sparkles className="w-3.5 h-3.5 text-[#2E5A36]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                <div className="p-4 bg-white border border-gray-100 rounded-xl space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#4A0E22]">Sultan Ahmed (Verified Buyer)</span>
                    <span className="text-[10px] text-gray-400">3 days ago</span>
                  </div>
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                  <p className="text-xs text-gray-600">Great quality product! Very satisfied with the packaging and timely delivery to Mirpur.</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default FoodDetails;
