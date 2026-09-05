import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { GenerateSummaryController } from './generate-summary.controller';
import { AIService } from './ai.service';
import { AnthropicService } from './anthropic.service';
import { LmStudioConfigService } from './lm-studio-config';

@Module({
  controllers: [AiController, GenerateSummaryController],
  providers: [AIService, AnthropicService, LmStudioConfigService],
  exports: [AIService, AnthropicService],
})
export class AIModule {}
