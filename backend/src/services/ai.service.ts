/**
 * LM Studio Service for Resume AI Features
 */

import { Injectable, Logger } from '@nestjs/common';
import { LmStudioConfig, LmStudioConfigService } from './lm-studio-config';
import { ChatCompletionRequest, ChatCompletionResponse, AiGenerationResult, ResumeProfileData } from '../core/types/ai-types';
import { RESUME_SUMMARY_SYSTEM_PROMPT, COVER_LETTER_SYSTEM_PROMPT, buildResumeSummaryPrompt, buildCoverLetterPrompt } from './prompt-builders';


@Injectable()
export class AIService {
  private readonly logger = new Logger(AIService.name);
  private config: LmStudioConfigService;

  constructor(config?: Partial<LmStudioConfig>) {
    this.config = LmStudioConfigService.create(config);
  }

  setConfig(config: Partial<LmStudioConfig>): void {
    this.config = LmStudioConfigService.create({
      ...this.config.getFullConfig(),
      ...config,
    });
  }

  async generateResumeSummary(
    profileData: ResumeProfileData,
    options?: Partial<ChatCompletionRequest>,
  ): Promise<AiGenerationResult> {
    try {
      const request: ChatCompletionRequest = {
        model: this.config.getModelName(),
        messages: [
          { role: 'system', content: RESUME_SUMMARY_SYSTEM_PROMPT },
          { role: 'user', content: buildResumeSummaryPrompt(profileData) },
        ],
        max_tokens: options?.max_tokens || 500,
        temperature: options?.temperature || 0.7,
      };

      const response = await this.makeApiCall(request);

      if (response.success === false || !response.choices?.[0]?.message?.content) {
        return {
          success: false,
          error: response.error || 'The model did not return content',
        };
      }

      return {
        success: true,
        content: response.choices[0].message.content,
        tokensUsed: response.usage ? (response.usage.prompts_tokens + response.usage.completion_tokens) : undefined,
      };
    } catch (error) {
      this.logger.error('Error generating resume summary', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  async generateCoverLetter(
    profileData: ResumeProfileData,
    jobDescription?: string,
    companyName?: string,
    targetPosition?: string,
  ): Promise<AiGenerationResult> {
    try {
      const request: ChatCompletionRequest = {
        model: this.config.getModelName(),
        messages: [
          { role: 'system', content: COVER_LETTER_SYSTEM_PROMPT },
          { role: 'user', content: buildCoverLetterPrompt(profileData, jobDescription, companyName, targetPosition) },
        ],
        max_tokens: 1000,
        temperature: 0.7,
      };

      const response = await this.makeApiCall(request);

      if (response.success === false || !response.choices?.[0]?.message) {
        return {
          success: false,
          error: response.error || 'The model did not return content',
        };
      }

      return {
        success: true,
        content: response.choices[0].message.content || '',
        tokensUsed: response.usage ? (response.usage.prompts_tokens + response.usage.completion_tokens) : undefined,
      };
    } catch (error) {
      this.logger.error('Error generating cover letter', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  private async makeApiCall(request: ChatCompletionRequest): Promise<ChatCompletionResponse> {
    const apiUrl = this.config.getFullApiUrl();
    this.logger.log(`Calling LM Studio API: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}: ${response.statusText}`);
    }

    return response.json();
  }

  getConfig(): LmStudioConfig {
    return this.config.getFullConfig();
  }
}