/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { RenderOptions, render as rtlRender } from '@testing-library/react';
import userEvent, { Options as UserEventsOptions } from '@testing-library/user-event';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { PropsWithLabels } from '~types/utils';
import { TooltipProvider } from '../../components/tooltip';

export function render(
  ui: React.ReactElement,
  options?: RenderOptions,
  userEventOptions?: UserEventsOptions,
) {
  return {
    ...rtlRender(ui, { wrapper: ContextWrapper, ...options }),
    user: userEvent.setup(userEventOptions),
  };
}

function ContextWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <IntlProvider defaultLocale="en-us" locale="en-us">
      <TooltipProvider delayDuration={0}>{children}</TooltipProvider>
    </IntlProvider>
  );
}

export type OmitPropsWithLabels<T extends React.JSXElementConstructor<any>> = Partial<
  Omit<ComponentProps<T>, keyof PropsWithLabels<{}>>
> &
  PropsWithLabels<{}>;
