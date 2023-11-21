import styled from '@emotion/styled';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';
import React from 'react';
import { Theme } from '../dist';

const GlobalStoriesStyle = styled.div``;

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
        <GlobalStoriesStyle>
          <Story />
        </GlobalStoriesStyle>
      );
    },
  ],
};

export default preview;
