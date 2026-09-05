import { Module } from '@nestjs/common';
import { CollabController } from './collab.controller';
import { CollabService } from './collab.service';

/** In-process collaboration rooms (SSE). Not durable across restarts or replicas. */
@Module({
  controllers: [CollabController],
  providers: [CollabService],
})
export class CollabModule {}
