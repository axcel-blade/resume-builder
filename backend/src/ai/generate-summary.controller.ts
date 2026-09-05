import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenerateSummaryDto } from './dto/generate-summary.dto';
import { AnthropicService } from './anthropic.service';

@Controller('generate_summary')
export class GenerateSummaryController {
  constructor(private readonly anthropicService: AnthropicService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  generate(@Body() body: GenerateSummaryDto) {
    return this.anthropicService.generateSummary(body);
  }
}
