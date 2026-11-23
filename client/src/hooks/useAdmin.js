import { useAuth } from '../providers/AuthProvider';

export const useAdmin = () => {
  const { user, userRole, loading } = useAuth();
  const isAdmin = Boolean(user && userRole === 'admin');
  return { isAdmin, isAdminLoading: loading };
};
