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

import classNames from 'classnames';
import { forwardRef } from 'react';
import { StyledTable } from './TableStyles';
import { TableProps, TableVariety } from './TableTypes';

export const TableRoot = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    className,
    children,
    gridTemplate,
    variety = TableVariety.Ghost,
    ...radixProps
  } = props;

  return (
    <StyledTable
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames(
        { 'table-variety-surface': variety === TableVariety.Surface },
        className,
      )}
      gridTemplate={gridTemplate}
      ref={ref}
      variety={variety}
      {...radixProps}>
      {children}
    </StyledTable>
  );
});

TableRoot.displayName = 'Table';
