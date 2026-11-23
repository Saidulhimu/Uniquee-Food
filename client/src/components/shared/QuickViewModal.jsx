import React from 'react';
import { X, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';
import { useWishlist } from '../../providers/WishlistProvider';
import toast from 'react-hot-toast';

export const QuickViewModal = ({ product, onClose }) => {
  if (!product) return null;

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isFav = isInWishlist(product._id);

  const handleAdd = () => {
    addToCart(product, 1);
    toast.success(`${product.name} added to cart!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#FFF8E7] rounded-3xl border border-[#D8C3A5] max-w-3xl w-full overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-[#4A0E22] flex items-center justify-center shadow"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="h-72 md:h-full bg-white">
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Product Info */}
        <div className="p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#2E5A36] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                100% Organic
              </span>
              <span className="text-xs text-gray-500 font-semibold">{product.weight}</span>
            </div>

            <h3 className="font-serif text-xl font-bold text-[#4A0E22] leading-snug">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 my-3">
              <span className="text-2xl font-serif font-black text-[#5C162E]">
                ৳{product.discountPrice || product.regularPrice}
              </span>
              {product.discountPrice && (
                <span className="text-sm text-gray-400 line-through">
                  ৳{product.regularPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
              {product.description}
            </p>

            <div className="space-y-1.5 text-xs text-[#2E5A36] font-medium border-t border-[#E8D8C3] pt-3">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Chemical & Preservative Free Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5" />
                <span>Express 24-48h Delivery in Dhaka & Countrywide</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleAdd}
              className="flex-1 py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={() => toggleWishlist(product)}
              className={`p-3 rounded-xl border border-[#D8C3A5] flex items-center justify-center ${
                isFav ? 'bg-[#5C162E] text-white' : 'bg-white text-[#4A0E22] hover:bg-[#E8D8C3]'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
