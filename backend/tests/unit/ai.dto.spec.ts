import { validate } from 'class-validator';
import { GenerateCoverLetterDto } from '../../src/ai/dto/generate-cover-letter.dto';
import { GenerateResumeSummaryDto } from '../../src/ai/dto/generate-resume-summary.dto';

describe('GenerateResumeSummaryDto', () => {
  it('accepts an object profileData payload', async () => {
    const dto = Object.assign(new GenerateResumeSummaryDto(), {
      profileData: { fullName: 'Ada' },
      targetRole: 'Engineer',
    });

    expect(await validate(dto)).toHaveLength(0);
  });

  it('rejects a missing profileData object', async () => {
    const dto = Object.assign(new GenerateResumeSummaryDto(), {
      profileData: 'not-an-object',
    });

    const errors = await validate(dto);
    expect(errors.some((error) => error.property === 'profileData')).toBe(true);
  });
});

describe('GenerateCoverLetterDto', () => {
  it('accepts optional job fields with object profile data', async () => {
    const dto = Object.assign(new GenerateCoverLetterDto(), {
      profileData: { fullName: 'Ada' },
      jobDescription: 'Build APIs',
      companyName: 'Acme',
      targetPosition: 'Engineer',
    });

    expect(await validate(dto)).toHaveLength(0);
  });
});
