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
import { TableCellBadge } from './TableCellBadge';
import { TableCellButton } from './TableCellButton';
import { TableCellButtonIcon } from './TableCellButtonIcon';
import { TableCellCheckbox } from './TableCellCheckbox';
import { TableCellLink } from './TableCellLink';
import { TableCellNumber } from './TableCellNumber';
import { TableCellText } from './TableCellText';
import { TableColumnHeaderCell } from './TableColumnHeaderCell';
import { TableColumnHeaderCellCheckbox } from './TableColumnHeaderCellCheckbox';
import { TableRow } from './TableRow';
import { TableRowHeaderCell } from './TableRowHeaderCell';
import { StyledTableBody, StyledTableCell, StyledTableHeader } from './TableStyles';

export { TableVariety, type TableBaseProps } from './TableTypes';

/**
 * {@link TableRoot | Table}
 *
 * The main Table component for Echoes React.
 *
 * This component provides a composable and accessible table structure with a variety of subcomponents
 * for building complex tables. It exposes several specialized cell and header components.
 *
 * It uses CSS grid for its layout, and thus requires the gridTemplate definition.
 * See the {@link https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns | MDN Documentation} for more.
 *
 * **Permitted Content**
 *
 * - `Table.Header`: The table header section.
 * - `Table.Body`: The table body section.
 * - `Table.Row`: A row within the table.
 * - `Table.RowHeaderCell`: A header cell for a row.
 * - `Table.ColumnHeaderCell`: A header cell for a column.
 * - `Table.Cell`: A plain table cell for custom content.
 * - `Table.CellText`: A cell for displaying text.
 * - `Table.CellNumber`: A cell for displaying numbers.
 * - `Table.CellLink`: A cell for displaying links.
 * - `Table.CellButton`: A cell for displaying buttons.
 * - `Table.CellBadge`: A cell for displaying badges.
 * - `Table.CellCheckbox`: A cell for displaying checkboxes.
 * - `Table.ColumnHeaderCellCheckbox`: A header cell for a checkbox column.
 *
 * **example**
 *
 * ```tsx
 * <Table gridTemplate='min-content 1fr auto'>
 *   <Table.Header>
 *     <Table.Row>
 *       <Table.ColumnHeaderCellCheckbox />
 *       <Table.ColumnHeaderCell>Project</Table.ColumnHeaderCell>
 *       <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
 *     </Table.Row>
 *   </Table.Header>
 *   <Table.Body>
 *     <Table.Row>
 *       <Table.CellCheckbox checked={true} />
 *       <Table.CellText>Echoes</Table.CellText>
 *       <Table.CellBadge status="success">Active</Table.CellBadge>
 *     </Table.Row>
 *   </Table.Body>
 * </Table>
 * ```
 *
 * **remarks**
 *
 * Use the specialized cell components (`CellText`, `CellNumber`, etc.) for consistent styling and accessibility.
 * The plain `Cell` component is provided as an escape hatch for custom content and should be used sparingly.
 *
 */
export const Table = Object.assign(TableRoot, {
  /**
   * {@link StyledTableHeader | Table.Header}
   *
   * This is the table header section. It is required!
   */
  Header: StyledTableHeader,

  /**
   * {@link StyledTableBody | Table.Body}
   *
   * This is the table body section. It is required!
   */
  Body: StyledTableBody,

  /**
   * {@link TableRow | Table.Row}
   *
   * This is a table row. Wrap your cells in it.
   * You can make it selectable by defining the `selected` prop as well as adding a {@link TableCellCheckbox | Table.CellCheckbox}.
   */
  Row: TableRow,

  /**
   * {@link TableRowHeaderCell | Table.RowHeaderCell}
   *
   * This is a table row header cell. It must have a label or an aria-label.
   * Each row should have a header cell to identify the item represented in that row.
   * This will typically be a name, or identifier.
   */
  RowHeaderCell: TableRowHeaderCell,

  /**
   * {@link TableColumnHeaderCell | Table.ColumnHeaderCell}
   *
   * This is a table column header cell. It must have a label or an aria-label.
   * It may have a toggletip to describe its purpose.
   *
   * ** Sortable **
   * Providing an `onSort` callback will turn this cell's contents into a button.
   * The sorting mechanism must be implemented by you, but providing the sort order will
   * automatically add an indicator and relevant aria attribute to the header.
   *
   */
  ColumnHeaderCell: TableColumnHeaderCell,

  /**
   * {@link StyledTableCell | Table.Cell}
   *
   * This is a plain cell:
   * it serves as an escape hatch if you need a cell with custom content
   *
   * Only use this as a last resort!
   */
  Cell: StyledTableCell,

  /**
   * {@link TableCellText | Table.CellText}
   *
   * This is a simple cell to display text.
   */
  CellText: TableCellText,

  /**
   * {@link TableCellNumber | Table.CellNumber}
   *
   * This is a cell to display a number.
   */
  CellNumber: TableCellNumber,

  /**
   * {@link TableCellLink | Table.CellLink}
   *
   * This is a cell to display a Link. You may wrap it in a Tooltip if necessary: the Tootlip will be attached to the Link in the cell.
   */
  CellLink: TableCellLink,

  /**
   * {@link TableCellButton | Table.CellButton}
   *
   * This is a cell to display a Button. You may use it as a trigger (Dropdown, Tooltip, Popover, ...).
   */
  CellButton: TableCellButton,

  /**
   * {@link TableCellButtonIcon | Table.CellButtonIcon}
   *
   * This is a cell to display a ButtonIcon. You may use it as a trigger (Dropdown, Tooltip, Popover, ...).
   */
  CellButtonIcon: TableCellButtonIcon,

  /**
   * {@link TableCellBadge | Table.CellBadge}
   *
   * This is a cell to display a Badge. You can make it `isInteractive` and wrap it in a Popover like a regular badge.
   */
  CellBadge: TableCellBadge,

  /**
   * {@link TableCellCheckbox | Table.CellCheckbox}
   *
   * This is a cell to display a Checkbox. Primarily used for selectable rows.
   */
  CellCheckbox: TableCellCheckbox,

  /**
   * {@link TableColumnHeaderCellCheckbox | Table.ColumnHeaderCellCheckbox}
   *
   * This is a header cell for the checkbox column.
   */
  ColumnHeaderCellCheckbox: TableColumnHeaderCellCheckbox,
});
