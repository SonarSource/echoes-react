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
import { forwardRef, ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { MessageDismissButton } from './MessageDismissButton';
import {
  MESSAGE_TYPE_ICON,
  MESSAGE_TYPE_STYLE,
  MessageContainer,
  MessageFooter,
  MessageIconWrapper,
  MessageMainContent,
  MessageTextWrapper,
  MessageTitleWrapper,
} from './MessageStyles';
import { MessageType } from './MessageTypes';

export interface MessageProps {
  action?: ReactNode;
  onDismiss?: VoidFunction;
  text: ReactNode;
  title?: string;
  type: MessageType;
}

export const MessageBase = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {
  const { action, onDismiss, text, title, type, ...radixProps } = props;
  const isDismissable = isDefined(onDismiss);

  const intl = useIntl();

  return (
    <MessageContainer
      {...radixProps}
      css={useMemo(() => MESSAGE_TYPE_STYLE[type], [type])}
      ref={ref}>
      <MessageMainContent>
        <MessageIconWrapper addMargin={isDefined(title)}>
          {MESSAGE_TYPE_ICON[type]}
        </MessageIconWrapper>
        <MessageTextWrapper>
          {isDefined(title) && <MessageTitleWrapper>{title}</MessageTitleWrapper>}
          <div>{text}</div>
        </MessageTextWrapper>

        {isDismissable && (
          <MessageDismissButton
            ariaLabel={intl.formatMessage({
              id: 'inline.message.dismiss',
              defaultMessage: 'Dismiss',
              description: 'ARIA-label for the dismiss button at the top of the Modal.',
            })}
            onClick={onDismiss}
          />
        )}
      </MessageMainContent>
      {isDefined(action) && <MessageFooter>{action}</MessageFooter>}
    </MessageContainer>
  );
});
MessageBase.displayName = 'MessageBase';
