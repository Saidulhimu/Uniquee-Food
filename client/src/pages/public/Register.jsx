import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
import { Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState('');

  const { registerUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  // Validate password as specified in document:
  // "কমপক্ষে ৬ অক্ষর, একটি বড় হাতের অক্ষর (Uppercase) এবং একটি ছোট হাতের অক্ষর (Lowercase) ভ্যালিডেশন থাকবে"
  const validatePassword = (pass) => {
    if (pass.length < 6) {
      return 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(pass)) {
      return 'Password must contain at least one uppercase letter (A-Z).';
    }
    if (!/[a-z]/.test(pass)) {
      return 'Password must contain at least one lowercase letter (a-z).';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validatePassword(password);
    if (error) {
      setValidationError(error);
      toast.error(error);
      return;
    }
    setValidationError('');
    setLoading(true);

    try {
      await registerUser(email, password, name);
      toast.success('Account created successfully! Welcome to Uniquee Food.');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
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
              Join Uniquee Food
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Pure Food, Pure Life — start eating chemical-free today
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4A0E22] mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Saidul Himu"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>
            </div>

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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationError(validatePassword(e.target.value));
                  }}
                  placeholder="At least 6 chars with Uppercase & Lowercase"
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FFF8E7]/40 border border-[#D8C3A5] rounded-xl text-sm focus:outline-none focus:border-[#5C162E]"
                />
              </div>

              {/* Password requirement hints */}
              <div className="mt-2 space-y-1 text-[11px]">
                <div className={`flex items-center gap-1.5 ${password.length >= 6 ? 'text-[#2E5A36]' : 'text-gray-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>At least 6 characters</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[A-Z]/.test(password) ? 'text-[#2E5A36]' : 'text-gray-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>At least one uppercase letter (A-Z)</span>
                </div>
                <div className={`flex items-center gap-1.5 ${/[a-z]/.test(password) ? 'text-[#2E5A36]' : 'text-gray-400'}`}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>At least one lowercase letter (a-z)</span>
                </div>
              </div>

              {validationError && (
                <p className="text-xs text-red-500 mt-2 font-medium">{validationError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || Boolean(validationError && password)}
              className="w-full py-3 bg-[#5C162E] hover:bg-[#4A0E22] text-[#FFF8E7] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Register Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center text-xs text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-[#5C162E] hover:underline">
              Sign In
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
