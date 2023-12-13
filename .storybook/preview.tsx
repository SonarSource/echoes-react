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

import { Global, css } from '@emotion/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '../dist';

const globalStyles = css`
  body {
    font: var(--echoes-typography-paragraph-default);
    color: var(--echoes-color-text-default);
    background-color: var(--echoes-color-background-default);
  }
`;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      // sort the stories based on name
      storySort: {
        method: 'alphabetical',
        order: ['Design Tokens', 'Components'],
      },
    },
    backgrounds: {
      disabled: undefined,
      values: [
        {
          name: 'light',
          value: 'rgb(255,255,255)',
        },
        {
          name: 'dark',
          value: 'rgb(42,47,64)',
        },
      ],
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: Object.fromEntries(Object.entries<string>(Theme)),
      defaultTheme: 'light',
      attributeName: 'data-echoes-theme',
      parentSelector: 'html',
    }),
    (Story) => {
      return (
        <IntlProvider locale="en-us">
          <Global styles={globalStyles} />
          <MemoryRouter>
            <Story />
          </MemoryRouter>
        </IntlProvider>
      );
    },
  ],
};

export default preview;
