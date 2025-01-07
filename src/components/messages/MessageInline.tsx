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
import { forwardRef, PropsWithChildren, useMemo } from 'react';
import { MessageScreenReaderPrefix } from './MessageScreenReaderPrefix';
import { MESSAGE_TYPE_ICON } from './MessageStyles';
import { MessageInlineSize, MessageType } from './MessageTypes';

interface Props {
  as?: 'div' | 'span';
  className?: string;
  id?: string;
  screenReaderPrefix?: string;
  size?: MessageInlineSize;
  type: MessageType;
}

export const MessageInline = forwardRef<HTMLDivElement, PropsWithChildren<Props>>((props, ref) => {
  const { children, className, screenReaderPrefix, size, type, ...radixProps } = props;
  return (
    <MessageInlineContainer
      className={className}
      css={useMemo(() => MESSAGE_INLINE_TYPE_STYLE[type], [type])}
      ref={ref}
      size={size}
      {...radixProps}>
      {MESSAGE_TYPE_ICON[type]}
      <MessageInlineTextWrapper>
        <MessageScreenReaderPrefix screenReaderPrefix={screenReaderPrefix} type={type} />
        {children}
      </MessageInlineTextWrapper>
    </MessageInlineContainer>
  );
});
MessageInline.displayName = 'MessageInline';

const MESSAGE_INLINE_TYPE_STYLE = {
  [MessageType.Info]: {
    '--message-text-color': 'var(--echoes-color-text-info)',
  },
  [MessageType.Danger]: {
    '--message-text-color': 'var(--echoes-color-text-danger)',
  },
  [MessageType.Warning]: {
    '--message-text-color': 'var(--echoes-color-text-warning)',
  },
  [MessageType.Success]: {
    '--message-text-color': 'var(--echoes-color-text-success)',
  },
  [MessageType.Discover]: {
    '--message-text-color': 'var(--echoes-color-text-accent)',
  },
};

const MESSAGE_INLINE_FONT = {
  [MessageInlineSize.Small]: 'var(--echoes-typography-text-small-medium)',
  [MessageInlineSize.Default]: 'var(--echoes-typography-text-default-regular)',
};

const MessageInlineContainer = styled.span<Pick<Props, 'size'>>`
  ${({ size }) => (size ? `font: ${MESSAGE_INLINE_FONT[size]};` : '')}
`;
MessageInlineContainer.displayName = 'MessageInlineContainer';

const MessageInlineTextWrapper = styled.span`
  padding-left: var(--echoes-dimension-space-50);
  color: var(--message-text-color);
`;
MessageInlineTextWrapper.displayName = 'MessageInlineTextWrapper';
