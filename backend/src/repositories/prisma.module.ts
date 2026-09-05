import { Global, Module } from '@nestjs/common';
import { DATA_STORE } from './data-store';
import { MemoryDataStore } from './memory-data-store';
import { PrismaDataStore } from './prisma-data-store';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: DATA_STORE,
      // Prefer PostgreSQL when DATABASE_URL is set; otherwise keep an in-memory store for tests/dev.
      useFactory: (prisma: PrismaService) =>
        prisma.enabled ? new PrismaDataStore(prisma) : new MemoryDataStore(),
      inject: [PrismaService],
    },
  ],
  exports: [PrismaService, DATA_STORE],
})
export class PrismaModule {}
