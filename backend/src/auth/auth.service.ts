import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

export interface StoredUser {
  id: string;
  email: string;
  name: string;
  password: string;
}

export interface AuthTokenResponse {
  message: string;
  userId: string;
  access_token: string;
}

export interface CurrentUserResponse {
  userId: string;
  email: string;
  name: string;
  avatar: string | null;
  bio: string;
  skills: string[];
}

@Injectable()
export class AuthService {
  private readonly users = new Map<string, StoredUser>();
  private readonly jwtSecret =
    process.env.JWT_SECRET || 'vita-forge-secret-key-change-in-production';

  async register(userData: { email: string; password: string; name?: string }): Promise<AuthTokenResponse> {
    const { email, password, name = '' } = userData;

    if (this.users.has(email)) {
      throw new ConflictException('User with this email already exists');
    }

    const user: StoredUser = {
      id: Date.now().toString(),
      email,
      name,
      password: await bcrypt.hash(password, 10),
    };

    this.users.set(email, user);

    return {
      message: 'Registration successful',
      userId: user.id,
      access_token: this.signToken(user),
    };
  }

  async login(loginData: { email: string; password: string }): Promise<AuthTokenResponse> {
    const user = this.users.get(loginData.email);

    if (!user || !(await bcrypt.compare(loginData.password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      userId: user.id,
      access_token: this.signToken(user),
    };
  }

  async getMe(authorization?: string): Promise<CurrentUserResponse> {
    const token = this.extractBearerToken(authorization);
    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    try {
      const payload = jwt.verify(token, this.jwtSecret) as { sub: string; email: string };
      const user =
        this.users.get(payload.email) ??
        [...this.users.values()].find((entry) => entry.id === payload.sub);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return {
        userId: user.id,
        email: user.email,
        name: user.name || 'Demo User',
        avatar: null,
        bio: '',
        skills: [],
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private signToken(user: StoredUser): string {
    return jwt.sign({ sub: user.id, email: user.email }, this.jwtSecret, { expiresIn: '7d' });
  }

  private extractBearerToken(authorization?: string): string | undefined {
    if (!authorization) {
      return undefined;
    }
    return authorization.startsWith('Bearer ') ? authorization.slice(7) : authorization;
  }
}
