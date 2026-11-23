import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { CheckCircle, PackageCheck, ShoppingBag, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId') || 'ORD_' + Date.now().toString().slice(-6);
  const method = searchParams.get('method') || 'Stripe';

  useEffect(() => {
    // Fire celebration confetti!
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#5C162E', '#2E5A36', '#E8D8C3'],
    });
  }, []);

  return (
    <div className="pt-32 pb-24 bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white rounded-3xl border border-[#D8C3A5] p-8 shadow-xl text-center">
        
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#2E5A36] flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-3xl font-extrabold text-[#4A0E22]">
          Order Confirmed!
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Thank you for choosing chemical-free pure food from Uniquee Food.
        </p>

        <div className="my-6 p-4 bg-[#FFF8E7] rounded-2xl border border-[#E8D8C3] text-left text-xs space-y-2 text-[#4A0E22]">
          <div className="flex justify-between">
            <span className="text-gray-500">Order Reference:</span>
            <span className="font-bold font-mono text-[#5C162E]">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Payment Option:</span>
            <span className="font-bold">{method === 'COD' ? 'Cash on Delivery' : 'Stripe Card Payment'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Dispatch Location:</span>
            <span className="font-medium">Mirpur 2 Hub, Dhaka</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Hotline Support:</span>
            <span className="font-semibold text-[#2E5A36]">01341-180530</span>
          </div>
        </div>

        <div className="space-y-3">
          <Link
            to="/dashboard/my-orders"
            className="w-full py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Track Order in Dashboard</span>
          </Link>

          <Link
            to="/foods"
            className="w-full py-3 bg-[#E8D8C3] hover:bg-[#D8C3A5] text-[#4A0E22] rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentSuccess;
