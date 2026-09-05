import { Module } from '@nestjs/common';
import { AiController } from './api/ai/ai.controller';
import { AIService } from '../services/ai.service';
import { LmStudioConfigService } from '../services/lm-studio-config';

@Module({
  controllers: [AiController],
  providers: [AIService, LmStudioConfigService],
  exports: [AIService],
})
export class AIModule {}
