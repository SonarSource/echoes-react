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

import { TableRoot } from './Table';
import { TableColumnHeaderCell } from './TableColumnHeaderCell';
import {
  StyledTableBody,
  StyledTableCell,
  StyledTableHeader,
  StyledTableRowHeaderCell,
  TableRow,
} from './TableStyles';

export { TableVariety, type TableBaseProps } from './TableTypes';

/**
 * {@link TableRoot | Table} ...
 *
 * **Permitted Content**
 *
 * **Example**
 *
 * ```tsx
 *
 * ```
 */
export const Table = Object.assign(TableRoot, {
  /**
   * {@link TableHeader | Table.Header}
   */
  Header: StyledTableHeader,
  /**
   * {@link TableBody | Table.Body}
   */
  Body: StyledTableBody,
  /**
   * {@link TableRow | Table.Row}
   */
  Row: TableRow,

  /**
   * {@link TableRowHeaderCell | Table.RowHeaderCell}
   */
  RowHeaderCell: StyledTableRowHeaderCell,

  /**
   * {@link TableColumnHeaderCell | Table.ColumnHeaderCell}
   */
  ColumnHeaderCell: TableColumnHeaderCell,

  /**
   * {@link TableCell | Table.Cell}
   */
  Cell: StyledTableCell,
});
