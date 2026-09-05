import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { GenerateSummaryController } from './generate-summary.controller';
import { AIService } from './ai.service';
import { AnthropicService } from './anthropic.service';

/** LM Studio + Anthropic helpers. Config is owned by each service, not Nest tokens. */
@Module({
  controllers: [AiController, GenerateSummaryController],
  providers: [AIService, AnthropicService],
  exports: [AIService, AnthropicService],
})
export class AIModule {}
