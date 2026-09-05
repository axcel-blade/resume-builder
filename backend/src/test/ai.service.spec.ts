import { AIService } from '../services/ai.service';
import { LmStudio_DEFAULT_CONFIG } from '../services/lm-studio-config';
import { ResumeProfileData } from '../core/types/ai-types';

const profile: ResumeProfileData = {
  fullName: 'John Doe',
  yearsOfExperience: 5,
  skills: ['TypeScript'],
  education: [{ degree: 'BS CS', school: 'Tech U', year: 2018 }],
  experience: [
    {
      position: 'Engineer',
      company: 'Acme',
      startDate: '2020',
      responsibilities: ['Built APIs'],
      achievements: ['Shipped v1'],
    },
  ],
};

function mockFetchJson(payload: unknown, ok = true, status = 200) {
  (globalThis as any).fetch = jest.fn().mockResolvedValue({
    ok,
    status,
    statusText: ok ? 'OK' : 'Error',
    json: async () => payload,
  }) as unknown as typeof fetch;
}

describe('AIService', () => {
  let service: AIService;

  beforeEach(() => {
    service = new AIService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('starts with the default LM Studio configuration', () => {
    expect(service.getConfig()).toEqual(LmStudio_DEFAULT_CONFIG);
  });

  it('merges constructor overrides into the default config', () => {
    const custom = new AIService({
      apiUrl: 'http://custom.example.com:5000/v1',
      modelName: 'custom-model',
    });

    expect(custom.getConfig()).toEqual({
      ...LmStudio_DEFAULT_CONFIG,
      apiUrl: 'http://custom.example.com:5000/v1',
      modelName: 'custom-model',
    });
  });

  it('updates config after construction', () => {
    service.setConfig({ temperature: 0.9 });
    expect(service.getConfig().temperature).toBe(0.9);
    expect(service.getConfig().maxTokens).toBe(500);
  });

  it('returns a failed result when the network request throws', async () => {
    (globalThis as any).fetch = jest.fn().mockRejectedValue(new Error('Network error'));

    const result = await service.generateResumeSummary(profile);

    expect(result.success).toBe(false);
    expect(result.error).toContain('Network error');
  });

  it('sends a JSON body with the default resume-summary max_tokens', async () => {
    mockFetchJson({ success: true, choices: [{ message: { content: 'Summary' } }] });

    await service.generateResumeSummary(profile);

    const [, init] = ((globalThis as any).fetch as jest.Mock).mock.calls[0];
    const body = JSON.parse(init.body);
    expect(body.max_tokens).toBe(500);
    expect(body.model).toBe('local-model');
    expect(init.method).toBe('POST');
  });

  it('returns generated content when the API marks the call successful', async () => {
    mockFetchJson({
      success: true,
      choices: [{ message: { content: 'A concise summary' } }],
      usage: { prompts_tokens: 12, completion_tokens: 34 },
    });

    const result = await service.generateResumeSummary(profile);

    expect(result.success).toBe(true);
    expect(result.content).toBe('A concise summary');
    expect(result.tokensUsed).toBe(46);
  });

  it('surfaces HTTP failures as an error result', async () => {
    mockFetchJson({}, false, 503);

    const result = await service.generateCoverLetter(profile, 'Job', 'Acme');

    expect(result.success).toBe(false);
    expect(result.error).toContain('503');
  });

  it('requests 1000 tokens for cover letters', async () => {
    mockFetchJson({ success: true, choices: [{ message: { content: 'Letter' } }] });

    await service.generateCoverLetter(profile);

    const [, init] = ((globalThis as any).fetch as jest.Mock).mock.calls[0];
    expect(JSON.parse(init.body).max_tokens).toBe(1000);
  });
});
