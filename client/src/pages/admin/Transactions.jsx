import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { CreditCard, Banknote, CheckCircle, ArrowDownLeft } from 'lucide-react';

export const Transactions = () => {
  const [transactions] = useState([
    {
      id: 'TXN_98124',
      orderId: 'ORD_94102',
      customer: 'nusrat@yahoo.com',
      method: 'Stripe',
      amount: 1050,
      currency: 'BDT',
      status: 'Success',
      date: '2026-11-23 02:15',
    },
    {
      id: 'TXN_98125',
      orderId: 'ORD_94101',
      customer: 'tanvir@gmail.com',
      method: 'COD',
      amount: 1040,
      currency: 'BDT',
      status: 'Pending Collection',
      date: '2026-11-23 04:20',
    },
    {
      id: 'TXN_98126',
      orderId: 'ORD_94103',
      customer: 'mahfuz@health.org',
      method: 'COD',
      amount: 1150,
      currency: 'BDT',
      status: 'Pending Collection',
      date: '2026-11-22 18:40',
    },
    {
      id: 'TXN_98120',
      orderId: 'ORD_94098',
      customer: 'sadia@outlook.com',
      method: 'Stripe',
      amount: 2250,
      currency: 'BDT',
      status: 'Success',
      date: '2026-11-21 14:10',
    },
  ]);

  return (
    <DashboardLayout isAdminLayout={true}>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Payment Transactions History</h1>
            <p className="text-xs text-gray-500">Audit logs for Stripe Card checkouts and Cash on Delivery settlements</p>
          </div>
          <span className="text-xs font-bold bg-[#2E5A36] text-white px-3 py-1 rounded-full">
            Verified Records
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#D8C3A5] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFF8E7]/60 text-gray-500 font-bold uppercase">
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Order Ref</th>
                <th className="p-4">Customer Email</th>
                <th className="p-4">Method</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#5C162E]">{tx.id}</td>
                  <td className="p-4 font-mono text-gray-600">{tx.orderId}</td>
                  <td className="p-4 text-gray-700">{tx.customer}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-[#4A0E22]">
                      {tx.method === 'Stripe' ? <CreditCard className="w-3.5 h-3.5 text-purple-600" /> : <Banknote className="w-3.5 h-3.5 text-emerald-600" />}
                      <span>{tx.method}</span>
                    </span>
                  </td>
                  <td className="p-4 font-bold text-[#5C162E]">৳{tx.amount}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      tx.status === 'Success' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default Transactions;
