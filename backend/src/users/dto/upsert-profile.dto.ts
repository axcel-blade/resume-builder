import { IsObject, IsOptional } from 'class-validator';

export class UpsertProfileDto {
  @IsOptional()
  @IsObject()
  resume?: Record<string, unknown>;

  @IsOptional()
  @IsObject()
  coverLetter?: Record<string, unknown>;
}
