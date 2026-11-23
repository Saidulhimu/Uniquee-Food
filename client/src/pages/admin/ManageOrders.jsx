import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { CheckCircle, Truck, Package, Clock, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export const ManageOrders = () => {
  const [orders, setOrders] = useState([
    {
      _id: 'ord_101',
      customerName: 'Tanvir Ahmed',
      customerPhone: '01711-223344',
      shippingAddress: 'House 14, Road 2, Block A, Mirpur 2, Dhaka',
      items: [{ name: 'Sundarban Raw Wild Honey', qty: 1, price: 650 }, { name: 'Cold-Pressed Mustard Oil', qty: 1, price: 340 }],
      totalAmount: 1040,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Pending',
      createdAt: '2026-11-23T04:20:00Z',
    },
    {
      _id: 'ord_102',
      customerName: 'Nusrat Jahan',
      customerPhone: '01822-334455',
      shippingAddress: 'Road 8, Mirpur DOHS, Dhaka',
      items: [{ name: 'Artisan Cultured Grass-Fed Cow Ghee', qty: 1, price: 1050 }],
      totalAmount: 1050,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      orderStatus: 'Confirmed',
      createdAt: '2026-11-23T02:15:00Z',
    },
    {
      _id: 'ord_103',
      customerName: 'Dr. Mahfuzur Rahman',
      customerPhone: '01933-445566',
      shippingAddress: 'Sector 4, Uttara, Dhaka',
      items: [{ name: 'Premium Jumbo Royal Cashew Nuts', qty: 1, price: 790 }, { name: 'Organic Superfood Chia Seeds', qty: 1, price: 360 }],
      totalAmount: 1210,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      orderStatus: 'Shipped',
      createdAt: '2026-11-22T18:40:00Z',
    },
  ]);

  // Order status update workflow from doc:
  // "কাস্টমারদের অর্ডার দেখা এবং স্ট্যাটাস আপডেট করা (Pending -> Confirmed -> Shipped -> Delivered / Cancelled)"
  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? { ...o, orderStatus: newStatus } : o
      )
    );
    toast.success(`Order #${orderId} marked as ${newStatus}!`);
  };

  return (
    <DashboardLayout isAdminLayout={true}>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Manage Customer Orders</h1>
            <p className="text-xs text-gray-500">Dispatch queue and lifecycle tracking for nationwide orders</p>
          </div>
          <span className="text-xs font-bold bg-[#5C162E] text-white px-3 py-1 rounded-full">
            {orders.length} Active Orders
          </span>
        </div>

        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord._id}
              className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100 text-xs">
                <div>
                  <span className="font-mono font-bold text-[#5C162E]">#{ord._id}</span>
                  <span className="ml-3 font-bold text-[#4A0E22]">{ord.customerName}</span>
                  <span className="ml-2 text-gray-500">({ord.customerPhone})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900">
                    {ord.paymentMethod} ({ord.paymentStatus})
                  </span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                    ord.orderStatus === 'Delivered'
                      ? 'bg-emerald-100 text-emerald-800'
                      : ord.orderStatus === 'Shipped'
                      ? 'bg-blue-100 text-blue-800'
                      : ord.orderStatus === 'Confirmed'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    Current: {ord.orderStatus}
                  </span>
                </div>
              </div>

              {/* Items & Shipping */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-[#4A0E22] mb-1">Ordered Foods:</h4>
                  <ul className="space-y-1 text-gray-600">
                    {ord.items.map((it, idx) => (
                      <li key={idx} className="flex justify-between">
                        <span>• {it.name} (x{it.qty})</span>
                        <span className="font-bold text-[#5C162E]">৳{it.price * it.qty}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 pt-2 border-t border-gray-100 font-bold text-sm text-[#5C162E]">
                    Payable Total: ৳{ord.totalAmount}
                  </div>
                </div>

                <div className="bg-[#FFF8E7]/60 p-3 rounded-2xl border border-[#E8D8C3]">
                  <h4 className="font-bold text-[#4A0E22] mb-1">Shipping Destination:</h4>
                  <p className="text-gray-700">{ord.shippingAddress}</p>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="font-bold text-[#4A0E22]">Update Order Status:</span>
                <div className="flex flex-wrap gap-2">
                  {['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(ord._id, st)}
                      className={`px-3 py-1 rounded-lg font-bold text-[11px] transition-all ${
                        ord.orderStatus === st
                          ? 'bg-[#5C162E] text-white shadow-xs'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManageOrders;
