import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { 
  DollarSign, 
  ShoppingBag, 
  Clock, 
  Boxes, 
  Users, 
  TrendingUp,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { INITIAL_FOODS } from '../../data/mockFoods';

export const AdminOverview = () => {
  const [stats, setStats] = useState({
    totalRevenue: 48950,
    totalOrders: 38,
    pendingOrders: 7,
    totalProducts: INITIAL_FOODS.length,
    totalCustomers: 26,
  });

  const recentOrders = [
    { id: 'ORD_94101', customer: 'Tanvir Ahmed', items: 'Sundarban Raw Honey, Mustard Oil', amount: 1040, status: 'Pending', time: '10 mins ago' },
    { id: 'ORD_94102', customer: 'Nusrat Jahan', items: 'Cultured Cow Ghee (450g)', amount: 1050, status: 'Confirmed', time: '1 hour ago' },
    { id: 'ORD_94103', customer: 'Dr. Mahfuzur', items: 'Royal Cashew, Chia Seeds', amount: 1150, status: 'Shipped', time: '3 hours ago' },
    { id: 'ORD_94104', customer: 'Sadia Sultana', items: 'Pink Himalayan Salt, Turmeric', amount: 330, status: 'Delivered', time: 'Yesterday' },
  ];

  return (
    <DashboardLayout isAdminLayout={true}>
      <div className="space-y-6">
        
        {/* Banner */}
        <div className="bg-[#5C162E] text-[#FFF8E7] rounded-3xl p-6 sm:p-8 shadow-sm border border-[#D8C3A5] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#E8D8C3]">
              <ShieldCheck className="w-4 h-4" />
              <span>Uniquee Food Administrator Control Center</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-extrabold mt-1">
              Store Analytics & Operations
            </h1>
            <p className="text-xs text-[#E8D8C3]/90 mt-1">
              Live tracking for Mirpur-2 fulfillment hub orders, inventory & revenue.
            </p>
          </div>

          <Link
            to="/admin/add-product"
            className="px-5 py-2.5 bg-[#FFF8E7] text-[#5C162E] rounded-xl text-xs font-bold hover:bg-white shadow transition-all self-start sm:self-auto"
          >
            + Add New Product
          </Link>
        </div>

        {/* 5 Stats Cards from Doc */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#D8C3A5] shadow-xs">
            <div className="flex items-center justify-between text-[#5C162E] mb-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Revenue</span>
              <DollarSign className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#4A0E22]">৳{stats.totalRevenue.toLocaleString()}</h3>
            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +18% this week
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8C3A5] shadow-xs">
            <div className="flex items-center justify-between text-purple-700 mb-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Total Orders</span>
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{stats.totalOrders}</h3>
            <span className="text-[10px] text-gray-400 mt-1 block">Lifetime orders</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8C3A5] shadow-xs">
            <div className="flex items-center justify-between text-amber-700 mb-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Pending</span>
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{stats.pendingOrders}</h3>
            <span className="text-[10px] text-amber-700 font-bold mt-1 block">Requires dispatch</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8C3A5] shadow-xs">
            <div className="flex items-center justify-between text-[#2E5A36] mb-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Products</span>
              <Boxes className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{stats.totalProducts}</h3>
            <span className="text-[10px] text-[#2E5A36] font-bold mt-1 block">In stock catalog</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-[#D8C3A5] shadow-xs">
            <div className="flex items-center justify-between text-blue-700 mb-2">
              <span className="text-xs text-gray-500 font-bold uppercase">Customers</span>
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-black text-2xl text-[#4A0E22]">{stats.totalCustomers}</h3>
            <span className="text-[10px] text-gray-400 mt-1 block">Registered profiles</span>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h2 className="font-serif font-bold text-lg text-[#4A0E22]">Recent Customer Orders</h2>
              <p className="text-xs text-gray-500">Live order queue from Dhaka & nationwide customers</p>
            </div>
            <Link to="/admin/manage-orders" className="text-xs font-bold text-[#5C162E] hover:underline flex items-center gap-1">
              <span>Manage All</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs mt-3">
              <thead>
                <tr className="border-b border-gray-100 text-gray-400 font-semibold uppercase">
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Items</th>
                  <th className="py-2.5">Amount</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-[#FFF8E7]/40 transition-colors">
                    <td className="py-3 font-mono font-bold text-[#5C162E]">{ord.id}</td>
                    <td className="py-3 font-medium text-[#4A0E22]">{ord.customer}</td>
                    <td className="py-3 text-gray-600 truncate max-w-xs">{ord.items}</td>
                    <td className="py-3 font-bold text-[#4A0E22]">৳{ord.amount}</td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-100 text-emerald-800'
                          : ord.status === 'Shipped'
                          ? 'bg-blue-100 text-blue-800'
                          : ord.status === 'Confirmed'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {ord.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-400">{ord.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default AdminOverview;
