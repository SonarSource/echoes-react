module.exports = {
  coverageDirectory: '<rootDir>/test-results/coverage',
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*-stories.tsx', '!src/**/index.ts'],
  coverageReporters: ['lcovonly', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '^.+\\.(md|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/FileStub.js',
    '^.+\\.css$': '<rootDir>/config/jest/CSSStub.js',
  },
  setupFiles: ['<rootDir>/config/jest/SetupTestEnvironment.ts'],
  setupFilesAfterEnv: [
    '<rootDir>/config/jest/SetupReactTestingLibrary.ts',
    '<rootDir>/config/jest/SetupJestAxe.ts',
  ],
  snapshotSerializers: ['@emotion/jest/serializer'],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/config',
    '<rootDir>/design-system',
    '<rootDir>/node_modules',
    '<rootDir>/scripts',
  ],
  testRegex: '(/__tests__/.*|\\-test)\\.(ts|tsx)$',
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        jsc: {
          target: 'es2018',
        },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/(?!(d3-.+))/'],
  reporters: [
    'default',
    [
      'jest-junit',
      {
        outputDirectory: 'test-results/',
        outputName: 'junit.xml',
        ancestorSeparator: ' > ',
        suiteNameTemplate: '{filename}',
        classNameTemplate: '{classname}',
        titleTemplate: '{title}',
      },
    ],
  ],
  testTimeout: 60000,
};
