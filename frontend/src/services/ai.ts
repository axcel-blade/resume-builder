import { apiRequest } from './http';
import type { ResumeProfileData } from '../types/ai-types';

export interface AiGenerationResponse {
  success: boolean;
  content?: string;
  tokensUsed?: number;
  error?: string;
}

export function generateResumeSummary(
  profileData: ResumeProfileData,
  targetRole?: string,
): Promise<AiGenerationResponse> {
  return apiRequest<AiGenerationResponse>('/ai/resume-summary', {
    method: 'POST',
    body: { profileData, targetRole },
    auth: true,
  });
}

export function generateCoverLetter(
  profileData: ResumeProfileData,
  jobDescription?: string,
  companyName?: string,
  targetPosition?: string,
): Promise<AiGenerationResponse> {
  return apiRequest<AiGenerationResponse>('/ai/cover-letter', {
    method: 'POST',
    body: { profileData, jobDescription, companyName, targetPosition },
    auth: true,
  });
}

export const aiApiClient = {
  generateResumeSummary,
  generateCoverLetter,
};

export class AIApiClient {
  generateResumeSummary = generateResumeSummary;
  generateCoverLetter = generateCoverLetter;
}
