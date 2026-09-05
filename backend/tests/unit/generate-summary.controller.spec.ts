import { GenerateSummaryController } from '../../src/ai/generate-summary.controller';
import { AnthropicService } from '../../src/ai/anthropic.service';

describe('GenerateSummaryController', () => {
  it('delegates to AnthropicService', async () => {
    const anthropicService = {
      generateSummary: jest.fn().mockResolvedValue({
        content: [{ type: 'text', text: 'Summary' }],
      }),
    };
    const controller = new GenerateSummaryController(
      anthropicService as unknown as AnthropicService,
    );
    const body = {
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user' as const, content: 'Write a summary' }],
    };

    await expect(controller.generate(body)).resolves.toEqual({
      content: [{ type: 'text', text: 'Summary' }],
    });
    expect(anthropicService.generateSummary).toHaveBeenCalledWith(body);
  });
});
