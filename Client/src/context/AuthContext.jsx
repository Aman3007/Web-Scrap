import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { USER_KEY } from '../constants';
import { authApi } from '../api';
import toast from 'react-hot-toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const saveSession = useCallback((userData) => {
    setUser(userData);
    localStorage.setItem(USER_KEY, JSON.stringify(userData));
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  
  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data } = await authApi.getMe();
        if (data?.data?.user) {
          saveSession(data.data.user);
        } else {
          clearSession();
        }
      } catch (err) {
        
        clearSession();
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, [saveSession, clearSession]);

  const register = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { data } = await authApi.register(formData);
      saveSession(data.data.user);
      toast.success('Account created! Welcome 🎉');
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const login = useCallback(async (formData) => {
    setLoading(true);
    try {
      const { data } = await authApi.login(formData);
      saveSession(data.data.user);
      toast.success(`Welcome back, ${data.data.user.name}! 👋`);
      return { success: true };
    } catch (err) {
      toast.error(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, [saveSession]);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await authApi.logout();
      clearSession();
      queryClient.clear(); 
      toast.success('Logged out successfully.');
    } catch (err) {
      toast.error('Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [clearSession, queryClient]);

  
  const updateUserBookmarks = useCallback((bookmarks) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, bookmarks };
      localStorage.setItem(USER_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, register, login, logout, updateUserBookmarks }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
