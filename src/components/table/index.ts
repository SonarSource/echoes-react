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
import { TableCellLink } from './TableCellLink';
import { TableCellNumber } from './TableCellNumber';
import { TableCellText } from './TableCellText';
import { TableColumnHeaderCell } from './TableColumnHeaderCell';
import { TableRowHeaderCell } from './TableRowHeaderCell';
import { StyledTableBody, StyledTableCell, StyledTableHeader, StyledTableRow } from './TableStyles';

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
   * {@link StyledTableHeader | Table.Header}
   */
  Header: StyledTableHeader,
  /**
   * {@link StyledTableBody | Table.Body}
   */
  Body: StyledTableBody,
  /**
   * {@link StyledTableRow | Table.Row}
   */
  Row: StyledTableRow,

  /**
   * {@link TableRowHeaderCell | Table.RowHeaderCell}
   */
  RowHeaderCell: TableRowHeaderCell,

  /**
   * {@link TableColumnHeaderCell | Table.ColumnHeaderCell}
   */
  ColumnHeaderCell: TableColumnHeaderCell,

  /**
   * {@link StyledTableCell | Table.Cell}
   *
   * This is a plain cell:
   * it serves as an escape hatch if you need a cell with custom content
   *
   * Use as a last resort!
   */
  Cell: StyledTableCell,

  /**
   * {@link TableCellText | Table.CellText}
   *
   * This is a simple cell to display text
   */
  CellText: TableCellText,

  /**
   * {@link TableCellNumber | Table.CellNumber}
   *
   * This is a cell to display a number
   */
  CellNumber: TableCellNumber,

  /**
   * {@link TableCellLink | Table.CellLink}
   *
   * This is a cell to display a Link
   */
  CellLink: TableCellLink,
});
