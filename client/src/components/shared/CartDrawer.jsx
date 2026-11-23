import React from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';

export const CartDrawer = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    subtotal,
    deliveryFee,
    finalTotal,
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF8E7] border-l border-[#D8C3A5] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#D8C3A5] flex items-center justify-between bg-[#5C162E] text-[#FFF8E7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h3 className="font-serif font-bold text-lg">Your Organic Cart</h3>
              <span className="bg-[#FFF8E7] text-[#5C162E] text-xs font-bold px-2 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-gray-500">
                <div className="w-20 h-20 rounded-full bg-[#E8D8C3]/50 flex items-center justify-center mb-4 text-[#5C162E]">
                  <ShoppingBag className="w-10 h-10 stroke-1" />
                </div>
                <h4 className="font-serif font-bold text-lg text-[#4A0E22]">Your cart is empty</h4>
                <p className="text-xs text-gray-500 mt-1 max-w-xs">
                  Discover fresh organic honey, ghee, healthy nuts and superfoods to fill your bag!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 px-5 py-2.5 bg-[#5C162E] text-[#FFF8E7] rounded-xl text-xs font-semibold hover:bg-[#4A0E22]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-4 p-3 bg-white/70 rounded-xl border border-[#E8D8C3] shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover border border-[#E8D8C3]"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-xs text-[#4A0E22] line-clamp-1">{item.name}</h4>
                      <p className="text-[11px] text-[#2E5A36] font-semibold">{item.weight}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[#D8C3A5] rounded-lg overflow-hidden bg-[#FFF8E7]">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-1 hover:bg-[#E8D8C3] text-[#4A0E22]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#4A0E22]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-1 hover:bg-[#E8D8C3] text-[#4A0E22]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#5C162E]">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cartItems.length > 0 && (
            <div className="p-5 border-t border-[#D8C3A5] bg-white/80 space-y-3">
              <div className="space-y-1.5 text-xs text-[#4A0E22]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold">৳{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee (Mirpur & Bangladesh)</span>
                  <span className="font-bold">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700">FREE</span>
                    ) : (
                      `৳${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#5C162E] pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span>৳{finalTotal}</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-[11px] text-center text-gray-500 mt-2">
                  🔒 Safe & Secure Checkout with Cash on Delivery or Card
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
