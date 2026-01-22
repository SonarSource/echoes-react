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

import { HeadlessMantineProvider } from '@mantine/core';
import { PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import { Toaster as ToastContainer } from 'sonner';
import { ToastGlobalStyles } from '~common/components/Toast';
import { TooltipProvider, TooltipProviderProps, TypographyGlobalStyles } from '..';
import { ModalPortal } from '../modals/ModalPortal';
import { SelectGlobalStyles } from '../select/SelectCommons';

export interface EchoesProviderProps {
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
 * Ideally, you should also wrap your application with a div that reset the [Stacking Context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context)
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
 */
export function EchoesProvider(props: PropsWithChildren<EchoesProviderProps>) {
  const { children, tooltipsDelayDuration, toastsClassName, toastsVisibleNb = 5 } = props;
  const intl = useIntl();

  return (
    <>
      <TypographyGlobalStyles />
      <SelectGlobalStyles />
      <ToastGlobalStyles />
      <TooltipProvider delayDuration={tooltipsDelayDuration}>
        <ModalPortal>
          <HeadlessMantineProvider>{children}</HeadlessMantineProvider>
        </ModalPortal>
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
    </>
  );
}

EchoesProvider.displayName = 'EchoesProvider';
