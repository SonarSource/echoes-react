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

import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { HeadlessMantineProvider } from '@mantine/core';
import { PropsWithChildren, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { Toaster as ToastContainer } from 'sonner';
import { ToastGlobalStyles } from '~common/components/Toast';
import { TooltipProvider, TooltipProviderProps, TypographyGlobalStyles } from '..';
import { SelectGlobalStyles } from '../select/SelectCommons';
import { NonceContext } from './NonceContext';

export interface EchoesProviderProps {
  /**
   * A nonce value for inline styles (Content Security Policy - CSP) (optional).
   * When provided, this nonce will be:
   * - Applied to Emotion's CSS-in-JS style tags
   * - Made available to components like Spotlight that need it for inline styles
   * - Used to comply with strict Content Security Policy requirements
   *
   * This should be set once at the application root and will automatically
   * propagate to all Echoes components that require it.
   */
  nonce?: string;
  /**
   * Custom class name for all the toasts (optional).
   */
  toastsClassName?: string;
  /**
   * Maximum number of toast notifications visible simultaneously (optional).
   * When this limit is reached, older toasts will be automatically dismissed
   * to make room for new ones. The default is 5.
   */
  toastsVisibleNb?: number;
  /**
   * Delay in milliseconds before tooltips appear on hover (optional).
   * Controls the global delay duration for all tooltips in the application.
   * If not specified, the default tooltip delay of 500ms will be used.
   */
  tooltipsDelayDuration?: TooltipProviderProps['delayDuration'];
}

/**
 * Root provider component for the Echoes design system.
 *
 * Sets up the global context, styling, and functionality required by all Echoes components.
 * This includes typography styles, toast notifications, tooltips, and component-specific
 * global styles.
 *
 * It must be placed at the root of your application (or at least wrap all
 * components that use the Echoes design system). To ensure all Echoes components work properly,
 * the EchoesProvider should be placed inside the react-intl provider and react-router provider.
 * Ideally, you should also wrap your application with a div that reset the
 * [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
 * for your app to ensure that tooltips and toasts from Echoes appear above the rest of the UI.
 *
 * **Usage**
 *
 * ```tsx
 * import { EchoesProvider } from '@sonarsource/echoes-react';
 *
 * function App() {
 *   return (
 *     <IntlProvider>
 *       <RouterProvider router={createBrowserRouter(
 *         createRoutesFromElements(
 *           <Route
 *             element={
 *               <EchoesProvider>
 *                 <ResetLayerStack>
 *                   <Outlet />
 *                 </ResetLayerStack>
 *               </EchoesProvider>
 *             }
 *           >
 *             <Route path="/" element={<YourApplication />} />
 *           </Route>
 *         )
 *       )} />
 *     </IntlProvider>
 *   );
 * }
 * ```
 *
 * **Content Security Policy (CSP) Support**
 *
 * If your application uses a strict Content Security Policy, you can provide a nonce
 * to enable inline styles required by Echoes components:
 *
 * ```tsx
 * function App() {
 *   // Get nonce from meta tag or server context
 *   const nonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
 *
 *   return (
 *     <EchoesProvider nonce={nonce}>
 *       {children}
 *     </EchoesProvider>
 *   );
 * }
 * ```
 */
export function EchoesProvider(props: PropsWithChildren<EchoesProviderProps>) {
  const { children, nonce, tooltipsDelayDuration, toastsClassName, toastsVisibleNb = 5 } = props;
  const intl = useIntl();

  // Create Emotion cache with nonce support for CSP compliance
  // Use 'echoes' as the key for better namespace isolation and debugging
  const emotionCache = useMemo(() => {
    if (!nonce) {
      return undefined;
    }

    const cache = createCache({ key: 'echoes', nonce });
    cache.compat = true;

    return cache;
  }, [nonce]);

  const providerContent = (
    <NonceContext.Provider value={nonce}>
      <TypographyGlobalStyles />
      <SelectGlobalStyles />
      <ToastGlobalStyles />
      <TooltipProvider delayDuration={tooltipsDelayDuration}>
        <HeadlessMantineProvider>{children}</HeadlessMantineProvider>
        <ToastContainer
          containerAriaLabel={intl.formatMessage({
            id: 'toasts.keyboard_shortcut_aria_label',
            defaultMessage: 'Focus toasts messages with',
            description: 'ARIA-label for the toasts container keyboard shortcut',
          })}
          position="bottom-right"
          toastOptions={{ className: toastsClassName }}
          visibleToasts={toastsVisibleNb}
        />
      </TooltipProvider>
    </NonceContext.Provider>
  );

  // Only wrap with CacheProvider if a nonce is provided
  return emotionCache ? (
    <CacheProvider value={emotionCache}>{providerContent}</CacheProvider>
  ) : (
    providerContent
  );
}

EchoesProvider.displayName = 'EchoesProvider';
