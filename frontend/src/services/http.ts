import { API_BASE_URL, API_CONFIG } from './config';
import { ApiError } from './error-handling';
import { getRefreshToken, getStoredToken, storeRefreshToken, storeToken, clearToken } from './token';

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
  auth?: boolean;
  _retried?: boolean;
}

let refreshInFlight: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return null;
  }

  if (!refreshInFlight) {
    refreshInFlight = (async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
          signal: AbortSignal.timeout(API_CONFIG.timeout),
        });
        if (!response.ok) {
          return null;
        }
        const payload = (await response.json()) as { access_token?: string; refresh_token?: string };
        if (!payload.access_token) {
          return null;
        }
        storeToken(payload.access_token);
        if (payload.refresh_token) {
          storeRefreshToken(payload.refresh_token);
        }
        return payload.access_token;
      } catch {
        return null;
      } finally {
        refreshInFlight = null;
      }
    })();
  }

  return refreshInFlight;
}

function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) {
    return error;
  }
  if (error instanceof DOMException && error.name === 'AbortError') {
    return new ApiError('Request timed out.', undefined, 'TIMEOUT');
  }
  if (error instanceof TypeError) {
    return new ApiError('Network error. Please check your connection.', undefined, 'NETWORK');
  }
  if (error instanceof Error) {
    return new ApiError(error.message, undefined, 'NETWORK');
  }
  return new ApiError('An unexpected error occurred', undefined, 'UNKNOWN');
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = false, headers: initHeaders, signal, _retried, ...rest } = options;
  const headers = new Headers(initHeaders);

  if (body !== undefined && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (auth) {
    const token = getStoredToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
  }

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...rest,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: signal ?? AbortSignal.timeout(API_CONFIG.timeout),
    });
  } catch (error) {
    throw toApiError(error);
  }

  if (response.status === 401 && auth && !_retried && path !== '/auth/refresh') {
    const nextToken = await refreshAccessToken();
    if (nextToken) {
      return apiRequest<T>(path, { ...options, _retried: true });
    }
    clearToken();
  }

  if (!response.ok) {
    let message = response.statusText;
    try {
      const payload = (await response.json()) as { message?: string | string[] };
      message = Array.isArray(payload.message) ? payload.message.join(', ') : payload.message || message;
    } catch {
      // keep status text
    }
    const code = response.status === 401 ? 'UNAUTHORIZED' : response.status >= 500 ? 'SERVER' : undefined;
    throw new ApiError(message || `Request failed (${response.status})`, response.status, code);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}
