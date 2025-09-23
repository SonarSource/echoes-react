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
import { RenderOptions, render as rtlRender, RenderResult } from '@testing-library/react';
import userEvent, { UserEvent, Options as UserEventsOptions } from '@testing-library/user-event';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { PropsWithLabels, PropsWithLabelsAndHelpText } from '~types/utils';
import { EchoesProvider } from '../../components/echoes-provider';

type RenderResultWithUser = RenderResult & { user: UserEvent };

export function render(
  ui: React.ReactElement,
  options?: RenderOptions,
  userEventOptions?: UserEventsOptions,
): RenderResultWithUser {
  return {
    ...rtlRender(ui, { wrapper: ContextWrapper, ...options }),
    user: userEvent.setup(userEventOptions),
  };
}

export const renderWithMemoryRouter = (
  ui: JSX.Element,
  initialEntries = ['/initial'],
  options?: RenderOptions,
  userEventOptions?: UserEventsOptions,
): RenderResultWithUser => {
  return {
    ...rtlRender(
      <MemoryRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
        initialEntries={initialEntries}>
        <ContextWrapper>
          <Routes>
            <Route
              element={
                <>
                  {ui}
                  <ShowPath />
                </>
              }
              path="/initial"
            />
            <Route element={<ShowPath />} path="/second" />
          </Routes>
        </ContextWrapper>
      </MemoryRouter>,
      options,
    ),
    user: userEvent.setup(userEventOptions),
  };
};

export type OmitPropsWithLabelsAndHelpText<T extends React.JSXElementConstructor<any>> = Partial<
  Omit<ComponentProps<T>, keyof PropsWithLabelsAndHelpText<{}>>
> &
  PropsWithLabelsAndHelpText<{}>;

export type OmitPropsWithLabels<T extends React.JSXElementConstructor<any>> = Partial<
  Omit<ComponentProps<T>, keyof PropsWithLabels<{}>>
> &
  PropsWithLabels<{}>;

function ShowPath() {
  const { pathname } = useLocation();
  return <pre>{pathname}</pre>;
}

function ContextWrapper({ children }: PropsWithChildren<{}>) {
  return (
    <IntlProvider defaultLocale="en-us" locale="en-us">
      <EchoesProvider tooltipsDelayDuration={0}>{children}</EchoesProvider>
    </IntlProvider>
  );
}
