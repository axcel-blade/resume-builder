import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { RedisHealthService } from './health/redis-health.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: PrismaService,
          useValue: { $queryRaw: jest.fn().mockResolvedValue([{ '?column?': 1 }]) },
        },
        {
          provide: RedisHealthService,
          useValue: { isHealthy: jest.fn().mockResolvedValue(true) },
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return the API metadata', () => {
      expect(appController.getHello()).toEqual({
        name: 'VitaForge API',
        version: '0.6.0',
        status: 'running',
      });
    });
  });

  describe('health', () => {
    it('should report the server and database as healthy', async () => {
      await expect(appController.getHealth()).resolves.toEqual({
        status: 'ok',
        server: 'ok',
        database: 'ok',
        redis: 'ok',
      });
    });
  });
});
