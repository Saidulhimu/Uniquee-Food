import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { PackageCheck, Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

export const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Load local stored orders
    const stored = JSON.parse(localStorage.getItem('uniquee_user_orders') || '[]');
    if (stored.length === 0) {
      // Seed a sample order for demonstration if empty
      const demoOrder = {
        _id: 'ord_demo_98214',
        createdAt: new Date().toISOString(),
        items: [
          {
            name: 'Sundarban Raw Wild Honey',
            price: 650,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200',
            weight: '500g',
          },
          {
            name: 'Organic California Almonds',
            price: 620,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?w=200',
            weight: '500g',
          },
        ],
        subtotal: 1270,
        deliveryFee: 50,
        totalAmount: 1320,
        city: 'Mirpur 2, Dhaka',
        shippingAddress: 'House 12, Road 4, Mirpur 2, Dhaka',
        paymentMethod: 'COD',
        paymentStatus: 'Pending',
        orderStatus: 'Pending',
      };
      setOrders([demoOrder]);
      localStorage.setItem('uniquee_user_orders', JSON.stringify([demoOrder]));
    } else {
      setOrders(stored);
    }
  }, []);

  // Cancel order feature as specified in doc:
  // "/dashboard/my-orders — অর্ডারের স্ট্যাটাস ট্র্যাকিং এবং Pending অর্ডার ক্যান্সেল করার সুবিধা"
  const handleCancelOrder = (id) => {
    if (window.confirm('Are you sure you want to cancel this pending order?')) {
      const updated = orders.map((o) =>
        o._id === id ? { ...o, orderStatus: 'Cancelled' } : o
      );
      setOrders(updated);
      localStorage.setItem('uniquee_user_orders', JSON.stringify(updated));
      toast.success('Order cancelled successfully.');
    }
  };

  return (
    <DashboardLayout isAdminLayout={false}>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">My Orders</h1>
            <p className="text-xs text-gray-500">Track and manage your pure food delivery orders</p>
          </div>
          <span className="text-xs font-bold bg-[#E8D8C3] text-[#4A0E22] px-3 py-1 rounded-full">
            {orders.length} Total
          </span>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#D8C3A5]">
            <p className="text-sm text-gray-500">No orders placed yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord) => (
              <div
                key={ord._id}
                className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-xs space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100 text-xs">
                  <div>
                    <span className="font-bold text-[#4A0E22]">Order ID: </span>
                    <span className="font-mono text-gray-600">#{ord._id}</span>
                    <span className="text-gray-400 ml-3">
                      {new Date(ord.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={`font-bold px-2.5 py-0.5 rounded-full text-[10px] ${
                      ord.orderStatus === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : ord.orderStatus === 'Cancelled'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {ord.orderStatus || 'Pending'}
                    </span>

                    <span className="font-bold px-2.5 py-0.5 rounded-full text-[10px] bg-purple-100 text-purple-800">
                      Payment: {ord.paymentMethod} ({ord.paymentStatus})
                    </span>
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-2">
                  {ord.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-100"
                        />
                        <div>
                          <p className="font-bold text-[#4A0E22]">{item.name}</p>
                          <span className="text-gray-400">{item.weight} • Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#5C162E]">৳{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Footer and cancel action */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-gray-500">Destination: </span>
                    <span className="font-medium text-[#4A0E22]">{ord.shippingAddress}</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-sm font-serif font-black text-[#5C162E]">
                      Total: ৳{ord.totalAmount}
                    </span>

                    {/* Pending order cancellation */}
                    {ord.orderStatus === 'Pending' && (
                      <button
                        onClick={() => handleCancelOrder(ord._id)}
                        className="px-3 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-[11px] font-bold transition-colors"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};

export default MyOrders;
