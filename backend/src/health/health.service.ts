import { Injectable } from '@nestjs/common';
import { PrismaService } from '../repositories/prisma.service';

export type HealthStatus = 'ok' | 'degraded' | 'error';

export interface HealthReport {
  status: HealthStatus;
  service: string;
  version: string;
  timestamp: string;
  uptimeSeconds: number;
  checks: {
    process: 'ok';
    persistence: {
      mode: 'memory' | 'postgres';
      status: HealthStatus;
      detail?: string;
    };
  };
}

@Injectable()
export class HealthService {
  private readonly startedAt = Date.now();

  constructor(private readonly prisma: PrismaService) {}

  /** Liveness: process is up. */
  live() {
    return {
      status: 'ok' as const,
      service: 'vita-forge-backend',
      timestamp: new Date().toISOString(),
    };
  }

  /** Readiness: process + persistence probe. */
  async ready(): Promise<HealthReport> {
    const persistence = await this.checkPersistence();
    const status: HealthStatus =
      persistence.status === 'error' ? 'error' : persistence.status === 'degraded' ? 'degraded' : 'ok';

    return {
      status,
      service: 'vita-forge-backend',
      version: process.env.npm_package_version || '0.8.0',
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor((Date.now() - this.startedAt) / 1000),
      checks: {
        process: 'ok',
        persistence,
      },
    };
  }

  private async checkPersistence(): Promise<HealthReport['checks']['persistence']> {
    if (!this.prisma.enabled || !this.prisma.client) {
      return { mode: 'memory', status: 'ok', detail: 'DATABASE_URL unset; in-memory store' };
    }

    try {
      await this.prisma.client.$queryRaw`SELECT 1`;
      return { mode: 'postgres', status: 'ok' };
    } catch (error) {
      return {
        mode: 'postgres',
        status: 'error',
        detail: error instanceof Error ? error.message : 'Database unreachable',
      };
    }
  }
}
