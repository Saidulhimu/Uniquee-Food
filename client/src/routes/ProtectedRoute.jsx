import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-[#FFF8E7]">
        <div className="w-12 h-12 border-4 border-[#D8C3A5] border-t-[#5C162E] rounded-full animate-spin"></div>
        <p className="mt-4 text-[#5C162E] font-medium tracking-wide">Loading Uniquee Food...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
