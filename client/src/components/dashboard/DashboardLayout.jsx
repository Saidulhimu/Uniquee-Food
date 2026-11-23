import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { 
  LayoutDashboard, 
  PackageCheck, 
  Heart, 
  User, 
  LogOut, 
  PlusCircle, 
  Boxes, 
  ListOrdered, 
  Users, 
  CreditCard,
  Home,
  ShieldCheck
} from 'lucide-react';

export const DashboardLayout = ({ children, isAdminLayout = false }) => {
  const { user, isAdmin, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  const customerNav = [
    { name: 'Overview', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Orders', path: '/dashboard/my-orders', icon: PackageCheck },
    { name: 'Saved Wishlist', path: '/dashboard/wishlist', icon: Heart },
    { name: 'Profile & Address', path: '/dashboard/profile', icon: User },
  ];

  const adminNav = [
    { name: 'Admin Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Add Food Product', path: '/admin/add-product', icon: PlusCircle },
    { name: 'Manage Inventory', path: '/admin/manage-products', icon: Boxes },
    { name: 'Manage Orders', path: '/admin/manage-orders', icon: ListOrdered },
    { name: 'Customer Users', path: '/admin/manage-users', icon: Users },
    { name: 'Transactions & Payments', path: '/admin/transactions', icon: CreditCard },
  ];

  const navLinks = isAdminLayout ? adminNav : customerNav;

  return (
    <div className="pt-24 pb-16 bg-[#FFF8E7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-3xl border border-[#D8C3A5] p-6 shadow-sm sticky top-28 space-y-6">
              
              {/* User Profile Badge */}
              <div className="flex items-center gap-3 pb-5 border-b border-[#E8D8C3]">
                <img
                  src={user?.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120'}
                  alt={user?.displayName || 'Avatar'}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#5C162E]"
                />
                <div className="overflow-hidden">
                  <h3 className="font-serif font-bold text-sm text-[#4A0E22] truncate">
                    {user?.displayName || 'User'}
                  </h3>
                  <span className={`inline-block text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                    isAdminLayout ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                  }`}>
                    {isAdminLayout ? 'Store Admin' : 'Customer'}
                  </span>
                </div>
              </div>

              {/* Navigation Links */}
              <nav className="space-y-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <NavLink
                      key={item.name}
                      to={item.path}
                      end={item.path === '/dashboard' || item.path === '/admin/dashboard'}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-[#5C162E] text-[#FFF8E7] shadow-sm'
                            : 'text-[#4A0E22] hover:bg-[#FFF8E7]'
                        }`
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Quick Switch to Front Store or Admin */}
              <div className="pt-4 border-t border-[#E8D8C3] space-y-2">
                {isAdmin && (
                  <Link
                    to={isAdminLayout ? '/dashboard' : '/admin/dashboard'}
                    className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-[#5C162E] bg-[#FFF8E7] hover:bg-[#E8D8C3] transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>{isAdminLayout ? 'Customer View' : 'Admin Panel'}</span>
                  </Link>
                )}

                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <Home className="w-4 h-4" />
                  <span>Back to Store</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>

            </div>
          </aside>

          {/* Main Dashboard Content Area */}
          <main className="lg:col-span-3">
            {children}
          </main>

        </div>

      </div>
    </div>
  );
};

export default DashboardLayout;
