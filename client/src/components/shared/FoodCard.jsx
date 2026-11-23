import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Eye, Star } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';
import { useWishlist } from '../../providers/WishlistProvider';
import toast from 'react-hot-toast';

export const FoodCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isFav = isInWishlist(product._id);
  const primaryImage = product.images?.[0] || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=500';
  const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.regularPrice);
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.discountPrice) / product.regularPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`, {
      style: {
        background: '#4A0E22',
        color: '#FFF8E7',
      },
      icon: '🛒',
    });
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
    if (isFav) {
      toast('Removed from favorites', { icon: '💔' });
    } else {
      toast.success('Added to favorites!', { icon: '❤️' });
    }
  };

  return (
    <div className="group relative bg-[#FFF8E7] rounded-2xl border border-[#D8C3A5] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      
      {/* Product Image & Badges Container */}
      <div className="relative aspect-square overflow-hidden bg-white/40">
        <Link to={`/food/${product._id}`}>
          <img
            src={primaryImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
          />
        </Link>

        {/* Sale / Discount Ribbon */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-[#5C162E] text-[#FFF8E7] text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md tracking-wider uppercase">
            SAVE {discountPercent}%
          </div>
        )}

        {/* 100% Organic Accent Badge */}
        <div className="absolute top-3 left-3 bg-[#2E5A36] text-white text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
          100% Organic
        </div>

        {/* Quick Action Floating Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 p-4 pointer-events-none">
          <button
            onClick={handleToggleWishlist}
            aria-label="Add to Wishlist"
            className={`pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-lg ${
              isFav ? 'bg-[#5C162E] text-white' : 'bg-white text-[#4A0E22] hover:bg-[#5C162E] hover:text-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
          </button>

          {onQuickView && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onQuickView(product);
              }}
              aria-label="Quick View"
              className="pointer-events-auto w-10 h-10 rounded-full bg-white text-[#4A0E22] hover:bg-[#5C162E] hover:text-white flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}

          <button
            onClick={handleAddToCart}
            aria-label="Quick Add to Cart"
            className="pointer-events-auto w-10 h-10 rounded-full bg-[#5C162E] text-[#FFF8E7] hover:bg-[#4A0E22] flex items-center justify-center transition-all transform hover:scale-110 shadow-lg"
          >
            <ShoppingBag className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Category & Weight Indicator */}
          <div className="flex items-center justify-between text-xs text-[#2E5A36] font-medium mb-1.5">
            <span className="uppercase tracking-wider">{product.category}</span>
            <span className="bg-[#E8D8C3]/70 px-2 py-0.5 rounded text-[#4A0E22] font-semibold">
              {product.weight || '500g'}
            </span>
          </div>

          {/* Product Title */}
          <Link to={`/food/${product._id}`}>
            <h3 className="font-serif text-base font-bold text-[#4A0E22] line-clamp-1 hover:text-[#5C162E] transition-colors">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="flex text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating || 5) ? 'fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">
              ({product.reviewsCount || 24})
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#E8D8C3] flex items-center justify-between">
          <div>
            <span className="text-lg font-extrabold text-[#5C162E]">
              ৳{product.discountPrice || product.regularPrice}
            </span>
            {hasDiscount && (
              <span className="ml-2 text-xs text-gray-400 line-through">
                ৳{product.regularPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-lg text-xs font-semibold tracking-wide transition-colors shadow-sm"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
