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

import { forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { Text } from '../typography';
import { StyledContentWrapper, StyledTableCell } from './TableStyles';

export interface TableCellNumberProps {
  className?: string;
  content: TextNode;
  description?: TextNode;
}

export const TableCellNumber = forwardRef<HTMLTableCellElement, TableCellNumberProps>(
  (props, ref) => {
    const { className, content, description, ...radixProps } = props;

    return (
      <StyledTableCell
        className={className}
        css={{ justifyContent: 'end' }}
        ref={ref}
        {...radixProps}>
        <StyledContentWrapper css={{ alignItems: 'end' }}>
          {content}

          {isDefined(description) && (
            <Text isSubtle size="small">
              {description}
            </Text>
          )}
        </StyledContentWrapper>
      </StyledTableCell>
    );
  },
);

TableCellNumber.displayName = 'TableCellNumber';
