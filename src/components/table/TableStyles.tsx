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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TableProps, TableVariety } from './TableTypes';

import { cssVar } from '~utils/design-tokens';

const TABLE_VARIETY_STYLES = {
  [TableVariety.Surface]: {
    '--table-header-background-color': cssVar('table-colors-background-header-default'),
    border: `${cssVar('border-width-default')} solid ${cssVar('color-border-bold')}`,
    'border-collapse': 'separate',
  },
  [TableVariety.Ghost]: {
    '--table-header-background-color': cssVar('color-surface-default'),
    border: 'none',
    'border-collapse': 'collapse',
  },
};

export const StyledTable = styled.table<Required<Pick<TableProps, 'variety' | 'gridTemplate'>>>`
  display: grid;

  grid-template-columns: ${(props) => props.gridTemplate};

  border-radius: ${cssVar('border-radius-200')};
  border-spacing: 0;

  ${({ variety }) => TABLE_VARIETY_STYLES[variety]}
`;
StyledTable.displayName = 'StyledTable';

export const StyledTableHeader = styled.thead`
  display: contents;
`;
StyledTableHeader.displayName = 'StyledTableHeader';

export const StyledTableBody = styled.tbody`
  display: contents;
`;
StyledTableBody.displayName = 'StyledTableBody';

export const StyledTableRow = styled.tr`
  display: contents;

  .table-variety-surface thead &:first-of-type {
    border-top-left-radius: ${cssVar('border-radius-200')};
    border-top-right-radius: ${cssVar('border-radius-200')};
  }

  .table-variety-surface tbody &:last-of-type {
    border-bottom-left-radius: ${cssVar('border-radius-200')};
    border-bottom-right-radius: ${cssVar('border-radius-200')};
  }
`;
StyledTableRow.displayName = 'StyledTableRow';

export const cellBaseStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};

  box-sizing: border-box;
  min-height: ${cssVar('table-sizes-row-min-width-default')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-200')};

  font: ${cssVar('typography-text-default-regular')};

  tbody & {
    border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  }

  .table-variety-surface thead tr:first-child &:first-child {
    border-top-left-radius: ${cssVar('border-radius-200')};
  }

  .table-variety-surface thead tr:first-child &:last-child {
    border-top-right-radius: ${cssVar('border-radius-200')};
  }

  .table-variety-surface tbody tr:last-child &:first-child {
    border-bottom-left-radius: ${cssVar('border-radius-200')};
  }

  .table-variety-surface tbody tr:last-child &:last-child {
    border-bottom-right-radius: ${cssVar('border-radius-200')};
  }
`;

export const StyledTableCell = styled.td`
  ${cellBaseStyle}

  justify-content: center;

  ${StyledTableRow}:hover:not(.selected) & {
    background-color: ${cssVar('color-surface-hover')};
  }

  ${StyledTableRow}.selected & {
    background-color: ${cssVar('color-background-selected-weak-default')};
  }

  ${StyledTableRow}:hover.selected & {
    background-color: ${cssVar('color-background-selected-weak-hover')};
  }
`;
StyledTableCell.displayName = 'StyledTableCell';

export const StyledTableColumnHeaderCell = styled.th`
  ${cellBaseStyle}

  /* justify-content is variable, defined in TableColumnHeaderCell */

  background-color: var(--table-header-background-color);
  font: ${cssVar('typography-text-default-semi-bold')};
`;
StyledTableColumnHeaderCell.displayName = 'StyledTableColumnHeaderCell';

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex: 1;
`;
StyledContentWrapper.displayName = 'StyledContentWrapper';
