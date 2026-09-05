const ACCESS_KEY = 'auth_token';
const REFRESH_KEY = 'refresh_token';

export function storeToken(token: string | null): void {
  if (!token) {
    return;
  }
  sessionStorage.setItem(ACCESS_KEY, token);
}

export function getStoredToken(): string | null {
  return sessionStorage.getItem(ACCESS_KEY);
}

export function storeRefreshToken(token: string | null): void {
  if (!token) {
    return;
  }
  sessionStorage.setItem(REFRESH_KEY, token);
}

export function getRefreshToken(): string | null {
  return sessionStorage.getItem(REFRESH_KEY);
}

export function clearToken(): void {
  sessionStorage.removeItem(ACCESS_KEY);
  sessionStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getStoredToken());
}
