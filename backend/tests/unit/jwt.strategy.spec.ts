jest.mock(
  'passport-jwt',
  () => ({
    ExtractJwt: {
      fromAuthHeaderAsBearerToken: jest.fn(() => jest.fn()),
    },
    Strategy: class Strategy {
      constructor(_options: unknown) {}
    },
  }),
  { virtual: true },
);

jest.mock(
  '@nestjs/passport',
  () => ({
    PassportStrategy: (Base: new (...args: unknown[]) => object) => Base,
    AuthGuard: () => class AuthGuard {},
  }),
  { virtual: true },
);

import { UnauthorizedException } from '@nestjs/common';
import { JwtStrategy } from '../../src/auth/jwt.strategy';

describe('JwtStrategy', () => {
  const originalSecret = process.env.JWT_SECRET;

  afterEach(() => {
    process.env.JWT_SECRET = originalSecret;
  });

  it('returns the subject id from a valid payload', async () => {
    const strategy = new JwtStrategy();
    await expect(strategy.validate({ sub: 'user-42', email: 'a@b.com' })).resolves.toEqual({
      id: 'user-42',
      email: 'a@b.com',
    });
  });

  it('rejects a payload without a subject', async () => {
    const strategy = new JwtStrategy();
    await expect(strategy.validate({})).rejects.toBeInstanceOf(UnauthorizedException);
  });
});
