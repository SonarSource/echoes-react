/*
 * Echoes react
 * Copyright (C) 2023-2025 SonarSource SA
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

import { create } from 'storybook/theming';

export default create({
  base: 'light',

  brandTitle: 'Echoes react',
  //brandUrl: 'https://example.com',
  //brandImage: 'https://storybook.js.org/images/placeholders/350x150.png',
  brandTarget: '_self',

  //colorPrimary: '#3a10e5',
  //colorSecondary: '#585c6d',

  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',

  // UI
  //appBg: '#ffffff',
  //appContentBg: '#ffffff',
  //appBorderColor: '#585c6d',
  //appBorderRadius: 4,

  // Text colors
  //textColor: '#10162f',
  //textInverseColor: '#ffffff',

  // Toolbar default and active colors
  //barTextColor: '#9e9e9e',
  //barSelectedColor: '#585c6d',
  //barBg: '#ffffff',

  // Form colors
  //inputBg: '#ffffff',
  //inputBorder: '#10162f',
  //inputTextColor: '#10162f',
  //inputBorderRadius: 2,
});
