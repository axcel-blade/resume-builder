import {
  RESUME_SUMMARY_SYSTEM_PROMPT,
  COVER_LETTER_SYSTEM_PROMPT,
  buildResumeSummaryPrompt,
  buildCoverLetterPrompt,
} from '../services/prompt-builders';
import { ResumeProfileData } from '../core/types/ai-types';

const profile: ResumeProfileData = {
  fullName: 'John Doe',
  yearsOfExperience: 5,
  skills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'CSS', 'HTML'],
  education: [
    { degree: 'BS Computer Science', school: 'University of Tech', year: 2018 },
    { degree: 'MS CS', school: 'Tech B', year: 2020 },
  ],
  experience: [
    {
      position: 'Junior Developer',
      company: 'Startup Inc',
      startDate: '2018',
      endDate: '2020',
      responsibilities: ['Fixed bugs'],
      achievements: ['Improved test coverage'],
    },
    {
      position: 'Software Engineer',
      company: 'Tech Corp',
      startDate: '2020',
      endDate: 'present',
      responsibilities: ['Built features'],
      achievements: ['Led team of 5 developers'],
    },
  ],
};

describe('system prompts', () => {
  it('describes resume-summary expectations', () => {
    expect(RESUME_SUMMARY_SYSTEM_PROMPT).toContain('expert career coach');
    expect(RESUME_SUMMARY_SYSTEM_PROMPT).toContain('3-5 sentences');
    expect(RESUME_SUMMARY_SYSTEM_PROMPT).toContain('ATS optimization');
  });

  it('describes cover-letter structure', () => {
    expect(COVER_LETTER_SYSTEM_PROMPT).toContain('cover letter writing');
    expect(COVER_LETTER_SYSTEM_PROMPT).toContain('3-4 paragraph letter');
    expect(COVER_LETTER_SYSTEM_PROMPT).toContain('Opening: Hook');
  });
});

describe('buildResumeSummaryPrompt', () => {
  it('includes name, experience, limited skills, and education', () => {
    const result = buildResumeSummaryPrompt(profile);

    expect(result).toContain('Name: John Doe');
    expect(result).toContain('Years of Experience: 5');
    expect(result).toContain('Key Skills: JavaScript, TypeScript, React, Node.js, CSS');
    expect(result).not.toContain('HTML');
    expect(result).toContain('BS Computer Science from University of Tech (2018)');
    expect(result).toContain('MS CS from Tech B (2020)');
    expect(result).toContain('Software Engineer at Tech Corp');
    expect(result).toContain('Junior Developer at Startup Inc');
  });

  it('omits optional sections when arrays are empty', () => {
    const result = buildResumeSummaryPrompt({
      fullName: 'Jane Smith',
      skills: [],
      education: [],
      experience: [],
    });

    expect(result).toContain('Name: Jane Smith');
    expect(result).not.toContain('Key Skills:');
    expect(result).not.toContain('Education:');
    expect(result).not.toContain('Recent Experience:');
  });
});

describe('buildCoverLetterPrompt', () => {
  it('includes target role, truncated job text, and recent achievements', () => {
    const jobDescription = `${'A'.repeat(500)}SHOULD_NOT_APPEAR`;
    const result = buildCoverLetterPrompt(
      profile,
      jobDescription,
      'Acme Inc',
      'Senior Frontend Developer',
    );

    expect(result).toContain('Target Position: Senior Frontend Developer at Acme Inc');
    expect(result).toContain('Name: John Doe');
    expect(result).toContain('Relevant Skills: JavaScript, TypeScript, React, Node.js, CSS, HTML');
    expect(result).toContain('Led team of 5 developers');
    expect(result).not.toContain('SHOULD_NOT_APPEAR');
  });

  it('omits the job description block when none is provided', () => {
    const result = buildCoverLetterPrompt(profile, undefined, 'Acme', 'Engineer');
    expect(result).not.toContain('Job Description:');
  });

  it('includes only a target position when the company is missing', () => {
    const result = buildCoverLetterPrompt(profile, undefined, undefined, 'Engineer');
    expect(result).toContain('Target Position: Engineer');
    expect(result).not.toContain(' at ');
  });
});
