import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authApi, userApi } from '../services/api';
import type { UserProfileResponse, LoginRequest, RegisterRequest } from '../types';

interface AuthContextType {
  user: UserProfileResponse | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const profile = await userApi.getProfile();
      setUser(profile);
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);
    if (response.profile) {
      setUser(response.profile);
    } else {
      // If profile not in response, fetch it
      await refreshUser();
    }
  };

  const register = async (data: RegisterRequest) => {
    const response = await authApi.register(data);
    if (response.profile) {
      setUser(response.profile);
    } else {
      await refreshUser();
    }
  };

  const logout = async () => {
    await authApi.logout();
    setUser(null);
  };

  const refreshUser = async () => {
    try {
      const profile = await userApi.getProfile();
      setUser(profile);
    } catch (error) {
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};




