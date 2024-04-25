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
import { dirname, join } from 'node:path';

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
    autodocs: true,
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
};
export default config;

function getAbsolutePath(value: string) {
  return dirname(require.resolve(join(value, 'package.json')));
}
