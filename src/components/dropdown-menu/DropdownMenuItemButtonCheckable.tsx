/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { DropdownMenuItemBase, DropdownMenuItemBaseProps } from './DropdownMenuItemBase';

type Props = Omit<DropdownMenuItemBaseProps, 'isCheckable'>;

export function DropdownMenuItemButtonCheckable(props: Readonly<Props>) {
  return <StyledDropdownMenuItemBase {...props} isCheckable />;
}

const StyledDropdownMenuItemBase = styled(DropdownMenuItemBase)<
  Pick<DropdownMenuItemBaseProps, 'isChecked'>
>`
  background-color: ${(props) =>
    props.isChecked
      ? 'var(--echoes-color-background-selected-weak-default)'
      : 'var(--echoes-color-background-default)'};

  &:hover {
    background-color: ${(props) =>
      props.isChecked
        ? 'var(--echoes-color-background-selected-weak-hover)'
        : 'var(--echoes-color-background-default-hover)'};
  }

  /* when the item is clicked */
  &:active {
    background-color: ${(props) =>
      props.isChecked
        ? 'var(--echoes-color-background-selected-weak-pressed)'
        : 'var(--echoes-color-background-default-active)'};
  }

  &[data-disabled] {
    background-color: ${(props) =>
      props.isChecked
        ? 'var(--echoes-color-background-disabled)'
        : 'var(--echoes-color-background-default)'};
  }
`;
