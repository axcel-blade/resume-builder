import { validate } from 'class-validator';
import { LoginDto } from '../../src/auth/dto/login.dto';
import { RegisterDto } from '../../src/auth/dto/register.dto';

describe('LoginDto', () => {
  it('accepts a valid email and password', async () => {
    const dto = Object.assign(new LoginDto(), {
      email: 'test@example.com',
      password: 'password123',
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('rejects an empty email', async () => {
    const dto = Object.assign(new LoginDto(), {
      email: '',
      password: 'password123',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it('rejects an invalid email format', async () => {
    const dto = Object.assign(new LoginDto(), {
      email: 'not-an-email',
      password: 'password123',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'email')).toBe(true);
  });

  it('rejects a password shorter than 6 characters', async () => {
    const dto = Object.assign(new LoginDto(), {
      email: 'test@example.com',
      password: '12345',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'password')).toBe(true);
  });

  it('accepts a password of exactly 6 characters', async () => {
    const dto = Object.assign(new LoginDto(), {
      email: 'test@example.com',
      password: '123456',
    });

    expect(await validate(dto)).toHaveLength(0);
  });
});

describe('RegisterDto', () => {
  it('accepts complete registration data', async () => {
    const dto = Object.assign(new RegisterDto(), {
      email: 'test@example.com',
      password: 'password123',
      name: 'Test User',
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('rejects a missing name', async () => {
    const dto = Object.assign(new RegisterDto(), {
      email: 'test@example.com',
      password: 'password123',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
  });

  it('rejects an empty name', async () => {
    const dto = Object.assign(new RegisterDto(), {
      email: 'test@example.com',
      password: 'password123',
      name: '',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'name')).toBe(true);
  });
});
