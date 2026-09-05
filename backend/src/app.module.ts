import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AIModule } from './ai/ai.module';
import { PrismaModule } from './repositories/prisma.module';
import { HealthModule } from './health/health.module';
import { CollabModule } from './collab/collab.module';
import { TemplatesModule } from './templates/templates.module';

/** Root Nest module — wires auth, profiles, AI, health, collab, and templates. */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // Prefer backend/.env; fall back to repo-root .env for Compose/local single-file setups.
      envFilePath: ['.env', '../.env'],
    }),
    PrismaModule,
    HealthModule,
    AuthModule,
    UsersModule,
    AIModule,
    CollabModule,
    TemplatesModule,
  ],
})
export class AppModule {}
