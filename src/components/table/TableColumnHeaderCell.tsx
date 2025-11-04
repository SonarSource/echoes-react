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
import { forwardRef, ReactNode } from 'react';
import { isDefined } from '~common/helpers/types';
import { TextNode } from '~types/utils';
import { Button } from '../buttons';
import { IconArrowDown, IconArrowUp } from '../icons';
import { ToggleTip, ToggleTipProps } from '../toggle-tip';
import { StyledTableColumnHeaderCell } from './TableStyles';
import { TableCellJustify, TableSortDirection } from './TableTypes';

import { cssVar } from '~utils/design-tokens';

export interface TableColumnHeaderCellProps {
  className?: string;
  justify?: `${TableCellJustify}`;
  label?: TextNode;
  onSort?: () => void;
  sortDirection?: `${TableSortDirection}`;
  toggleTip?: ToggleTipProps;
}

export const TableColumnHeaderCell = forwardRef<HTMLTableCellElement, TableColumnHeaderCellProps>(
  (props, ref) => {
    const {
      className,
      justify = TableCellJustify.Start,
      label,
      onSort,
      sortDirection,
      toggleTip,
      ...radixProps
    } = props;

    if (isDefined(onSort)) {
      const sortProps = getSortProps(sortDirection);

      return (
        <StyledTableColumnHeaderCell
          {...radixProps}
          // ARIA sort is recommended by WCAG
          // https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/#indicatingsortorderwitharia-sort
          aria-sort={sortProps.aria}
          className={className}
          css={{
            justifyContent: justify,
            padding: cssVar('dimension-space-100'),
          }}
          ref={ref}>
          <Button onClick={onSort} size="medium" suffix={sortProps.icon} variety="default-ghost">
            {label}
          </Button>
        </StyledTableColumnHeaderCell>
      );
    }

    return (
      <StyledTableColumnHeaderCell
        {...radixProps}
        className={className}
        css={{ justifyContent: justify }}
        ref={ref}>
        {label}
        {toggleTip && <StyledToggleTip {...toggleTip} />}
      </StyledTableColumnHeaderCell>
    );
  },
);

TableColumnHeaderCell.displayName = 'TableColumnHeaderCell';

/*
 * This is a placeholder so the header label doesn't 'dance around'
 * when sorting another column.
 * It also appears on hover, to hint at the effect of clicking.
 */
const StyledSortIconPlaceholder = styled(IconArrowUp)`
  visibility: hidden;

  ${StyledTableColumnHeaderCell}:hover & {
    visibility: visible;
  }
`;
StyledSortIconPlaceholder.displayName = 'StyledSortIconPlaceholder';

/* Necessary to play well with 'min-content' */
const StyledToggleTip = styled(ToggleTip)`
  flex: 0 0 auto;
`;
StyledToggleTip.displayName = 'StyledToggleTip';

function getSortProps(direction?: TableColumnHeaderCellProps['sortDirection']): {
  aria: React.AriaAttributes['aria-sort'];
  icon: ReactNode;
} {
  switch (direction) {
    case TableSortDirection.Asc:
      return {
        aria: 'ascending',
        icon: <IconArrowUp />,
      };

    case TableSortDirection.Desc:
      return {
        aria: 'descending',
        icon: <IconArrowDown />,
      };

    default:
      return {
        aria: undefined,
        icon: <StyledSortIconPlaceholder />,
      };
  }
}
