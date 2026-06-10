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
import { FormattedMessage } from 'react-intl';
import { screenReaderOnly } from '~common/helpers/styles';
import { TextNode } from '~types/utils';

export interface ScreenReaderOnlyLoadingStatusProps {
  isLoading: boolean;
  /**
   * Specify what the screen reader announces once isLoading switches to `false`
   *
   * @defaultValue "Content loaded"
   */
  loadedMessage?: TextNode;
  /**
   * Specify what the screen reader announces when isLoading is `true`
   *
   * @defaultValue "Loading content"
   */
  loadingMessage?: TextNode;
}

export function ScreenReaderOnlyLoadingStatus(props: Readonly<ScreenReaderOnlyLoadingStatusProps>) {
  const { isLoading, loadedMessage, loadingMessage } = props;

  return (
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
  );
}

const ScreenReaderOnlyLive = styled.span`
  ${screenReaderOnly};
`;
ScreenReaderOnlyLive.displayName = 'ScreenReaderOnlyLive';
