import {
  buildResumeSummaryPrompt,
  buildCoverLetterPrompt,
} from '../core/services/prompt-builders';

describe('canonical prompt builders re-export', () => {
  it('builds a resume summary from the shared service module', () => {
    const result = buildResumeSummaryPrompt({
      fullName: 'Ada Lovelace',
      yearsOfExperience: 10,
      skills: ['Mathematics'],
      education: [{ degree: 'Mathematics', school: 'Home study', year: 1835 }],
      experience: [
        {
          position: 'Analyst',
          company: 'Analytical Engine',
          startDate: '1842',
          responsibilities: ['Wrote notes'],
          achievements: ['First algorithm'],
        },
      ],
    });

    expect(result).toContain('Name: Ada Lovelace');
    expect(result).toContain('Key Skills: Mathematics');
  });

  it('builds a cover letter prompt with a company and role', () => {
    const result = buildCoverLetterPrompt(
      {
        fullName: 'Ada Lovelace',
        skills: ['Mathematics'],
        education: [],
        experience: [],
      },
      'Write software',
      'Babbage Inc',
      'Engineer',
    );

    expect(result).toContain('Target Position: Engineer at Babbage Inc');
    expect(result).toContain('Job Description:\nWrite software');
  });
});
