import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  User, 
  Menu, 
  X, 
  LogOut, 
  LayoutDashboard, 
  ShieldCheck, 
  PackageCheck,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../providers/AuthProvider';
import { useCart } from '../../providers/CartProvider';
import { useWishlist } from '../../providers/WishlistProvider';

export const Navbar = ({ onOpenSearch }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const { user, isAdmin, logoutUser } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Foods', path: '/foods' },
    { name: 'Categories', path: '/foods?tab=categories' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#5C162E] text-[#FFF8E7] shadow-lg py-3'
          : 'bg-[#FFF8E7]/90 backdrop-blur-md text-[#4A0E22] py-4 border-b border-[#E8D8C3]/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/logo.jpg"
              alt="Uniquee Food Logo"
              className="h-10 w-auto rounded-lg shadow-sm object-cover group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col">
              <span className={`text-xl font-bold font-serif tracking-tight leading-tight ${isScrolled ? 'text-[#FFF8E7]' : 'text-[#4A0E22]'}`}>
                Uniquee Food
              </span>
              <span className={`text-[10px] tracking-widest uppercase font-semibold ${isScrolled ? 'text-[#E8D8C3]' : 'text-[#2E5A36]'}`}>
                Pure Food, Pure Life
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-7">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors duration-200 relative py-1 ${
                    isActive
                      ? isScrolled
                        ? 'text-[#FFF8E7] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#FFF8E7]'
                        : 'text-[#5C162E] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#5C162E]'
                      : isScrolled
                      ? 'text-[#FFF8E7]/80 hover:text-[#FFF8E7]'
                      : 'text-[#4A0E22]/80 hover:text-[#5C162E]'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Actions & Utilities */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            
            {/* Live Search Trigger */}
            <button
              onClick={onOpenSearch}
              aria-label="Search Foods"
              className={`p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-[#4A0E22] text-[#FFF8E7]'
                  : 'hover:bg-[#E8D8C3]/60 text-[#4A0E22]'
              }`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link with Badge */}
            <Link
              to="/dashboard/wishlist"
              aria-label="Wishlist"
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-[#4A0E22] text-[#FFF8E7]'
                  : 'hover:bg-[#E8D8C3]/60 text-[#4A0E22]'
              }`}
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#2E5A36] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Open Shopping Cart"
              className={`relative p-2 rounded-full transition-colors ${
                isScrolled
                  ? 'hover:bg-[#4A0E22] text-[#FFF8E7]'
                  : 'hover:bg-[#E8D8C3]/60 text-[#4A0E22]'
              }`}
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5C162E] text-[#FFF8E7] text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow border border-[#FFF8E7]">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* User Profile or Login CTA */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className={`flex items-center gap-2 p-1.5 rounded-full border transition-all ${
                    isScrolled
                      ? 'border-[#FFF8E7]/40 hover:bg-[#4A0E22]'
                      : 'border-[#D8C3A5] hover:bg-[#E8D8C3]/50'
                  }`}
                >
                  <img
                    src={user.photoURL || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'}
                    alt={user.displayName || 'User Avatar'}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <ChevronDown className="w-4 h-4 hidden sm:block" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div 
                    onClick={() => setProfileDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 border border-[#E8D8C3] text-gray-800 z-50 animate-in fade-in slide-in-from-top-2"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-bold text-[#4A0E22] truncate">{user.displayName || 'Customer'}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      <span className={`inline-block mt-1 text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        isAdmin ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'
                      }`}>
                        {isAdmin ? 'Store Admin' : 'Customer'}
                      </span>
                    </div>

                    {isAdmin ? (
                      <Link
                        to="/admin/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4A0E22] hover:bg-[#FFF8E7] transition-colors"
                      >
                        <ShieldCheck className="w-4 h-4 text-[#5C162E]" />
                        <span>Admin Dashboard</span>
                      </Link>
                    ) : (
                      <Link
                        to="/dashboard"
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4A0E22] hover:bg-[#FFF8E7] transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#2E5A36]" />
                        <span>My Account</span>
                      </Link>
                    )}

                    <Link
                      to="/dashboard/my-orders"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-[#4A0E22] hover:bg-[#FFF8E7] transition-colors"
                    >
                      <PackageCheck className="w-4 h-4 text-[#2E5A36]" />
                      <span>My Orders</span>
                    </Link>

                    <button
                      onClick={logoutUser}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-100 mt-1"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`text-xs sm:text-sm font-semibold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg transition-all ${
                    isScrolled
                      ? 'bg-[#FFF8E7] text-[#5C162E] hover:bg-white shadow'
                      : 'bg-[#5C162E] text-[#FFF8E7] hover:bg-[#4A0E22] shadow'
                  }`}
                >
                  Sign In
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-[#E8D8C3]/30 pb-2 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-lg text-base font-medium hover:bg-white/10"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
