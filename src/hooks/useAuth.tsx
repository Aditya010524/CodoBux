import React, { createContext, useContext, useEffect, useState } from 'react';
import { API_ENDPOINTS } from '../api/apiConfig';
import apiService from '../api/apiServices';
import { clearToken, getToken, saveToken } from '../utils/TokenStorage';
import { useUserStore } from '../store/auth_store';

interface AuthContextType {
  isLoggedIn: boolean;
  loading: boolean;
  registerUser: (name: string, email: string, password: string) => Promise<any>;
  loginUser: (email: string, password: string) => Promise<any>;
  fetchProfile: () => Promise<any>;
  logOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // 🔥 CHECK TOKEN ON APP START
  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();
      console.log('STORED TOKEN =>', token, typeof token);
      setIsLoggedIn(!!token);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const registerUser = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const response = await apiService.post(API_ENDPOINTS.REGISTER, {
      name,
      email,
      password,
    });
    console.log("signup", response)
    return response.data;
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const response = await apiService.post(API_ENDPOINTS.LOGIN, {
        email,
        password,
      });

      console.log('LOGIN RESPONSE =>', response.data);

      const token = response.data?.data?.token;
      console.log("const token is : ", token , typeof token )
      const user = response.data?.data;

      console.log('TOKEN TYPE =>', typeof token);
      // 1️⃣ Save token securely
      if (typeof token === 'string') {
        await saveToken(token);
        setIsLoggedIn(true);
      } else {
        console.log('❌ TOKEN IS NOT STRING');
      }
      // 2️⃣ Save user in Zustand
      if (user) {
        useUserStore.getState().setUser({
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        });

        console.log('USER SAVED IN ZUSTAND ✅');
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchProfile = async () => {
    const response = await apiService.get(API_ENDPOINTS.USER_PROFILE);
    return response.data;
  };

  const logOut = async () => {
    await clearToken(); // remove token
    useUserStore.getState().clearUser(); // remove user
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        loading,
        registerUser,
        loginUser,
        fetchProfile,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
