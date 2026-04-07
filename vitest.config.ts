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
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [
      './config/jest/SetupTestEnvironment.ts',
      './config/jest/SetupTests.ts',
      './config/jest/SetupJestAxe.ts',
    ],
    include: ['src/**/__tests__/**/*-test.{ts,tsx}', 'src/**/*-test.{ts,tsx}'],
    exclude: [
      'config/**',
      'design-tokens/**',
      'node_modules/**',
      'scripts/**',
      'dist/**',
      'stories/**',
      'src/generated/**',
    ],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/generated/*', 'src/**/*-stories.tsx', 'src/**/index.ts'],
      reporter: ['lcov', 'text'],
      reportsDirectory: './build-reports/tests/coverage',
    },
  },
  resolve: {
    alias: {
      '~common': path.resolve(__dirname, 'src/common'),
      '~generated': path.resolve(__dirname, 'src/generated'),
      '~utils': path.resolve(__dirname, 'src/utils'),
      '~types': path.resolve(__dirname, 'src/types'),
    },
  },
});
