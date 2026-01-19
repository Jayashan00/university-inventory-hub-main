import React, { createContext, useContext, useState, useCallback } from 'react';
import { mockUsers } from '@/lib/mockData';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = useCallback(async (email, password) => {
    // Mock authentication - in production, this would call an API
    const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (foundUser && password.length >= 4) {
      setUser({ ...foundUser, lastLogin: new Date() });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role) => {
    const userWithRole = mockUsers.find(u => u.role === role);
    if (userWithRole) {
      setUser({ ...userWithRole, lastLogin: new Date() });
    }
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
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