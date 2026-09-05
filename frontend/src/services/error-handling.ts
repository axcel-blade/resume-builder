/**
 * Error Handling Utilities for API calls
 */

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number,
    public readonly code?: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

/**
 * Generic error handler that parses API responses
 */
export async function handleApiError(error: unknown): Promise<never> {
  const isNetworkError = typeof error === 'object' && 
    error !== null && 
    'cause' in error;
  
  if (isNetworkError) {
    throw new ApiError('Network error. Please check your connection.', undefined, 'NETWORK');
  }
  
  if (error instanceof Error) {
    // Check for API-specific errors
    if ('message' in error && typeof error.message === 'string') {
      const errorMsg: Record<string, string> = {};
      
      try {
        errorMsg.message = JSON.parse(error.message).message;
      } catch {
        errorMsg.message = error.message;
      }
      
      const status = typeof (error as ApiError).status === 'number' ? (error as ApiError).status : undefined;
      const code = (error as any).code || undefined;
      const details = (error as any).details || undefined;
      
      throw new ApiError(errorMsg.message, status, code, details);
    }
    
    // Generic error
    throw new ApiError(error.message || 'An unexpected error occurred');
  }
  
  throw new ApiError('An unexpected error occurred');
}

/**
 * Retry configuration for failed API calls
 */
export interface RetryConfig {
  maxRetries?: number;
  delayMs?: number;
  retryableStatusCodes?: number[];
}

export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  config: RetryConfig = {}
): Promise<T> {
  const { maxRetries = 3, delayMs = 1000, retryableStatusCodes = [408, 429, 500, 502, 503, 504] } = config;
  
  let lastError: unknown = null;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      const apiErr = error instanceof ApiError ? error : undefined;
      
      // Check if this error is retryable
      if (!apiErr || 
          !retryableStatusCodes.includes(apiErr.status as number)) {
        throw error;
      }
      
      lastError = error;
      
      if (attempt < maxRetries) {
        const delay = delayMs * Math.pow(2, attempt); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError as unknown;
}

/**
 * Format error messages for UI display
 */
export function formatErrorMessage(error: unknown): string {
  try {
    if (error instanceof ApiError) {
      if (error.code === 'NETWORK') {
        return 'Network error. Please check your connection.';
      }
      if (error.status === 401 || error.code === 'UNAUTHORIZED') {
        return 'Your session expired. Please log in again.';
      }
      if ((error.status ?? 0) >= 500 || error.code === 'SERVER') {
        return 'The server is unavailable. Try again later.';
      }
      return error.message || 'An error occurred';
    }
    
    if (typeof error === 'object' && error !== null) {
      const err = error as Record<string, unknown>;
      if ('message' in err && typeof err.message === 'string') {
        return err.message;
      }
      
      if ('error' in err && typeof err.error === 'string') {
        return err.error;
      }
    }
  } catch {}
  
  return 'An unexpected error occurred';
}