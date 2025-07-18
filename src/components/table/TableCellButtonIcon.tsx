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
import { ButtonVariety } from '../buttons';
import { ButtonIcon, ButtonIconProps } from '../buttons/ButtonIcon';
import { StyledTableCell } from './TableStyles';

import { cssVar } from '~utils/design-tokens';

export type TableCellButtonIconProps = ButtonIconProps & {
  cellClassName?: string;
};

export const TableCellButtonIcon = forwardRef<HTMLButtonElement, TableCellButtonIconProps>(
  (props, ref) => {
    const { cellClassName, ...buttonProps } = props;

    return (
      <StyledTableCellButtonIcon className={cellClassName}>
        <ButtonIcon variety={ButtonVariety.DefaultGhost} {...buttonProps} ref={ref} />
      </StyledTableCellButtonIcon>
    );
  },
);

TableCellButtonIcon.displayName = 'TableCellButtonIcon';

const StyledTableCellButtonIcon = styled(StyledTableCell)`
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-200')};
`;
StyledTableCellButtonIcon.displayName = 'StyledTableCellButtonIcon';
