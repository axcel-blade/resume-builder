import { AiController } from '../core/api/ai/ai.controller';
import { AIService } from '../services/ai.service';

describe('AiController', () => {
  let controller: AiController;
  let aiService: {
    generateResumeSummary: jest.Mock;
    generateCoverLetter: jest.Mock;
    getConfig: jest.Mock;
  };

  beforeEach(() => {
    aiService = {
      generateResumeSummary: jest.fn().mockResolvedValue({ success: true, content: 'summary' }),
      generateCoverLetter: jest.fn().mockResolvedValue({ success: true, content: 'letter' }),
      getConfig: jest.fn().mockReturnValue({ modelName: 'local-model' }),
    };
    controller = new AiController(aiService as unknown as AIService);
  });

  it('forwards profile data to generateResumeSummary', async () => {
    const body = { profileData: { fullName: 'Ada' }, targetRole: 'Engineer' };
    await controller.generateResumeSummary(body);
    expect(aiService.generateResumeSummary).toHaveBeenCalledWith(body.profileData);
  });

  it('forwards cover letter fields', async () => {
    const body = {
      profileData: { fullName: 'Ada' },
      jobDescription: 'Build things',
      companyName: 'Acme',
      targetPosition: 'Engineer',
    };

    await controller.generateCoverLetter(body);

    expect(aiService.generateCoverLetter).toHaveBeenCalledWith(
      body.profileData,
      body.jobDescription,
      body.companyName,
      body.targetPosition,
    );
  });

  it('returns the current AI config', () => {
    expect(controller.getConfig()).toEqual({ modelName: 'local-model' });
  });
});
