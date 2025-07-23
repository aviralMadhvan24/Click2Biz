import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const decodeJWT = (token) => {
  if (!token) return null;

  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('JWT decoding error:', e);
    return null;
  }
};

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('paymentStatus'); // clear payment too if needed
    navigate('/login');
  }, [navigate]);

  const login = useCallback((userData, authToken) => {
    if (!userData || !authToken) {
      console.error('Invalid login parameters');
      return;
    }

    setUser(userData);
    setToken(authToken);
    localStorage.setItem('token', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = JSON.parse(localStorage.getItem('user'));

        if (storedToken && storedUser) {
          const decoded = decodeJWT(storedToken);
          if (decoded && decoded.exp * 1000 > Date.now()) {
            setToken(storedToken);
            setUser(storedUser);
          } else {
            logout();
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error.message);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [logout]);

  // Active expiry checker (optional)
  useEffect(() => {
    if (!token) return;

    const checkTokenExpiration = () => {
      const decoded = decodeJWT(token);
      if (decoded && decoded.exp * 1000 < Date.now()) {
        logout();
        toast.error('Your session expired. Please log in again.');
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000);
    return () => clearInterval(interval);
  }, [token, logout]);

  const value = {
    user,
    token,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
