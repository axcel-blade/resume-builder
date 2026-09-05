import {
  LmStudioConfigService,
  LmStudio_DEFAULT_CONFIG,
} from '../services/lm-studio-config';

describe('LmStudioConfigService', () => {
  it('uses the published defaults when constructed without overrides', () => {
    const service = new LmStudioConfigService();

    expect(service.getFullConfig()).toEqual(LmStudio_DEFAULT_CONFIG);
    expect(service.getFullApiUrl()).toBe('http://localhost:1234/v1/chat/completions');
    expect(service.getModelName()).toBe('local-model');
  });

  it('merges provided fields over the defaults', () => {
    const service = new LmStudioConfigService({
      apiUrl: 'https://secure.example.com/v1',
      modelName: 'test-model-v2',
      maxTokens: 2000,
      temperature: 0.9,
    });

    expect(service.getFullApiUrl()).toBe('https://secure.example.com/v1/chat/completions');
    expect(service.getModelName()).toBe('test-model-v2');
    expect(service.getFullConfig().maxTokens).toBe(2000);
  });

  it('create() returns a configured instance', () => {
    const service = LmStudioConfigService.create({ modelName: 'from-factory' });
    expect(service.getModelName()).toBe('from-factory');
  });

  it('validate() is true for the default config', () => {
    expect(new LmStudioConfigService().validate()).toBe(true);
  });

  it('validate() is false when a required field is empty', () => {
    const service = new LmStudioConfigService({ apiUrl: '', modelName: 'ok' });
    expect(service.validate()).toBe(false);
  });

  it('keeps a custom chat endpoint when only that field is set', () => {
    const service = new LmStudioConfigService({ chatEndpoint: '/custom/chat' });
    expect(service.getFullApiUrl()).toBe('http://localhost:1234/v1/custom/chat');
  });
});
