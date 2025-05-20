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
import classNames from 'classnames';
import { ComponentProps, PropsWithChildren, forwardRef } from 'react';

export enum TableType {
  Surface = 'surface',
  Ghost = 'ghost',
}

const TABLE_TYPE_STYLES = {
  [TableType.Surface]: {
    '--table-header-background-color': 'var(--echoes-color-background-neutral-weak-default)',
    border: 'var(--echoes-border-width-default) solid var(--echoes-color-border-bold)',
    'border-collapse': 'separate',
    'border-spacing': 0,
  },
  [TableType.Ghost]: {
    '--table-header-background-color': 'var(--echoes-color-background-default)',
    border: 'none',
    'border-collapse': 'collapse',
    'border-spacing': 0,
  },
};

interface TableBaseProps extends PropsWithChildren<ComponentProps<'table'>> {
  className?: string;
  gridTemplate: string;
  type?: TableType;
}

interface PropsWithLabel extends TableBaseProps {
  ariaLabel: string;
  ariaLabelledBy?: never;
}

interface PropsWithLabeledBy extends TableBaseProps {
  ariaLabel?: never;
  ariaLabelledBy: string;
}

export type TableProps = PropsWithLabel | PropsWithLabeledBy;

export const TableRoot = forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    className,
    children,
    gridTemplate,
    type = TableType.Ghost,
    ...radixProps
  } = props;

  return (
    <StyledTable
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={classNames({ 'table-type-surface': type === TableType.Surface }, className)}
      gridTemplate={gridTemplate}
      ref={ref}
      type={type}
      {...radixProps}>
      {children}
    </StyledTable>
  );
});

export const TableRow = styled.tr`
  display: contents;

  tbody &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

  .table-type-surface thead &:first-of-type {
    border-top-left-radius: var(--echoes-border-radius-200);
    border-top-right-radius: var(--echoes-border-radius-200);
  }

  .table-type-surface tbody &:last-of-type {
    border-bottom-left-radius: var(--echoes-border-radius-200);
    border-bottom-right-radius: var(--echoes-border-radius-200);
  }
`;

const cellBaseStyle = css`
  text-align: left;
  padding: var(--echoes-dimension-space-200);

  .table-type-surface thead tr:first-child &:first-child {
    border-top-left-radius: var(--echoes-border-radius-200);
  }

  .table-type-surface thead tr:first-child &:last-child {
    border-top-right-radius: var(--echoes-border-radius-200);
  }

  .table-type-surface tbody tr:last-child &:first-child {
    border-bottom-left-radius: var(--echoes-border-radius-200);
  }

  .table-type-surface tbody tr:last-child &:last-child {
    border-bottom-right-radius: var(--echoes-border-radius-200);
  }
`;

export const TableHeader = styled.thead`
  display: contents;
`;

export const TableBody = styled.tbody`
  display: contents;
`;

export const TableRowHeaderCell = styled.th`
  ${cellBaseStyle}

  ${TableRow}:hover & {
    background-color: var(--echoes-color-background-default-hover);
  }
`;

export const TableCell = styled.td`
  ${cellBaseStyle}

  ${TableRow}:hover & {
    background-color: var(--echoes-color-background-default-hover);
  }
`;

const StyledTable = styled.table<Required<Pick<TableProps, 'type' | 'gridTemplate'>>>`
  display: grid;

  grid-template-columns: ${(props) => props.gridTemplate};

  border-radius: var(--echoes-border-radius-200);

  ${({ type }) => TABLE_TYPE_STYLES[type]}
`;

TableRoot.displayName = 'Table';

export const TableColumnHeaderCell = styled.th`
  ${cellBaseStyle}

  background-color: var(--table-header-background-color);
`;
