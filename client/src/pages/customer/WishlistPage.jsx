import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useWishlist } from '../../providers/WishlistProvider';
import { useCart } from '../../providers/CartProvider';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

export const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    removeFromWishlist(item._id);
    toast.success(`${item.name} moved to cart!`);
  };

  return (
    <DashboardLayout isAdminLayout={false}>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Saved Wishlist</h1>
            <p className="text-xs text-gray-500">Your favorite organic items saved for future healthy shopping</p>
          </div>
          <span className="text-xs font-bold bg-[#E8D8C3] text-[#4A0E22] px-3 py-1 rounded-full">
            {wishlistItems.length} Saved
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D8C3A5]">
            <p className="text-sm text-gray-500">Your wishlist is currently empty.</p>
            <Link to="/foods" className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 bg-[#5C162E] text-white rounded-xl text-xs font-bold">
              <span>Browse Pure Foods</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-[#D8C3A5] p-4 flex gap-4 items-center justify-between shadow-xs"
              >
                <img
                  src={item.images?.[0] || 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200'}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-serif font-bold text-xs text-[#4A0E22] line-clamp-1">{item.name}</h4>
                  <p className="text-xs text-[#2E5A36] font-semibold">{item.category}</p>
                  <p className="font-bold text-sm text-[#5C162E] mt-1">৳{item.discountPrice || item.regularPrice}</p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="p-2 bg-[#5C162E] text-white rounded-lg hover:bg-[#4A0E22]"
                    title="Move to Cart"
                  >
                    <ShoppingBag className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="p-2 border border-gray-200 text-gray-400 hover:text-red-500 rounded-lg"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default WishlistPage;
