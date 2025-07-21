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

import { cssVar } from '~utils/design-tokens';

export type DropdownMenuItemButtonCheckableProps = Omit<DropdownMenuItemBaseProps, 'isCheckable'>;

export const DropdownMenuItemButtonCheckable = forwardRef<
  HTMLDivElement,
  DropdownMenuItemButtonCheckableProps
>((props, ref) => {
  return <StyledDropdownMenuItemBase {...props} isCheckable ref={ref} />;
});
DropdownMenuItemButtonCheckable.displayName = 'DropdownMenu.ItemButtonCheckable';

const StyledDropdownMenuItemBase = styled(DropdownMenuItemBase)<
  Pick<DropdownMenuItemBaseProps, 'isChecked'>
>`
  background-color: ${(props) =>
    props.isChecked
      ? cssVar('color-background-selected-weak-default')
      : cssVar('color-surface-default')};

  &:hover {
    background-color: ${(props) =>
      props.isChecked
        ? cssVar('color-background-selected-weak-hover')
        : cssVar('color-surface-hover')};
  }

  /* when the item is clicked */
  &:active {
    background-color: ${(props) =>
      props.isChecked
        ? cssVar('color-background-selected-weak-pressed')
        : cssVar('color-surface-active')};
  }

  &[data-disabled] {
    background-color: ${(props) =>
      props.isChecked ? cssVar('color-surface-disabled') : cssVar('color-surface-default')};
  }
`;
StyledDropdownMenuItemBase.displayName = 'StyledDropdownMenuItemBase';
