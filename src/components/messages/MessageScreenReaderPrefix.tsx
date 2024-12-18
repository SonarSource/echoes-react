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
import styled from '@emotion/styled';
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { screenReaderOnly } from '~common/helpers/styles';
import { MessageType } from './MessageTypes';

interface Props {
  screenReaderPrefix?: string;
  type: MessageType;
}

export const MessageScreenReaderPrefix = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { screenReaderPrefix, type, ...radixProps } = props;
  return (
    <ScreenReaderPrefix ref={ref} {...radixProps}>
      {screenReaderPrefix ?? <MessagePrefix type={type} />}
    </ScreenReaderPrefix>
  );
});
MessageScreenReaderPrefix.displayName = 'MessageScreenReaderPrefix';

function MessagePrefix({ type }: { type: MessageType }) {
  const intl = useIntl();

  const messages: { [type in MessageType]: string } = useMemo(
    () => ({
      [MessageType.Info]: intl.formatMessage({
        id: 'message.prefix.info',
        defaultMessage: 'Information:',
      }),
      [MessageType.Danger]: intl.formatMessage({
        id: 'message.prefix.danger',
        defaultMessage: 'Error:',
      }),
      [MessageType.Warning]: intl.formatMessage({
        id: 'message.prefix.warning',
        defaultMessage: 'Warning:',
      }),
      [MessageType.Discover]: intl.formatMessage({
        id: 'message.prefix.discover',
        defaultMessage: 'Hint:',
      }),
      [MessageType.Success]: intl.formatMessage({
        id: 'message.prefix.success',
        defaultMessage: 'Success:',
      }),
    }),
    [intl],
  );

  return messages[type];
}

const ScreenReaderPrefix = styled.span`
  ${screenReaderOnly}
`;
ScreenReaderPrefix.displayName = 'ScreenReaderPrefix';
