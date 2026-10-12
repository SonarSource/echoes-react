/*
 * Echoes react
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

import createCache from '@emotion/cache';
import { CacheProvider, Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react-vite';
import { IntlProvider } from 'react-intl';
import { MemoryRouter } from 'react-router-dom';
import { EchoesProvider, Theme, cssVar } from '../src';
import { reactRouterAdapter } from '../src/common/helpers/react-router-adapter';

// @ts-expect-error — Vite handles ?url imports at build time; no TS declarations needed
import gitarCssUrl from '../src/generated/styles/gitar.css?url';
// @ts-expect-error — Vite handles ?url imports at build time; no TS declarations needed
import sonarCssUrl from '../src/generated/styles/sonar.css?url';

/**
 * This prevents emotion from complaining about SSR
 * See:
 *  - https://github.com/emotion-js/emotion/issues/1105#issuecomment-1058225197
 *  - https://github.com/emotion-js/emotion/issues/2917
 *  - https://github.com/storybookjs/storybook/issues/18656
 */
const emotionCache = createCache({ key: 'css' });
emotionCache.compat = true;

const globalStyles = css`
  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Thin.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url('/fonts/Inter/Inter-ThinItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url('/fonts/Inter/Inter-ExtraLight.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url('/fonts/Inter/Inter-ExtraLightItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Light.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url('/fonts/Inter/Inter-LightItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Italic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Medium.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url('/fonts/Inter/Inter-MediumItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/Inter/Inter-SemiBold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url('/fonts/Inter/Inter-SemiBoldItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Inter/Inter-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Inter/Inter-BoldItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/Inter/Inter-ExtraBold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url('/fonts/Inter/Inter-ExtraBoldItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url('../fonts/Inter/Inter-Black.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Inter';
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url('../fonts/Inter/Inter-BlackItalic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Ubuntu/UbuntuMono-Regular.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Ubuntu Mono';
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url('/fonts/Ubuntu/UbuntuMono-Italic.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Ubuntu Mono';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Ubuntu/UbuntuMono-Bold.woff2') format('woff2');
  }

  @font-face {
    font-family: 'Ubuntu Mono';
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url('/fonts/Ubuntu/UbuntuMono-BoldItalic.woff2') format('woff2');
  }

  body,
  .docs-story {
    background-color: ${cssVar('color-surface-default')};
  }

  p {
    margin: 0;
  }

  code {
    font: ${cssVar('typography-code-default')};
    background: ${cssVar('color-background-accent-weak-default')};
    color: ${cssVar('color-text-accent')};
    padding: 0 ${cssVar('dimension-space-200')};
  }
`;

const brandStylesheets: Record<string, string> = {
  sonar: sonarCssUrl,
  gitar: gitarCssUrl,
};

const preview: Preview = {
  globalTypes: {
    brand: {
      description: 'Brand theme (CSS token set)',
      toolbar: {
        icon: 'paintbrush',
        items: [
          { value: 'sonar', title: 'Sonar' },
          { value: 'gitar', title: 'Gitar' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: {
    brand: 'sonar',
  },
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
      options: {
        light: {
          name: 'light',
          value: 'rgb(255,255,255)',
        },

        dark: {
          name: 'dark',
          value: 'rgb(42,47,64)',
        },
      },
    },
    docs: {
      codePanel: true,
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: Object.fromEntries(Object.entries<string>(Theme)),
      defaultTheme: 'light',
      attributeName: 'data-echoes-theme',
      parentSelector: 'html',
    }),
    (Story, context) => {
      const brand = (context.globals.brand as string) ?? 'sonar';

      for (const [name, url] of Object.entries(brandStylesheets)) {
        const id = `echoes-brand-${name}`;
        if (!document.getElementById(id)) {
          const link = document.createElement('link');
          link.id = id;
          link.rel = 'stylesheet';
          link.href = url;
          document.head.appendChild(link);
        }
        (document.getElementById(id) as HTMLLinkElement).disabled = name !== brand;
      }

      return <Story />;
    },
    (Story) => {
      return (
        <CacheProvider value={emotionCache}>
          <IntlProvider defaultLocale="en-us" locale="en-us">
            <MemoryRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
              <EchoesProvider router={reactRouterAdapter}>
                <Global styles={globalStyles} />
                <ResetLayerStack>
                  <Story />
                </ResetLayerStack>
              </EchoesProvider>
            </MemoryRouter>
          </IntlProvider>
        </CacheProvider>
      );
    },
  ],
  tags: ['autodocs'],
};

/*
 * This ensures tooltips and other "floating" elements appended to the body are placed on top
 * of the rest of the UI.
 */
const ResetLayerStack = styled.div`
  isolation: isolate;
  position: relative;
`;

export default preview;
