/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.test.ts',
    '!src/config/**/*.ts'
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
          types: ['jest', 'node']
        }
      }
    ]
  },
  testMatch: ['**/*.test.ts', '**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@nestjs/common$': '<rootDir>/src/test/stubs/nestjs-common.ts',
    '^cors$': '<rootDir>/src/test/stubs/cors.ts',
    '^bcrypt$': '<rootDir>/src/test/stubs/bcrypt.ts',
    '^jsonwebtoken$': '<rootDir>/src/test/stubs/jsonwebtoken.ts'
  },
  globals: {},
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  verbose: true,
  forceExit: true,
  detectOpenHandles: true
};