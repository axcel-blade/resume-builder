import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    authService = new AuthService();
  });

  describe('register', () => {
    it('registers a user and returns a JWT', async () => {
      const result = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      expect(result.message).toBe('Registration successful');
      expect(result.userId).toEqual(expect.any(String));
      expect(result.access_token).toEqual(expect.any(String));
    });

    it('rejects a duplicate email', async () => {
      await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      await expect(
        authService.register({
          email: 'test@example.com',
          password: 'other-password',
          name: 'Other',
        }),
      ).rejects.toBeInstanceOf(ConflictException);
    });

    it('stores a hashed password', async () => {
      await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      const storedUser = (authService as any).users.get('test@example.com');
      expect(storedUser.password).not.toBe('password123');
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
    });

    it('returns a JWT for valid credentials', async () => {
      const result = await authService.login({
        email: 'test@example.com',
        password: 'password123',
      });

      expect(result.message).toBe('Login successful');
      expect(result.access_token).toEqual(expect.any(String));
    });

    it('rejects unknown emails', async () => {
      await expect(
        authService.login({
          email: 'missing@example.com',
          password: 'password123',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects the wrong password', async () => {
      await expect(
        authService.login({
          email: 'test@example.com',
          password: 'wrongPassword',
        }),
      ).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });

  describe('getMe', () => {
    it('returns the current user for a valid token', async () => {
      const { access_token } = await authService.register({
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });

      const result = await authService.getMe(`Bearer ${access_token}`);

      expect(result.email).toBe('test@example.com');
      expect(result.name).toBe('Test User');
    });

    it('rejects a missing token', async () => {
      await expect(authService.getMe()).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('rejects an invalid token', async () => {
      await expect(authService.getMe('not-a-token')).rejects.toBeInstanceOf(UnauthorizedException);
    });
  });
});
