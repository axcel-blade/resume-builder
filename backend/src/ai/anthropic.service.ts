import { HttpException, HttpStatus, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { GenerateSummaryDto } from './dto/generate-summary.dto';

const ANTHROPIC_MESSAGES_URL = 'https://api.anthropic.com/v1/messages';
const DEFAULT_MODEL = 'claude-sonnet-4-20250514';

@Injectable()
export class AnthropicService {
  async generateSummary(dto: GenerateSummaryDto) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new ServiceUnavailableException('ANTHROPIC_API_KEY is not configured');
    }

    const response = await fetch(ANTHROPIC_MESSAGES_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: dto.model || DEFAULT_MODEL,
        max_tokens: dto.max_tokens ?? 1000,
        messages: dto.messages,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new HttpException(data, response.status || HttpStatus.BAD_GATEWAY);
    }

    return data;
  }
}
