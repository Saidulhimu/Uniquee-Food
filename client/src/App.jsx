import React, { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import WhatsAppButton from './components/shared/WhatsAppButton';
import CartDrawer from './components/shared/CartDrawer';
import SearchModal from './components/shared/SearchModal';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';

// Public Pages
import Home from './pages/public/Home';
import AllFoods from './pages/public/AllFoods';
import FoodDetails from './pages/public/FoodDetails';
import CartPage from './pages/public/CartPage';
import AboutPage from './pages/public/AboutPage';
import ContactPage from './pages/public/ContactPage';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import CheckoutPage from './pages/public/CheckoutPage';
import PaymentSuccess from './pages/public/PaymentSuccess';
import PaymentCancel from './pages/public/PaymentCancel';

// Customer Pages
import CustomerOverview from './pages/customer/CustomerOverview';
import MyOrders from './pages/customer/MyOrders';
import WishlistPage from './pages/customer/WishlistPage';
import ProfilePage from './pages/customer/ProfilePage';

// Admin Pages
import AdminOverview from './pages/admin/AdminOverview';
import AddProduct from './pages/admin/AddProduct';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageUsers from './pages/admin/ManageUsers';
import Transactions from './pages/admin/Transactions';

export function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Scroll to top on route navigation
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFF8E7] text-[#4A0E22]">
      {/* Dynamic Global Navbar */}
      <Navbar onOpenSearch={() => setIsSearchOpen(true)} />

      {/* Main Body */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/foods" element={<AllFoods />} />
          <Route path="/food/:id" element={<FoodDetails />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Checkout & Payment Routes */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />

          {/* Customer Dashboard Private Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <CustomerOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/wishlist"
            element={
              <ProtectedRoute>
                <WishlistPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* Admin Dashboard Private Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminOverview />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/add-product"
            element={
              <AdminRoute>
                <AddProduct />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-products"
            element={
              <AdminRoute>
                <ManageProducts />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-orders"
            element={
              <AdminRoute>
                <ManageOrders />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/manage-users"
            element={
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/transactions"
            element={
              <AdminRoute>
                <Transactions />
              </AdminRoute>
            }
          />

          {/* Catch-all 404 */}
          <Route
            path="*"
            element={
              <div className="pt-40 pb-28 text-center bg-[#FFF8E7]">
                <h1 className="font-serif text-5xl font-extrabold text-[#5C162E]">404</h1>
                <p className="text-sm text-gray-600 mt-2">The organic grocery page you are looking for does not exist.</p>
                <a href="/" className="mt-6 inline-block px-6 py-3 bg-[#5C162E] text-white rounded-xl text-xs font-bold">
                  Return Home
                </a>
              </div>
            }
          />
        </Routes>
      </div>

      {/* Floating Global Widgets */}
      <WhatsAppButton />
      <CartDrawer />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
