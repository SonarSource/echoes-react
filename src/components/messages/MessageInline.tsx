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
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { LiveRegionAnnouncementMode } from '~types/LiveRegionAnnouncementMode';
import { MessageScreenReaderPrefix } from './MessageScreenReaderPrefix';
import { MESSAGE_VARIETY_ICON } from './MessageStyles';
import { MessageInlineSize, MessageVariety } from './MessageTypes';

import { cssVar } from '~utils/design-tokens';

export interface MessageInlineProps {
  /**
   * Adds `status` or `alert` live-region semantics to the rendered message.
   * Defaults to no explicit live-region semantics.
   * Set `status` for contextual status updates or `alert` for urgent messages.
   * Screen reader announcements are most reliable when an already-mounted
   * message updates its content.
   */
  announcementMode?: `${LiveRegionAnnouncementMode}`;
  as?: 'div' | 'span';
  className?: string;
  id?: string;
  screenReaderPrefix?: string;
  size?: `${MessageInlineSize}`;
  variety: `${MessageVariety}`;
}

/**
 * A compact message that flows inline with surrounding text or controls.
 * Use it for short contextual feedback tied to nearby content. Set
 * `announcementMode` only when the message should also be announced by
 * assistive technology.
 */
export const MessageInline = forwardRef<HTMLElement, PropsWithChildren<MessageInlineProps>>(
  (props, ref) => {
    const {
      announcementMode,
      children,
      className,
      screenReaderPrefix,
      size,
      variety,
      ...radixProps
    } = props;

    return (
      <MessageInlineContainer
        className={className}
        css={useMemo(() => MESSAGE_INLINE_VARIETY_STYLE[variety], [variety])}
        ref={ref}
        size={size}
        {...radixProps}>
        <span>{MESSAGE_VARIETY_ICON[variety]}</span>

        <MessageInlineTextWrapper role={announcementMode}>
          <MessageScreenReaderPrefix screenReaderPrefix={screenReaderPrefix} variety={variety} />

          {children}
        </MessageInlineTextWrapper>
      </MessageInlineContainer>
    );
  },
);
MessageInline.displayName = 'MessageInline';

const MESSAGE_INLINE_VARIETY_STYLE = {
  [MessageVariety.Info]: {
    '--message-text-color': cssVar('color-text-info'),
  },
  [MessageVariety.Danger]: {
    '--message-text-color': cssVar('color-text-danger'),
  },
  [MessageVariety.Warning]: {
    '--message-text-color': cssVar('color-text-warning'),
  },
  [MessageVariety.Success]: {
    '--message-text-color': cssVar('color-text-success'),
  },
  [MessageVariety.Discover]: {
    '--message-text-color': cssVar('color-text-accent'),
  },
};

const MESSAGE_INLINE_FONT = {
  [MessageInlineSize.Small]: cssVar('typography-text-small-regular'),
  [MessageInlineSize.Default]: cssVar('typography-text-default-regular'),
};

const MessageInlineContainer = styled.span<Pick<MessageInlineProps, 'size'>>`
  display: inline-flex;
  align-items: start;
  gap: ${cssVar('dimension-space-50')};

  ${({ size }) => (size ? `font: ${MESSAGE_INLINE_FONT[size]};` : '')}
`;
MessageInlineContainer.displayName = 'MessageInlineContainer';

const MessageInlineTextWrapper = styled.span`
  color: var(--message-text-color);
`;
MessageInlineTextWrapper.displayName = 'MessageInlineTextWrapper';
