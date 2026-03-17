import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { mockUsers } from '@/lib/mockData';

const AuthContext = createContext(undefined);

// Simple fake token generator
const createFakeToken = (user) => `mock-token-${user.id}-${Date.now()}`;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        // In this mock setup, we trust localStorage
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    // Simulate network delay
    await new Promise((res) => setTimeout(res, 300));

    const found = mockUsers.find((u) => u.email === email && u.password === password);
    if (found) {
      const token = createFakeToken(found);
      const userData = { id: found.id, name: found.name, email: found.email, role: found.role, department: found.department };
      setUser(userData);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setLoading(false);
      return { success: true, user: userData, token };
    }

    setLoading(false);
    return { success: false, message: 'Invalid credentials' };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const switchRole = useCallback(async (email, password) => {
    // For demo, just call login again
    return login(email, password);
  }, [login]);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
      loading,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};