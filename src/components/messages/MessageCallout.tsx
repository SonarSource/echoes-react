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
import styled from '@emotion/styled';
import { forwardRef, PropsWithChildren, ReactNode, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { DismissButton } from '~common/components/DismissButton';
import { isDefined } from '~common/helpers/types';
import { MessageScreenReaderPrefix } from './MessageScreenReaderPrefix';
import {
  MESSAGE_CALLOUT_VARIETY_STYLE,
  MESSAGE_VARIETY_ICON,
  MessageCalloutContainer,
  MessageCalloutFooter,
  MessageCalloutIconWrapper,
  MessageCalloutMainContent,
  MessageCalloutTextWrapper,
  MessageCalloutTitleWrapper,
} from './MessageStyles';
import { MessageVariety } from './MessageTypes';

import { cssVar } from '~utils/design-tokens';

export interface MessageCalloutProps extends PropsWithChildren {
  action?: ReactNode;
  className?: string;
  onDismiss?: VoidFunction;
  screenReaderPrefix?: string;
  title?: string;
  variety: `${MessageVariety}`;
}

export const MessageCallout = forwardRef<HTMLDivElement, MessageCalloutProps>((props, ref) => {
  const {
    action,
    children,
    className,
    onDismiss,
    screenReaderPrefix,
    title,
    variety,
    ...radixProps
  } = props;
  const isDismissable = isDefined(onDismiss);

  const intl = useIntl();

  return (
    <MessageCalloutContainer
      className={className}
      css={useMemo(() => MESSAGE_CALLOUT_VARIETY_STYLE[variety], [variety])}
      ref={ref}
      {...radixProps}>
      <MessageCalloutMainContent>
        <MessageCalloutIconWrapper addMargin={isDefined(title)}>
          {MESSAGE_VARIETY_ICON[variety]}
        </MessageCalloutIconWrapper>

        <MessageCalloutTextWrapper>
          <MessageScreenReaderPrefix screenReaderPrefix={screenReaderPrefix} variety={variety} />

          {isDefined(title) && <MessageCalloutTitleWrapper>{title}</MessageCalloutTitleWrapper>}

          <div>{children}</div>
        </MessageCalloutTextWrapper>

        {isDismissable && (
          <MessageCalloutDismissButton
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

const MessageCalloutDismissButton = styled(DismissButton)`
  margin-top: calc(-1 * ${cssVar('dimension-space-25')});
  margin-bottom: calc(-1 * ${cssVar('dimension-space-25')});
`;
MessageCalloutDismissButton.displayName = 'MessageCalloutDismissButton';
