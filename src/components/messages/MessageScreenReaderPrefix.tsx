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
import { forwardRef, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { ScreenReaderPrefix } from '~common/components/ScreenReaderPrefix';
import { TextNode } from '~types/utils';
import { MessageVariety } from './MessageTypes';

interface Props {
  screenReaderPrefix?: TextNode;
  variety: `${MessageVariety}`;
}

export const MessageScreenReaderPrefix = forwardRef<HTMLSpanElement, Props>((props, ref) => {
  const { screenReaderPrefix, variety, ...radixProps } = props;
  return (
    <ScreenReaderPrefix ref={ref} {...radixProps}>
      {screenReaderPrefix ?? <MessagePrefix variety={variety} />}
    </ScreenReaderPrefix>
  );
});
MessageScreenReaderPrefix.displayName = 'MessageScreenReaderPrefix';

function MessagePrefix({ variety }: Pick<Props, 'variety'>) {
  const intl = useIntl();

  const messages: { [variety in MessageVariety]: string } = useMemo(
    () => ({
      [MessageVariety.Info]: intl.formatMessage({
        id: 'message.prefix.info',
        defaultMessage: 'Information:',
      }),
      [MessageVariety.Danger]: intl.formatMessage({
        id: 'message.prefix.danger',
        defaultMessage: 'Error:',
      }),
      [MessageVariety.Warning]: intl.formatMessage({
        id: 'message.prefix.warning',
        defaultMessage: 'Warning:',
      }),
      [MessageVariety.Discover]: intl.formatMessage({
        id: 'message.prefix.discover',
        defaultMessage: 'Hint:',
      }),
      [MessageVariety.Success]: intl.formatMessage({
        id: 'message.prefix.success',
        defaultMessage: 'Success:',
      }),
    }),
    [intl],
  );

  return messages[variety];
}

MessagePrefix.displayName = 'MessagePrefix';
