import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: { user: { findUnique: jest.Mock } };
  let jwt: { sign: jest.Mock };
  let usersService: { create: jest.Mock; findOne: jest.Mock };

  beforeEach(async () => {
    prisma = {
      user: {
        findUnique: jest.fn(),
      },
    };

    usersService = {
      create: jest.fn(),
      findOne: jest.fn(),
    };

    jwt = {
      sign: jest.fn().mockReturnValue('signed-token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prisma },
        { provide: UsersService, useValue: usersService },
        { provide: JwtService, useValue: jwt },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('registers a user and returns a JWT payload', async () => {
    usersService.create.mockResolvedValue({
      id: 'user_123',
      email: 'alex@example.com',
      name: 'Alex Morgan',
      role: 'user',
      createdAt: new Date('2026-09-01T00:00:00.000Z'),
      updatedAt: new Date('2026-09-01T00:00:00.000Z'),
    });

    const result = await service.register({
      email: 'alex@example.com',
      name: 'Alex Morgan',
      password: 'Azure123!',
    });

    expect(usersService.create).toHaveBeenCalledWith({
      email: 'alex@example.com',
      name: 'Alex Morgan',
      password: 'Azure123!',
      role: 'user',
    });
    expect(jwt.sign).toHaveBeenCalledWith(
      expect.objectContaining({
        sub: 'user_123',
        email: 'alex@example.com',
      }),
      expect.objectContaining({
        expiresIn: expect.any(Number),
      }),
    );
    expect(result.user.email).toBe('alex@example.com');
    expect(result.accessToken).toBe('signed-token');
  });
});
