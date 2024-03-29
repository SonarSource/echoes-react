import { dirname, join } from 'path';
/*
 * Echoes react
 * Copyright (C) 2023-2023 SonarSource SA
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

import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../stories/**/*'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-interactions'),
    getAbsolutePath('@storybook/addon-themes'),
  ],
  framework: '@storybook/react-vite',
  docs: {
    autodocs: 'tag',
  },
  typescript: {
    check: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        alias: {
          '@sonarsource/echoes-react': path.dirname(require.resolve('../dist/')),
        },
      },
    });
  },
};
export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
