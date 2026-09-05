import { apiRequest } from './http';
import type { User as UserType } from '../types/user';

export interface AuthResponse {
  message: string;
  userId: string;
  access_token: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export function register(data: RegisterData): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/register', {
    method: 'POST',
    body: data,
  });
}

export function login(data: LoginData): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/auth/login', {
    method: 'POST',
    body: data,
  });
}

export function getProfile(token?: string): Promise<UserType> {
  return apiRequest<UserType>('/auth/me', {
    method: 'GET',
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
    auth: !token,
  });
}

export async function logout(): Promise<void> {
  sessionStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token');
}
