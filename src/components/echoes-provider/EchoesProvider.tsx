/*
 * Echoes React
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

import { HeadlessMantineProvider } from '@mantine/core';
import { ComponentProps, PropsWithChildren } from 'react';
import { useIntl } from 'react-intl';
import { Toaster } from 'sonner';
import { ToastGlobalStyles } from '~common/components/Toast';
import { TooltipProvider, TypographyGlobalStyles } from '..';
import { SelectGlobalStyles } from '../select/SelectCommons';

interface Props {
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
  tooltipsDelayDuration?: ComponentProps<typeof TooltipProvider>['delayDuration'];
}

/**
 * Root provider component for the Echoes design system.
 *
 * Sets up the global context, styling, and functionality required by all Echoes components.
 * This includes typography styles, toast notifications, tooltips, and component-specific
 * global styles. Must be placed at the root of your application or at least wrap all
 * components that use the Echoes design system.
 *
 * **Usage**
 *
 * ```tsx
 * import { EchoesProvider } from '@sonarsource/echoes-react';
 *
 * function App() {
 *   return (
 *     <EchoesProvider>
 *       <YourApplication />
 *     </EchoesProvider>
 *   );
 * }
 * ```
 */
export function EchoesProvider(props: PropsWithChildren<Props>) {
  const { children, tooltipsDelayDuration, toastsVisibleNb = 5 } = props;
  const intl = useIntl();

  return (
    <>
      <TypographyGlobalStyles />
      <SelectGlobalStyles />
      <ToastGlobalStyles />
      <TooltipProvider delayDuration={tooltipsDelayDuration}>
        <HeadlessMantineProvider>{children}</HeadlessMantineProvider>
        <Toaster
          containerAriaLabel={intl.formatMessage({
            id: 'toasts.keyboard_shortcut_aria_label',
            defaultMessage: 'Focus toasts messages with',
            description: 'ARIA-label for the toasts container keyboard shortcut',
          })}
          position="bottom-right"
          visibleToasts={toastsVisibleNb}
        />
      </TooltipProvider>
    </>
  );
}

EchoesProvider.displayName = 'EchoesProvider';
