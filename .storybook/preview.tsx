import { ThemeProvider } from '@emotion/react';
import styled from '@emotion/styled';
import type { Preview } from '@storybook/react';
import React from 'react';

const GlobalStoriesStyle = styled.div`
  color: blue;
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
  },
  decorators: [
    (Story: any) => (
      <ThemeProvider theme={{}}>
        <GlobalStoriesStyle>
          <Story />
        </GlobalStoriesStyle>
      </ThemeProvider>
    ),
  ],
};

export default preview;
