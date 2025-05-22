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
import { TableBaseProps, TableVariety } from './TableTypes';

const TABLE_VARIETY_STYLES = {
  [TableVariety.Surface]: {
    '--table-header-background-color': 'var(--echoes-color-background-neutral-weak-default)',
    border: 'var(--echoes-border-width-default) solid var(--echoes-color-border-bold)',
    'border-collapse': 'separate',
    'border-spacing': 0,
  },
  [TableVariety.Ghost]: {
    '--table-header-background-color': 'var(--echoes-color-background-default)',
    border: 'none',
    'border-collapse': 'collapse',
    'border-spacing': 0,
  },
};

export interface PropsWithLabel extends TableBaseProps {
  ariaLabel: string;
  ariaLabelledBy?: never;
}

export interface PropsWithLabeledBy extends TableBaseProps {
  ariaLabel?: never;
  ariaLabelledBy: string;
}

export type TableProps = PropsWithLabel | PropsWithLabeledBy;

export const StyledTable = styled.table<Required<Pick<TableProps, 'variety' | 'gridTemplate'>>>`
  display: grid;

  grid-template-columns: ${(props) => props.gridTemplate};

  border-radius: var(--echoes-border-radius-200);

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

  tbody &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

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
  align-items: center;

  padding: var(--echoes-dimension-space-200);

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

export const StyledTableRowHeaderCell = styled.th`
  ${cellBaseStyle}

  ${StyledTableRow}:hover & {
    background-color: var(--echoes-color-background-default-hover);
  }
`;

export const StyledTableCell = styled.td`
  ${cellBaseStyle}

  ${StyledTableRow}:hover & {
    background-color: var(--echoes-color-background-default-hover);
  }
`;
