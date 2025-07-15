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
import { DropdownMenuItemBase, DropdownMenuItemBaseProps } from './DropdownMenuItemBase';

export type DropdownMenuItemButtonDestructiveProps = Omit<
  DropdownMenuItemBaseProps,
  'isCheckable' | 'isChecked' | 'prefix' | 'suffix'
>;

export const DropdownMenuItemButtonDestructive = forwardRef<
  HTMLDivElement,
  DropdownMenuItemButtonDestructiveProps
>((props, ref) => {
  return <StyledDropdownMenuItemBase {...props} ref={ref} />;
});
DropdownMenuItemButtonDestructive.displayName = 'DropdownMenu.ItemButtonDestructive';

const StyledDropdownMenuItemBase = styled(DropdownMenuItemBase)`
  color: var(--echoes-color-text-danger);

  &:hover {
    background-color: var(--echoes-color-background-danger-weak-hover);
  }

  /* when the item is clicked */
  &:active {
    background-color: var(--echoes-color-background-danger-weak-active);
  }

  &[data-disabled] {
    background-color: var(--echoes-color-background-default);
  }
`;
StyledDropdownMenuItemBase.displayName = 'StyledDropdownMenuItemBase';
