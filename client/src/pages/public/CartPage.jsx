import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../../providers/CartProvider';

export const CartPage = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    deliveryFee,
    finalTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="pt-32 pb-24 bg-[#FFF8E7] min-h-screen">
        <div className="max-w-xl mx-auto px-4 text-center">
          <div className="w-24 h-24 rounded-full bg-[#E8D8C3]/60 flex items-center justify-center mx-auto mb-6 text-[#5C162E]">
            <ShoppingBag className="w-12 h-12 stroke-1" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#4A0E22]">Your Shopping Cart is Empty</h1>
          <p className="text-sm text-gray-600 mt-2">
            You haven't added any delicious, chemical-free organic groceries to your bag yet.
          </p>
          <Link
            to="/foods"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all"
          >
            <span>Explore All Foods</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#4A0E22] mb-8">
          Shopping Cart ({cartItems.length} items)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Cart Items Table */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-sm overflow-hidden">
              <div className="divide-y divide-[#E8D8C3]/50">
                {cartItems.map((item) => (
                  <div key={item._id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-xl object-cover border border-[#E8D8C3]"
                      />
                      <div>
                        <h3 className="font-serif font-bold text-sm text-[#4A0E22]">{item.name}</h3>
                        <p className="text-xs text-[#2E5A36] font-semibold">{item.category} • {item.weight}</p>
                        <p className="text-xs text-gray-500 mt-1">Unit: ৳{item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D8C3A5] rounded-xl bg-[#FFF8E7] overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item._id, -1)}
                          className="p-2 hover:bg-[#E8D8C3] text-[#4A0E22] transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-bold text-[#4A0E22]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item._id, 1)}
                          className="p-2 hover:bg-[#E8D8C3] text-[#4A0E22] transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for item */}
                      <div className="text-right min-w-[70px]">
                        <span className="font-serif font-bold text-base text-[#5C162E]">
                          ৳{item.price * item.quantity}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                        title="Remove Item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#E8D8C3] flex items-center justify-between">
                <button
                  onClick={clearCart}
                  className="text-xs text-red-600 hover:underline font-semibold"
                >
                  Clear Cart
                </button>
                <Link to="/foods" className="text-xs text-[#5C162E] hover:underline font-bold">
                  + Add More Foods
                </Link>
              </div>
            </div>
          </div>

          {/* Order Summary Card */}
          <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 sm:p-8 shadow-sm h-fit space-y-6">
            <h2 className="font-serif font-bold text-xl text-[#4A0E22] pb-3 border-b border-gray-100">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm text-[#4A0E22]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold">৳{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold">
                  {deliveryFee === 0 ? <span className="text-emerald-700">FREE</span> : `৳${deliveryFee}`}
                </span>
              </div>
              {subtotal < 1500 && (
                <p className="text-[11px] text-[#2E5A36] bg-emerald-50 p-2 rounded-lg">
                  💡 Add ৳{1500 - subtotal} more of organic groceries for <strong>FREE Delivery</strong>!
                </p>
              )}
              <div className="flex justify-between text-lg font-serif font-black text-[#5C162E] pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>৳{finalTotal}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="w-full flex items-center justify-center gap-2 py-4 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <div className="pt-2 text-center text-xs text-gray-500 space-y-1">
              <div className="flex items-center justify-center gap-1.5 text-[#2E5A36]">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-semibold">Cash on Delivery & Secure Cards</span>
              </div>
              <p>Hotline: 01341-180530</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CartPage;
