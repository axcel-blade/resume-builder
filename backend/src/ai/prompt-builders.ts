/**
 * Prompt builders for AI generation
 */

import { ResumeProfileData } from './types/ai-types';

// System prompts - these are now exported from ai-types.ts
export const RESUME_SUMMARY_SYSTEM_PROMPT = `You are an expert career coach specializing in resume writing. Your task is to generate a professional, concise, and impactful resume summary based on the user's profile information.

Guidelines:
- Keep it between 3-5 sentences (50-150 words)
- Highlight key skills and achievements
- Match industry keywords for ATS optimization
- Use action verbs and strong language
- Tailor to the target job role when specified
- Focus on value proposition, not just duties

Tone: Professional yet approachable`;

export const COVER_LETTER_SYSTEM_PROMPT = `You are an expert career coach specializing in cover letter writing. Your task is to write a compelling, professional cover letter that showcases the applicant's qualifications and enthusiasm for the position.

Guidelines:
- Create a 3-4 paragraph letter (300-500 words)
- Opening: Hook with relevant achievement or interest
- Body: Connect skills to job requirements, provide examples
- Closing: Express enthusiasm and call to action
- Use professional yet warm tone
- Include specific details about the company/role when provided
- Avoid generic statements; personalize content

Tone: Professional, enthusiastic, confident`;

/**
 * Builds a prompt for resume summary generation
 */
export function buildResumeSummaryPrompt(profileData: ResumeProfileData): string {
  const skills = profileData.skills ?? [];
  const education = profileData.education ?? [];
  const experience = profileData.experience ?? [];
  const parts = [`Name: ${profileData.fullName}`];

  if (profileData.yearsOfExperience) {
    parts.push(`Years of Experience: ${profileData.yearsOfExperience}`);
  }

  if (skills.length > 0) {
    parts.push(`Key Skills: ${skills.slice(0, 5).join(', ')}`);
  }

  if (education.length > 0) {
    parts.push(
      `Education: ${education.map((entry) => `${entry.degree} from ${entry.school} (${entry.year})`).join(', ')}`,
    );
  }

  const recentExperience = experience.slice(-3).reverse();
  if (recentExperience.length > 0) {
    parts.push(
      `Recent Experience: ${recentExperience.map((ex) => `${ex.position} at ${ex.company}`).join(' ')}`,
    );
  }

  return parts.join('\n');
}

/**
 * Builds a prompt for cover letter generation
 */
export function buildCoverLetterPrompt(
  profileData: ResumeProfileData,
  jobDescription?: string,
  companyName?: string,
  targetPosition?: string,
): string {
  const skills = profileData.skills ?? [];
  const experience = profileData.experience ?? [];
  const parts: string[] = [];

  if (targetPosition && companyName) {
    parts.push(`Target Position: ${targetPosition} at ${companyName}`);
  } else if (targetPosition) {
    parts.push(`Target Position: ${targetPosition}`);
  }

  if (jobDescription) {
    parts.push(`Job Description:\n${jobDescription.substring(0, 500)}`);
  }

  parts.push(`Name: ${profileData.fullName}`);

  if (skills.length > 0) {
    parts.push(`Relevant Skills: ${skills.slice(0, 10).join(', ')}`);
  }

  const recentExperience = experience.slice(-2).reverse();
  if (recentExperience.length > 0) {
    parts.push(
      `Notable Achievements: ${recentExperience
        .map((ex) => (ex.achievements ?? []).slice(0, 1).join(' '))
        .filter(Boolean)
        .join('; ')}`,
    );
  }
  
  return parts.join('\n');
}