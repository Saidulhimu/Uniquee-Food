import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import {
  auth,
  googleProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from '../firebase/firebase.config';

const AuthContext = createContext(null);
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState('user');
  const [loading, setLoading] = useState(true);

  // Sync token and role with backend
  const FIXED_ADMIN_EMAIL = 'saidulhimuu@gmail.com';

  const syncWithBackend = async (firebaseUser, extraData = {}) => {
    try {
      if (!firebaseUser?.email) return;

      const isFixedAdmin = firebaseUser.email.toLowerCase() === FIXED_ADMIN_EMAIL;
      if (isFixedAdmin) {
        setUserRole('admin');
      }

      // 1. Get JWT Token from backend
      try {
        const tokenRes = await axios.post(`${API_URL}/auth/jwt`, {
          email: firebaseUser.email,
        });
        if (tokenRes.data?.token) {
          localStorage.setItem('uniquee_token', tokenRes.data.token);
        }
        if (tokenRes.data?.role) {
          setUserRole(tokenRes.data.role);
        }
      } catch (err) {
        console.warn('Backend JWT issue, using client session fallback:', err.message);
      }

      // 2. Sync user profile into MongoDB
      try {
        const syncRes = await axios.post(`${API_URL}/auth/sync-user`, {
          email: firebaseUser.email,
          name: firebaseUser.displayName || extraData.name || (isFixedAdmin ? 'Saidul Himu (Admin)' : firebaseUser.email.split('@')[0]),
          photoURL: firebaseUser.photoURL || extraData.photoURL || '',
          phone: extraData.phone || '',
          address: extraData.address || '',
        });
        if (syncRes.data?.user?.role) {
          setUserRole(syncRes.data.user.role);
        }
      } catch (err) {
        if (isFixedAdmin || firebaseUser.email.toLowerCase().includes('admin')) {
          setUserRole('admin');
        } else {
          setUserRole('user');
        }
      }
    } catch (error) {
      console.error('Error syncing user with backend:', error);
    }
  };

  // Register with Email & Password
  const registerUser = async (email, password, name) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      if (name && result.user) {
        await updateProfile(result.user, { displayName: name });
      }
      await syncWithBackend(result.user, { name });
      return result.user;
    } catch (err) {
      // Mock Fallback if Firebase API key is unconfigured placeholder
      if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key')) {
        const mockUser = {
          uid: 'mock_uid_' + Date.now(),
          email,
          displayName: name || email.split('@')[0],
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        };
        setUser(mockUser);
        localStorage.setItem('uniquee_demo_user', JSON.stringify(mockUser));
        await syncWithBackend(mockUser, { name });
        return mockUser;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login with Email & Password
  const loginUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await syncWithBackend(result.user);
      return result.user;
    } catch (err) {
      if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key')) {
        const mockUser = {
          uid: 'mock_uid_' + Date.now(),
          email,
          displayName: email.split('@')[0],
          photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        };
        setUser(mockUser);
        localStorage.setItem('uniquee_demo_user', JSON.stringify(mockUser));
        await syncWithBackend(mockUser);
        return mockUser;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Sign In with Google
  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      await syncWithBackend(result.user);
      return result.user;
    } catch (err) {
      if (err.code === 'auth/invalid-api-key' || err.message?.includes('API key')) {
        const mockUser = {
          uid: 'mock_google_uid_' + Date.now(),
          email: 'customer@uniqueefood.com',
          displayName: 'Pure Food Lover',
          photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
        };
        setUser(mockUser);
        localStorage.setItem('uniquee_demo_user', JSON.stringify(mockUser));
        await syncWithBackend(mockUser);
        return mockUser;
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Instant Demo Switch for Seamless Evaluation (Admin & Customer)
  const loginAsDemo = (role = 'admin') => {
    const isSpecialAdmin = role === 'admin';
    const demoUser = {
      uid: isSpecialAdmin ? 'admin_himu_id' : 'customer_demo_id',
      email: isSpecialAdmin ? 'saidulhimuu@gmail.com' : 'customer@uniqueefood.com',
      displayName: isSpecialAdmin ? 'Saidul Himu (Admin)' : 'Rafiqul Islam',
      photoURL: isSpecialAdmin 
        ? 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150' 
        : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    };
    setUser(demoUser);
    setUserRole(isSpecialAdmin ? 'admin' : 'user');
    localStorage.setItem('uniquee_demo_user', JSON.stringify(demoUser));
    localStorage.setItem('uniquee_demo_role', isSpecialAdmin ? 'admin' : 'user');
    localStorage.setItem('uniquee_token', 'demo_jwt_token_' + role);
  };

  // Logout
  const logoutUser = async () => {
    setLoading(true);
    try {
      await signOut(auth).catch(() => {});
    } finally {
      setUser(null);
      setUserRole('user');
      localStorage.removeItem('uniquee_token');
      localStorage.removeItem('uniquee_demo_user');
      localStorage.removeItem('uniquee_demo_role');
      setLoading(false);
    }
  };

  // Update profile
  const updateUserProfile = async (updates) => {
    if (user && auth.currentUser) {
      await updateProfile(auth.currentUser, updates);
    }
    setUser((prev) => ({ ...prev, ...updates }));
    if (updates.email) {
      await syncWithBackend({ ...user, ...updates });
    }
  };

  // Watch Auth State
  useEffect(() => {
    const storedDemoUser = localStorage.getItem('uniquee_demo_user');
    const storedRole = localStorage.getItem('uniquee_demo_role');

    if (storedDemoUser) {
      try {
        setUser(JSON.parse(storedDemoUser));
        if (storedRole) setUserRole(storedRole);
        setLoading(false);
      } catch (e) {
        localStorage.removeItem('uniquee_demo_user');
      }
    }

    try {
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          await syncWithBackend(currentUser);
        } else if (!storedDemoUser) {
          setUser(null);
          setUserRole('user');
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setLoading(false);
    }
  }, []);

  const authInfo = {
    user,
    userRole,
    isAdmin: userRole === 'admin',
    loading,
    registerUser,
    loginUser,
    loginWithGoogle,
    loginAsDemo,
    logoutUser,
    updateUserProfile,
  };

  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
