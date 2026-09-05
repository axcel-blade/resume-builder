import { apiRequest } from './http';
import type { ResumeProfileData } from '../types/user';

const TOKEN_KEY = 'auth_token';

export function storeToken(token: string | null): void {
  if (!token) {
    return;
  }
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getStoredToken(): string | null {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function clearToken(): void {
  sessionStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}

export function uploadProfile(profile: ResumeProfileData): Promise<unknown> {
  return apiRequest('/users/profile', {
    method: 'POST',
    body: profile,
    auth: true,
  });
}

export function getProfile(): Promise<ResumeProfileData | null> {
  return apiRequest<ResumeProfileData>('/users/profile', {
    method: 'GET',
    auth: true,
  });
}

export function deleteProfile(): Promise<void> {
  return apiRequest('/users/profile', {
    method: 'DELETE',
    auth: true,
  });
}
