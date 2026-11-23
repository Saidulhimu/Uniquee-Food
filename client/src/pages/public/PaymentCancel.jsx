import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft, RefreshCw } from 'lucide-react';

export const PaymentCancel = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <div className="pt-32 pb-24 bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white rounded-3xl border border-[#D8C3A5] p-8 shadow-xl text-center">
        
        <div className="w-20 h-20 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="w-10 h-10" />
        </div>

        <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">
          Payment Cancelled
        </h1>
        <p className="text-xs text-gray-500 mt-2">
          Your online card transaction was not completed. No funds were charged from your account.
        </p>

        {orderId && (
          <p className="text-xs text-gray-400 mt-2 font-mono">
            Pending Order ID: {orderId}
          </p>
        )}

        <div className="mt-8 space-y-3">
          <Link
            to="/checkout"
            className="w-full py-3.5 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-xs shadow transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again or Switch to Cash on Delivery</span>
          </Link>

          <Link
            to="/cart"
            className="w-full py-3 bg-[#E8D8C3] hover:bg-[#D8C3A5] text-[#4A0E22] rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Cart</span>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PaymentCancel;
