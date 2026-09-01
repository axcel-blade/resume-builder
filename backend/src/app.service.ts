import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { RedisHealthService } from './health/redis-health.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly redisHealthService: RedisHealthService,
  ) {}

  getHello() {
    // Release metadata shared with API clients and Swagger documentation.
    return {
      name: 'VitaForge API',
      version: '0.6.1',
      status: 'running',
    };
  }

  async getHealth() {
    // Check dependencies independently so diagnostics remain available when one is down.
    const [database, redis] = await Promise.all([
      this.prismaService
        .$queryRaw`SELECT 1`
        .then(() => 'ok' as const)
        .catch(() => 'unavailable' as const),
      this.redisHealthService
        .isHealthy()
        .then((healthy): 'ok' | 'unavailable' =>
          healthy ? 'ok' : 'unavailable',
        )
        .catch(() => 'unavailable' as const),
    ]);

    return {
      status: database === 'ok' && redis === 'ok' ? 'ok' : 'degraded',
      server: 'ok',
      database,
      redis,
    };
  }
}
