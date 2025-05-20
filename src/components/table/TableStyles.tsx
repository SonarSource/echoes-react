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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { TableProps, TableVariety } from './TableTypes';

const TABLE_VARIETY_STYLES = {
  [TableVariety.Surface]: {
    '--table-header-background-color': 'var(--echoes-table-colors-background-header-default)',
    border: 'var(--echoes-border-width-default) solid var(--echoes-color-border-bold)',
    'border-collapse': 'separate',
  },
  [TableVariety.Ghost]: {
    '--table-header-background-color': 'var(--echoes-color-background-default)',
    border: 'none',
    'border-collapse': 'collapse',
  },
};

export const StyledTable = styled.table<Required<Pick<TableProps, 'variety' | 'gridTemplate'>>>`
  display: grid;

  grid-template-columns: ${(props) => props.gridTemplate};

  border-radius: var(--echoes-border-radius-200);
  border-spacing: 0;

  ${({ variety }) => TABLE_VARIETY_STYLES[variety]}
`;

export const StyledTableHeader = styled.thead`
  display: contents;
`;

export const StyledTableBody = styled.tbody`
  display: contents;
`;

export const StyledTableRow = styled.tr`
  display: contents;

  .table-variety-surface thead &:first-of-type {
    border-top-left-radius: var(--echoes-border-radius-200);
    border-top-right-radius: var(--echoes-border-radius-200);
  }

  .table-variety-surface tbody &:last-of-type {
    border-bottom-left-radius: var(--echoes-border-radius-200);
    border-bottom-right-radius: var(--echoes-border-radius-200);
  }
`;

export const cellBaseStyle = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: var(--echoes-dimension-space-100);

  box-sizing: border-box;
  min-height: var(--echoes-table-sizes-row-min-width-default);
  padding: var(--echoes-dimension-space-100) var(--echoes-dimension-space-200);

  font: var(--echoes-typography-text-default-regular);

  tbody & {
    border-top: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  }

  .table-variety-surface thead tr:first-child &:first-child {
    border-top-left-radius: var(--echoes-border-radius-200);
  }

  .table-variety-surface thead tr:first-child &:last-child {
    border-top-right-radius: var(--echoes-border-radius-200);
  }

  .table-variety-surface tbody tr:last-child &:first-child {
    border-bottom-left-radius: var(--echoes-border-radius-200);
  }

  .table-variety-surface tbody tr:last-child &:last-child {
    border-bottom-right-radius: var(--echoes-border-radius-200);
  }
`;

export const StyledTableCell = styled.td`
  ${cellBaseStyle}

  justify-content: center;

  ${StyledTableRow}:hover:not(.selected) & {
    background-color: var(--echoes-color-background-default-hover);
  }

  ${StyledTableRow}.selected & {
    background-color: var(--echoes-color-background-selected-weak-default);
  }

  ${StyledTableRow}:hover.selected & {
    background-color: var(--echoes-color-background-selected-weak-hover);
  }
`;

export const StyledTableColumnHeaderCell = styled.th`
  ${cellBaseStyle}

  /* justify-content is variable, defined in TableColumnHeaderCell */

  background-color: var(--table-header-background-color);
  font: var(--echoes-typography-text-default-semi-bold);
`;

export const StyledContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  flex: 1;
`;
