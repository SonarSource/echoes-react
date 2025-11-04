/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
 * mailto:info AT sonarsource DOT com
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */
module.exports = {
  coverageDirectory: '<rootDir>/build-reports/tests/coverage',
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/generated/*',
    '!src/**/*-stories.tsx',
    '!src/**/index.ts',
  ],
  coverageReporters: ['lcovonly', 'text'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '.+\\.(md|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/config/jest/FileStub.js',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/config/jest/CSSStub.js',
    '^~common/(.*)': '<rootDir>/src/common/$1',
    '^~generated/(.*)': '<rootDir>/src/generated/$1',
    '^~utils/(.*)': '<rootDir>/src/utils/$1',
    '^~types/(.*)': '<rootDir>/src/types/$1',
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
    '^.+\\.(t|j)sx?$': './config/jest/JestPreprocess.cjs',
  },
};
