import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useAuth } from '../../providers/AuthProvider';
import { useWishlist } from '../../providers/WishlistProvider';
import { ShoppingBag, Clock, CheckCircle, Heart, ArrowRight } from 'lucide-react';

export const CustomerOverview = () => {
  const { user } = useAuth();
  const { wishlistCount } = useWishlist();

  // Read local stored orders or default
  const orders = JSON.parse(localStorage.getItem('uniquee_user_orders') || '[]');
  const pendingCount = orders.filter((o) => o.orderStatus === 'Pending').length;
  const deliveredCount = orders.filter((o) => o.orderStatus === 'Delivered').length;

  return (
    <DashboardLayout isAdminLayout={false}>
      <div className="space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-[#5C162E] text-[#FFF8E7] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#D8C3A5]">
          <h1 className="font-serif text-2xl sm:text-3xl font-extrabold">
            Welcome, {user?.displayName || 'Pure Food Lover'}!
          </h1>
          <p className="text-xs text-[#E8D8C3] mt-1">
            Track your organic food purchases, delivery status, and saved favorites.
          </p>
        </div>

        {/* 3 Metric Cards from Document */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-[#D8C3A5] shadow-xs flex items-center gap-4">
            <div className="p-3 bg-purple-100 text-[#5C162E] rounded-xl">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Orders</p>
              <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{orders.length}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#D8C3A5] shadow-xs flex items-center gap-4">
            <div className="p-3 bg-amber-100 text-amber-800 rounded-xl">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Pending Orders</p>
              <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{pendingCount}</h3>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 border border-[#D8C3A5] shadow-xs flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-[#2E5A36] rounded-xl">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium">Delivered Orders</p>
              <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{deliveredCount}</h3>
            </div>
          </div>
        </div>

        {/* Recent Orders Overview */}
        <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h2 className="font-serif font-bold text-lg text-[#4A0E22]">Recent Orders</h2>
            <Link to="/dashboard/my-orders" className="text-xs text-[#5C162E] font-bold hover:underline">
              View All Orders
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="py-10 text-center text-xs text-gray-500">
              <p>You haven't placed any orders yet.</p>
              <Link to="/foods" className="mt-3 inline-block px-4 py-2 bg-[#5C162E] text-white rounded-xl font-bold">
                Order Pure Groceries
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {orders.slice(0, 3).map((ord) => (
                <div key={ord._id} className="py-4 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-[#4A0E22]">Order #{ord._id.slice(-6)}</p>
                    <p className="text-[11px] text-gray-500">{ord.items?.length || 1} items • ৳{ord.totalAmount}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    ord.orderStatus === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {ord.orderStatus || 'Pending'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default CustomerOverview;
