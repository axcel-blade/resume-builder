import { IsObject, IsOptional, IsString } from 'class-validator';

export class GenerateCoverLetterDto {
  @IsObject()
  profileData: Record<string, unknown>;

  @IsString()
  @IsOptional()
  jobDescription?: string;

  @IsString()
  @IsOptional()
  companyName?: string;

  @IsString()
  @IsOptional()
  targetPosition?: string;
}
