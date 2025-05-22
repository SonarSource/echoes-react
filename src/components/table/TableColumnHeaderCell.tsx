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
import { forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { Button } from '../buttons';
import { IconArrowDown, IconArrowUp } from '../icons';
import { cellBaseStyle } from './TableStyles';
import { TableCellJustify, TableSortDirection } from './TableTypes';

export interface Props {
  className?: string;
  justify?: `${TableCellJustify}`;
  label?: TextNode;
  onSort?: () => void;
  sortDirection?: `${TableSortDirection}`;
}

export const TableColumnHeaderCell = forwardRef<HTMLTableCellElement, Props>((props, ref) => {
  const {
    className,
    justify = TableCellJustify.Start,
    label,
    onSort,
    sortDirection,
    ...radixProps
  } = props;

  if (isDefined(onSort)) {
    return (
      <StyledTableColumnHeaderCell
        className={className}
        justify={justify}
        ref={ref}
        {...radixProps}>
        <Button
          onClick={onSort}
          suffix={sortDirection === TableSortDirection.Asc ? <IconArrowUp /> : <IconArrowDown />}
          variety="default-ghost">
          {label}
        </Button>
      </StyledTableColumnHeaderCell>
    );
  }

  return (
    <StyledTableColumnHeaderCell className={className} justify={justify} ref={ref} {...radixProps}>
      {label}
    </StyledTableColumnHeaderCell>
  );
});

TableColumnHeaderCell.displayName = 'TableColumnHeaderCell';

const StyledTableColumnHeaderCell = styled.th<Required<Pick<Props, 'justify'>>>`
  ${cellBaseStyle}

  background-color: var(--table-header-background-color);

  gap: var(--echoes-dimension-space-100);

  justify-content: ${({ justify }) => justify};
`;
