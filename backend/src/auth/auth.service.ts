import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from './auth.dto';

type PublicUser = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async register(data: RegisterDto) {
    const user = await this.usersService.create({
      email: data.email,
      name: data.name,
      password: data.password,
      role: data.role ?? 'user',
    });

    return this.buildAuthResponse(user as PublicUser);
  }

  async login(data: LoginDto) {
    const normalizedEmail = data.email.trim().toLowerCase();
    const user = await this.prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatches = await bcrypt.compare(data.password, user.passwordHash);
    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.buildAuthResponse({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role ?? 'user',
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  }

  async getProfile(userId: string) {
    return this.usersService.findOne(userId);
  }

  private buildAuthResponse(user: PublicUser) {
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      {
        expiresIn: Number(process.env.JWT_EXPIRES_IN ?? '86400'),
      },
    );

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    };
  }
}
