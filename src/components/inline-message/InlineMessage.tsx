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
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { ButtonIcon } from '../buttons';
import { IconX } from '../icons';
import {
  INLINE_MESSAGE_TYPE_ICON,
  INLINE_MESSAGE_TYPE_STYLE,
  InlineMessageContainer,
  InlineMessageMainContent,
  InlineMessageTextWrapper,
} from './InlineMessageStyles';
import { InlineMessageHighlight, InlineMessageType } from './InlineMessageTypes';

interface Props {
  highlight: InlineMessageHighlight;
  onDismiss?: VoidFunction;
  text: string;
  title?: string;
  type: InlineMessageType;
}

export const InlineMessage = forwardRef<HTMLDivElement, Props>((props, ref) => {
  const { highlight, onDismiss, text, title, type } = props;
  const isDismissable = isDefined(onDismiss);

  const intl = useIntl();

  return (
    <InlineMessageContainer
      css={useMemo(
        () => ({
          ...INLINE_MESSAGE_TYPE_STYLE[type],
          // Overwrite the background color if Ghost
          ...(highlight === InlineMessageHighlight.Ghost && {
            '--inline-message-background': 'var(--echoes-color-background-transparent)',
          }),
        }),
        [highlight, type],
      )}
      ref={ref}>
      <InlineMessageMainContent>
        {INLINE_MESSAGE_TYPE_ICON[type]}
        <InlineMessageTextWrapper>
          {isDefined(title) && <div>{title}</div>}
          <div>{text}</div>
        </InlineMessageTextWrapper>

        {isDismissable && (
          <ButtonIcon
            Icon={IconX}
            ariaLabel={intl.formatMessage({
              id: 'inline.message.dismiss',
              defaultMessage: 'Dismiss',
              description: 'ARIA-label for the dismiss button at the top of the Modal.',
            })}
            onClick={onDismiss}
          />
        )}
      </InlineMessageMainContent>
    </InlineMessageContainer>
  );
});
InlineMessage.displayName = 'InlineMessage';
