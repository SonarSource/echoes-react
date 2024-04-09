/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import react from '@vitejs/plugin-react';
import path from 'node:path';
import license from 'rollup-plugin-license';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import * as packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: path.resolve('src/index.ts'),
      name: 'Echoes',
      formats: ['es'],
      fileName: `index`,
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        'react/jsx-runtime',
        '@emotion/react/jsx-runtime',
        ...Object.keys(packageJson.peerDependencies),
      ],
      output: {
        intro: `import './style.css';`,
        globals: {
          react: 'react',
          'react-dom': 'ReactDOM',
        },
        plugins: [
          license({
            sourcemap: true,
            banner: {
              content: {
                file: path.resolve(__dirname, 'config/license/LICENSE-BANNER.txt'),
              },
            },
          }),
        ],
      },
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2022',
    },
  },
  plugins: [
    react(),
    dts({
      entryRoot: 'src',
      exclude: ['**/config/**', '**/stories/**', '**/__tests__/**', '**/*-stories.*'],
    }),
  ],
  resolve: {
    alias: {
      '~common': path.resolve(__dirname, './src/common'),
      '~generated': path.resolve(__dirname, './src/generated'),
      '~utils': path.resolve(__dirname, './src/utils'),
      '~types': path.resolve(__dirname, './src/types'),
    },
  },
});
