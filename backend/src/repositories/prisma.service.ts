import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  readonly enabled = Boolean(process.env.DATABASE_URL);
  readonly client = this.enabled ? new PrismaClient() : null;

  async onModuleInit() {
    if (!this.client) {
      this.logger.warn('DATABASE_URL is not set; using in-memory data store');
      return;
    }
    await this.client.$connect();
  }

  async onModuleDestroy() {
    await this.client?.$disconnect();
  }
}
