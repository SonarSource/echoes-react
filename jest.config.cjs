module.exports = {
  coverageDirectory: '<rootDir>/test-results/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/generated/*',
    '!src/**/*-stories.tsx',
    '!src/**/index.ts',
  ],
  coverageReporters: ['lcovonly', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^~common/(.*)': '<rootDir>/src/common/$1',
    '^~generated/(.*)': '<rootDir>/src/generated/$1',
    '^~utils/(.*)': '<rootDir>/src/utils/$1',
  },
  setupFiles: ['<rootDir>/config/jest/SetupTestEnvironment.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/SetupTests.ts',
    '<rootDir>/config/jest/SetupJestAxe.ts',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/config',
    '<rootDir>/design-tokens',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
    '<rootDir>/dist',
    '<rootDir>/stories',
    '<rootDir>/src/generated',
  ],
  testRegex: '(/__tests__/.*|\\-test)\\.(t|j)sx?$',
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
};
