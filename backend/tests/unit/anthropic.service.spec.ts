import { HttpException, ServiceUnavailableException } from '@nestjs/common';
import { AnthropicService } from '../../src/ai/anthropic.service';

describe('AnthropicService', () => {
  const service = new AnthropicService();
  const originalKey = process.env.ANTHROPIC_API_KEY;

  afterEach(() => {
    process.env.ANTHROPIC_API_KEY = originalKey;
    jest.restoreAllMocks();
  });

  it('rejects requests when the API key is missing', async () => {
    delete process.env.ANTHROPIC_API_KEY;

    await expect(
      service.generateSummary({
        messages: [{ role: 'user', content: 'Write a summary' }],
      }),
    ).rejects.toBeInstanceOf(ServiceUnavailableException);
  });

  it('forwards a validated payload to Anthropic and returns the response', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    const payload = {
      content: [{ type: 'text', text: 'Experienced engineer.' }],
    };
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => payload,
    });

    const result = await service.generateSummary({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{ role: 'user', content: 'Write a summary' }],
    });

    expect(result).toEqual(payload);
    expect((globalThis as any).fetch).toHaveBeenCalledWith(
      'https://api.anthropic.com/v1/messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'x-api-key': 'test-key',
          'anthropic-version': '2023-06-01',
        }),
      }),
    );
  });

  it('surfaces Anthropic HTTP errors', async () => {
    process.env.ANTHROPIC_API_KEY = 'test-key';
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'invalid key' } }),
    });

    await expect(
      service.generateSummary({
        messages: [{ role: 'user', content: 'Write a summary' }],
      }),
    ).rejects.toBeInstanceOf(HttpException);
  });
});
