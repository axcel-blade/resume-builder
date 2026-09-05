import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { GenerateCoverLetterDto } from './dto/generate-cover-letter.dto';
import { GenerateResumeSummaryDto } from './dto/generate-resume-summary.dto';
import { ResumeProfileData } from './types/ai-types';
import { AIService } from './ai.service';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AIService) {}

  @Post('resume-summary')
  @HttpCode(HttpStatus.OK)
  generateResumeSummary(@Body() body: GenerateResumeSummaryDto) {
    return this.aiService.generateResumeSummary(body.profileData as unknown as ResumeProfileData);
  }

  @Post('cover-letter')
  @HttpCode(HttpStatus.OK)
  generateCoverLetter(@Body() body: GenerateCoverLetterDto) {
    return this.aiService.generateCoverLetter(
      body.profileData as unknown as ResumeProfileData,
      body.jobDescription,
      body.companyName,
      body.targetPosition,
    );
  }

  @Get('config')
  @HttpCode(HttpStatus.OK)
  getConfig() {
    return this.aiService.getConfig();
  }
}
