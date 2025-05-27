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
import { forwardRef, ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { isDefined } from '~common/helpers/types';
import { MessageDismissButton } from './MessageDismissButton';
import { MessageScreenReaderPrefix } from './MessageScreenReaderPrefix';
import {
  MESSAGE_CALLOUT_TYPE_STYLE,
  MESSAGE_TYPE_ICON,
  MessageCalloutContainer,
  MessageCalloutFooter,
  MessageCalloutIconWrapper,
  MessageCalloutMainContent,
  MessageCalloutTextWrapper,
  MessageCalloutTitleWrapper,
} from './MessageStyles';
import { MessageType } from './MessageTypes';

export interface MessageProps {
  action?: ReactNode;
  className?: string;
  onDismiss?: VoidFunction;
  screenReaderPrefix?: string;
  text: ReactNode;
  title?: string;
  type: `${MessageType}`;
}

export const MessageCallout = forwardRef<HTMLDivElement, MessageProps>((props, ref) => {
  const { action, className, onDismiss, screenReaderPrefix, text, title, type, ...radixProps } =
    props;
  const isDismissable = isDefined(onDismiss);

  const intl = useIntl();

  return (
    <MessageCalloutContainer
      className={className}
      css={useMemo(() => MESSAGE_CALLOUT_TYPE_STYLE[type], [type])}
      ref={ref}
      {...radixProps}>
      <MessageCalloutMainContent>
        <MessageCalloutIconWrapper addMargin={isDefined(title)}>
          {MESSAGE_TYPE_ICON[type]}
        </MessageCalloutIconWrapper>
        <MessageCalloutTextWrapper>
          <MessageScreenReaderPrefix screenReaderPrefix={screenReaderPrefix} type={type} />
          {isDefined(title) && <MessageCalloutTitleWrapper>{title}</MessageCalloutTitleWrapper>}
          <div>{text}</div>
        </MessageCalloutTextWrapper>

        {isDismissable && (
          <MessageDismissButton
            ariaLabel={intl.formatMessage({
              id: 'message_callout.dismiss',
              defaultMessage: 'Dismiss',
              description: 'ARIA-label for the dismiss button at the top of the Modal.',
            })}
            onClick={onDismiss}
          />
        )}
      </MessageCalloutMainContent>
      {isDefined(action) && <MessageCalloutFooter>{action}</MessageCalloutFooter>}
    </MessageCalloutContainer>
  );
});
MessageCallout.displayName = 'MessageCallout';
