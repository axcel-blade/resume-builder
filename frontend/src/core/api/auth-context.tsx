import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import {
  login as loginRequest,
  register as registerRequest,
  getProfile as fetchAuthProfile,
  logout as logoutRequest,
  type AuthResponse,
  type LoginData,
  type RegisterData,
} from './auth';
import { clearToken, getStoredToken, storeToken } from './user';
import { isApiError } from './error-handling';
import type { User as UserType } from '../types/user';

interface AuthContextType {
  user: UserType | null;
  token: string | null;
  login: (data: LoginData) => Promise<AuthResponse>;
  register: (data: RegisterData) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function initializeAuth() {
      const storedToken = getStoredToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      setToken(storedToken);
      try {
        setUser(await fetchAuthProfile(storedToken));
      } catch {
        clearToken();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    void initializeAuth();
  }, []);

  const login = async (data: LoginData): Promise<AuthResponse> => {
    try {
      const response = await loginRequest(data);
      if (response.access_token) {
        storeToken(response.access_token);
        setToken(response.access_token);
        setUser(await fetchAuthProfile(response.access_token));
      }
      return response;
    } catch (error: unknown) {
      throw new Error(isApiError(error) ? error.message : 'Login failed');
    }
  };

  const register = async (data: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await registerRequest(data);
      if (response.access_token) {
        storeToken(response.access_token);
        setToken(response.access_token);
        setUser(await fetchAuthProfile(response.access_token));
      }
      return response;
    } catch (error: unknown) {
      throw new Error(isApiError(error) ? error.message : 'Registration failed');
    }
  };

  const logout = async (): Promise<void> => {
    await logoutRequest();
    clearToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: Boolean(token && user),
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default useAuth;
