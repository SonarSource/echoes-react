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

import { act, RenderOptions, RenderResult, render as rtlRender } from '@testing-library/react';
import userEvent, { UserEvent, Options as UserEventsOptions } from '@testing-library/user-event';
import React, { ComponentProps, PropsWithChildren } from 'react';
import { IntlProvider } from 'react-intl';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { type ToastId } from '~common/components/Toast';
import { PropsWithLabels, PropsWithLabelsAndHelpText } from '~types/utils';
import { EchoesProvider } from '../../components/echoes-provider';
import { toast } from '../../utils';

type RenderResultWithUser = RenderResult & { user: UserEvent };

interface ToastTestStateOptions {
  cleanupTrackedToast?: (toastId: ToastId) => void;
}

function dismissTrackedToasts(
  trackedToastIds: ReadonlySet<ToastId>,
  cleanupTrackedToast?: (toastId: ToastId) => void,
) {
  act(() => {
    for (const toastId of trackedToastIds) {
      cleanupTrackedToast?.(toastId);
      toast.dismiss(toastId);
    }
  });
}

function waitForNextAnimationFrame() {
  return new Promise<void>((resolve) => {
    globalThis.requestAnimationFrame(() => resolve());
  });
}

async function waitForToastDismissAnimationFrame() {
  await act(waitForNextAnimationFrame);
}

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

export function createToastTestState(options: Readonly<ToastTestStateOptions> = {}) {
  const trackedToastIds = new Set<ToastId>();

  function trackToastId(toastId: ToastId) {
    // Remember every created toast so afterEach can dismiss leftovers and keep tests isolated.
    trackedToastIds.add(toastId);

    return toastId;
  }

  async function resetToastTestState() {
    const hasTrackedToasts = trackedToastIds.size > 0;

    dismissTrackedToasts(trackedToastIds, options.cleanupTrackedToast);

    trackedToastIds.clear();
    jest.useRealTimers();

    if (!hasTrackedToasts) {
      return;
    }

    // Sonner applies part of toast dismissal on the next animation frame, so wait for that
    // deferred update inside `act(...)` before the next test starts.
    await waitForToastDismissAnimationFrame();
  }

  return {
    resetToastTestState,
    trackToastId,
  };
}

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
