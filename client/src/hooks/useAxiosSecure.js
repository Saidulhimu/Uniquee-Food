import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosSecure = axios.create({
  baseURL: API_URL,
});

export const useAxiosSecure = () => {
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('uniquee_token');
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response ? error.response.status : null;
      if (status === 401 || status === 403) {
        console.warn('Unauthorized or Forbidden access detected. Logging out.');
        await logoutUser();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default axiosSecure;
