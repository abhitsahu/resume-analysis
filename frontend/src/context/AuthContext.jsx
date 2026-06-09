import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  // Load user on mount if token exists
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const { user: userData } = await authService.getProfile();
          setUser(userData);
        } catch (err) {
          console.error('Failed to load user:', err);
          logout();
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = useCallback(async (credentials) => {
    const { user: userData, token: newToken } = await authService.login(credentials);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
    return userData;
  }, []);

  const register = useCallback(async (userData) => {
    const { user: newUser, token: newToken } = await authService.register(userData);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    return newUser;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
    localStorage.setItem('user', JSON.stringify({ ...user, ...updatedData }));
  }, [user]);

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token && !!user,
    login,
    register,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
