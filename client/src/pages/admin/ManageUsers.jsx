import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { UserCheck, ShieldAlert, ShieldCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const ManageUsers = () => {
  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Saidul Himu', email: 'saidulhimu@gmail.com', role: 'admin', isBlocked: false, joined: '2026-11-20' },
    { id: 'usr_2', name: 'Tanvir Ahmed', email: 'tanvir@gmail.com', role: 'user', isBlocked: false, joined: '2026-11-21' },
    { id: 'usr_3', name: 'Nusrat Jahan', email: 'nusrat@yahoo.com', role: 'user', isBlocked: false, joined: '2026-11-22' },
    { id: 'usr_4', name: 'Dr. Mahfuzur', email: 'mahfuz@health.org', role: 'user', isBlocked: false, joined: '2026-11-22' },
  ]);

  // Block / Unblock user feature as specified in doc:
  // "রেজিস্টার্ড কাস্টমারদের তালিকা দেখা এবং প্রয়োজনে কোনো ইউজারকে Block / Unblock করা"
  const handleToggleBlock = (id) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const nextState = !u.isBlocked;
          toast.success(`User ${u.name} is now ${nextState ? 'Blocked' : 'Unblocked'}`);
          return { ...u, isBlocked: nextState };
        }
        return u;
      })
    );
  };

  return (
    <DashboardLayout isAdminLayout={true}>
      <div className="space-y-6">
        
        <div className="flex items-center justify-between pb-4 border-b border-[#E8D8C3]">
          <div>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22]">Registered Customer Accounts</h1>
            <p className="text-xs text-gray-500">Security moderation, role checking, and customer permissions</p>
          </div>
          <span className="text-xs font-bold bg-[#E8D8C3] text-[#4A0E22] px-3 py-1 rounded-full">
            {users.length} Users
          </span>
        </div>

        <div className="bg-white rounded-3xl border border-[#D8C3A5] shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-100 bg-[#FFF8E7]/60 text-gray-500 font-bold uppercase">
                <th className="p-4">Customer</th>
                <th className="p-4">Email Address</th>
                <th className="p-4">Role</th>
                <th className="p-4">Account Status</th>
                <th className="p-4 text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 font-bold text-[#4A0E22]">{u.name}</td>
                  <td className="p-4 text-gray-600 font-mono">{u.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      u.isBlocked ? 'bg-red-100 text-red-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {u.isBlocked ? 'Blocked / Suspended' : 'Active Account'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    {u.role !== 'admin' && (
                      <button
                        onClick={() => handleToggleBlock(u.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                          u.isBlocked
                            ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                            : 'bg-red-50 hover:bg-red-100 text-red-700 border border-red-200'
                        }`}
                      >
                        {u.isBlocked ? 'Unblock User' : 'Block User'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </DashboardLayout>
  );
};

export default ManageUsers;
