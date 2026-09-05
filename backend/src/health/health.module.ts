import { Module } from '@nestjs/common';
import { PrismaModule } from '../repositories/prisma.module';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

/** Public probes for Compose/K8s — no auth required. */
@Module({
  imports: [PrismaModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
