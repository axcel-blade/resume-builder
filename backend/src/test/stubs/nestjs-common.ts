export class UnauthorizedException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'UnauthorizedException';
  }
}

export class ConflictException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'ConflictException';
  }
}

export class NotFoundException extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}

export class Logger {
  constructor(_context?: string) {}
  log(_message: unknown) {}
  error(_message: unknown, _trace?: unknown) {}
  warn(_message: unknown) {}
}

export class HttpException extends Error {
  constructor(message: string, private readonly status = 500) {
    super(message);
  }
  getStatus() {
    return this.status;
  }
  getResponse() {
    return { message: this.message, statusCode: this.status };
  }
}

export const Catch = () => (target: unknown) => target;
export const Headers = () => () => undefined;
export const Module = () => (target: unknown) => target;

export const Injectable = () => (target: unknown) => target;
export const Controller = (_path?: string) => (target: unknown) => target;
export const Post = (_path?: string) => () => undefined;
export const Get = (_path?: string) => () => undefined;
export const Body = () => () => undefined;
export const HttpCode = (_code?: number) => () => undefined;
export const UseGuards = (..._guards: unknown[]) => () => undefined;
export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  UNAUTHORIZED: 401,
};

export type INestApplication = {
  enableCors: (options: unknown) => void;
};
