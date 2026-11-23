import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import toast from 'react-hot-toast';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginUser, loginWithGoogle, loginAsDemo } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(email, password);
      toast.success('Welcome back to Uniquee Food!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Signed in with Google successfully!');
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Google sign-in failed');
    }
  };

  const handleDemoLogin = (role) => {
    if (role === 'admin') {
      setEmail('saidulhimuu@gmail.com');
      setPassword('Himel12345');
    } else {
      setEmail('customer@uniqueefood.com');
      setPassword('Customer123');
    }
    loginAsDemo(role);
    toast.success(`Logged in as ${role === 'admin' ? 'Saidul Himu (Store Admin)' : 'Customer'}!`);
    if (role === 'admin') {
      navigate('/admin/dashboard');
    } else {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFF8E7] min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        
        <div className="bg-white rounded-3xl border border-[#D8C3A5] p-8 shadow-xl">
          <div className="text-center mb-8">
            <Link to="/" className="inline-block">
              <img
                src="/assets/logo.jpg"
                alt="Uniquee Food"
                className="h-14 w-auto rounded-xl shadow-sm mx-auto object-cover"
              />
            </Link>
            <h1 className="font-serif text-2xl font-bold text-[#4A0E22] mt-3">
              Welcome Back
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Sign in to manage your pure organic food orders
            </p>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="mb-6 p-3 bg-[#FFF8E7] rounded-2xl border border-[#E8D8C3]">
            <p className="text-[11px] font-bold text-[#5C162E] text-center mb-2 uppercase tracking-wider">
              ⚡ Instant Evaluation / Demo Access:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoLogin('admin')}
                className="py-2 px-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Admin Login</span>
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('user')}
                className="py-2 px-3 bg-[#2E5A36] hover:bg-emerald-800 text-[#FFF8E7] rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>Customer Login</span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A0E22] mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4A0E22] mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Social Sign In */}
          <div className="mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-[#5C162E] hover:underline">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
