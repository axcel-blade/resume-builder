import { Body, Controller, Get, Headers, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { IsArray, IsOptional, IsString } from 'class-validator';

class UpdateProfileDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills?: string[];
}

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  getProfile(@Headers('authorization') authorization?: string) {
    return this.authService.getMe(authorization);
  }

  @Post('profile')
  @HttpCode(HttpStatus.OK)
  async updateProfile(
    @Headers('authorization') authorization: string | undefined,
    @Body() _updateData: UpdateProfileDto,
  ) {
    return this.authService.getMe(authorization);
  }
}
