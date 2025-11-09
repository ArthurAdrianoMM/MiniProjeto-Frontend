import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { apiService } from '../services/api';
import { storage } from '../utils/storage';
import type { User, LoginRequest, RegisterRequest } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = storage.getUser();
      const token = storage.getToken();

      if (storedUser && token) {
        try {
          // Verify token is still valid
          await apiService.testProtected();
          setUser(storedUser);
        } catch (error) {
          // Token is invalid, clear storage
          storage.clear();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (data: LoginRequest) => {
    const response = await apiService.login(data);
    storage.setToken(response.token);
    storage.setUser(response.user);
    setUser(response.user);
  };

  const register = async (data: RegisterRequest) => {
    await apiService.register(data);
    // After registration, automatically login
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    storage.clear();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
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

