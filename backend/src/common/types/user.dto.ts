import { IsString, IsOptional } from 'class-validator';

export class UserDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly email: string;

  @IsString()
  @IsOptional()
  readonly avatar?: string | null;
}
