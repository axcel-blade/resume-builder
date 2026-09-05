import { IsObject, IsOptional, IsString } from 'class-validator';

export class GenerateResumeSummaryDto {
  @IsObject()
  profileData: Record<string, unknown>;

  @IsString()
  @IsOptional()
  targetRole?: string;
}
