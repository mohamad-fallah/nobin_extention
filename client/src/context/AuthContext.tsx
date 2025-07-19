import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { User, LoginData, RegisterData, ChangePasswordData } from "../services/authService";
import authService from "../services/authService";

// Helper to safely extract error message
const getErrorMessage = (error: unknown, fallback: string): string => {
  if (error && typeof error === "object" && "response" in error) {
    const response = (error as { response?: { data?: { message?: string } } }).response;
    return response?.data?.message || fallback;
  }
  return fallback;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<{ success: boolean; message: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  changePassword: (data: ChangePasswordData) => Promise<{ success: boolean; message: string }>;
  updateProfile: (data: {
    username?: string;
    avatar?: string;
  }) => Promise<{ success: boolean; message: string }>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user is stored in localStorage
        const storedUser = authService.getCurrentUser();
        const isAuthenticated = authService.isAuthenticated();

        if (isAuthenticated && storedUser) {
          // Verify with server
          const profileResponse = await authService.getProfile();
          if (profileResponse.success && profileResponse.data?.user) {
            setUser(profileResponse.data.user);
          } else {
            // Clear invalid data
            await authService.logout();
          }
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);
        await authService.logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (data: LoginData): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authService.login(data);
      if (response.success) {
        setUser(response.data.user);
      }
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error, "خطا در ورود به حساب کاربری"),
      };
    }
  };

  const register = async (data: RegisterData): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authService.register(data);
      if (response.success) {
        setUser(response.data.user);
      }
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error, "خطا در ثبت‌نام"),
      };
    }
  };

  const logout = async (): Promise<void> => {
    await authService.logout();
    setUser(null);
  };

  const changePassword = async (
    data: ChangePasswordData,
  ): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authService.changePassword(data);
      return response;
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error, "خطا در تغییر رمز عبور"),
      };
    }
  };

  const updateProfile = async (data: {
    username?: string;
    avatar?: string;
  }): Promise<{ success: boolean; message: string }> => {
    try {
      const response = await authService.updateProfile(data);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      }
      return {
        success: response.success,
        message: response.message,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error, "خطا در به‌روزرسانی پروفایل"),
      };
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    changePassword,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
