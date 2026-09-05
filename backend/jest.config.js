/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.test.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        tsconfig: {
          module: 'commonjs',
          target: 'ES2020',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
          experimentalDecorators: true,
          emitDecoratorMetadata: true,
          strict: false,
          types: ['jest', 'node'],
        },
      },
    ],
  },
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@nestjs/common$': '<rootDir>/tests/stubs/nestjs-common.ts',
    '^cors$': '<rootDir>/tests/stubs/cors.ts',
    '^bcrypt$': '<rootDir>/tests/stubs/bcrypt.ts',
    '^jsonwebtoken$': '<rootDir>/tests/stubs/jsonwebtoken.ts',
    '^@prisma/client$': '<rootDir>/tests/stubs/prisma-client.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true,
};
