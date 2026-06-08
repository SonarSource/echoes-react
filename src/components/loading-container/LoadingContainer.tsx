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

import styled from '@emotion/styled';
import { PropsWithChildren, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { LoadingContext } from '~common/components/LoadingContext';
import { screenReaderOnly } from '~common/helpers/styles';

export interface LoadingContainerProps {
  isLoading: boolean;
  /**
   * Specify what the screen reader announces once isLoading switches to `false`
   *
   * @defaultValue "Content loaded"
   */
  loadedMessage?: string;
  /**
   * Specify what the screen reader announces when isLoading is `true`
   *
   * @defaultValue "Loading content"
   */
  loadingMessage?: string;
}

/**
 * This component is mostly for screen readers. It implements an accessible loading pattern.
 * Ideally, use it in conjuction with LoadingSkeletons.
 *
 * The LoadingContainer adds an `aria-busy` attribute around its children.
 * This tells the screen reader to ignore its contents while `isLoading` is `true`.
 * It also creates a Context containing the `isLoading` prop, so any child can easily access it (typically LoadingSkeletons).
 *
 * A screen reader-only `aria-live` span contains the loading status, so the screen reader can announce status changes.
 * Both status messages can be specified.
 */
export function LoadingContainer(props: PropsWithChildren<LoadingContainerProps>) {
  const { children, isLoading, loadedMessage, loadingMessage } = props;

  const loadingContextValue = useMemo(() => ({ isLoading }), [isLoading]);

  return (
    <>
      <LoadingContext.Provider value={loadingContextValue}>
        <div aria-busy={isLoading}>{children}</div>
      </LoadingContext.Provider>

      <ScreenReaderOnlyLive aria-live="polite">
        {isLoading
          ? (loadingMessage ?? (
              <FormattedMessage
                defaultMessage="Loading content"
                description="Default message to be announced by screen readers when the LoadingContainer is loading"
                id="loading_container.default_loading_message"
              />
            ))
          : (loadedMessage ?? (
              <FormattedMessage
                defaultMessage="Content loaded"
                description="Default message to be announced by screen readers when the LoadingContainer has finished loading"
                id="loading_container.default_loaded_message"
              />
            ))}
      </ScreenReaderOnlyLive>
    </>
  );
}

export const ScreenReaderOnlyLive = styled.span`
  ${screenReaderOnly};
`;
ScreenReaderOnlyLive.displayName = 'ScreenReaderOnlyLive';
