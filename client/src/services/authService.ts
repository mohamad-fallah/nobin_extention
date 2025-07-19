import apiClient from "./apiClient";

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "admin" | "user" | "vip";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      tokenType: string;
    };
  };
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

class AuthService {
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", data);

    if (response.data.success) {
      const { user, tokens } = response.data.data;

      // Store tokens and user data
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/register", data);

    if (response.data.success) {
      const { user, tokens } = response.data.data;

      // Store tokens and user data
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  }

  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error: unknown) {
      console.warn("Logout request failed:", error);
    } finally {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
    }
  }

  async getProfile(): Promise<{ success: boolean; data?: { user: User } }> {
    try {
      const response = await apiClient.get("/auth/profile");
      return response.data;
    } catch {
      return { success: false };
    }
  }

  async changePassword(data: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    const response = await apiClient.put("/auth/change-password", data);
    return response.data;
  }

  async updateProfile(data: {
    username?: string;
    avatar?: string;
  }): Promise<{ success: boolean; message: string; data?: { user: User } }> {
    const response = await apiClient.put("/auth/profile", data);

    if (response.data.success && response.data.data?.user) {
      // Update stored user data
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }

    return response.data;
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem("accessToken") && !!this.getCurrentUser();
  }

  getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
  }
}

export const authService = new AuthService();
export default authService;
