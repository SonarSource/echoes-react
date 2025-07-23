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

import { DropdownMenuRoot } from './DropdownMenu';
import { DropdownMenuGroupLabel } from './DropdownMenuGroupLabel';
import { DropdownMenuItemButton } from './DropdownMenuItemButton';
import { DropdownMenuItemButtonCheckable } from './DropdownMenuItemButtonCheckable';
import { DropdownMenuItemButtonDestructive } from './DropdownMenuItemButtonDestructive';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';
import { DropdownMenuItemLinkDownload } from './DropdownMenuItemLinkDownload';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuSubMenu } from './DropdownMenuSubMenu';

export { DropdownMenuAlign, type DropdownMenuProps } from './DropdownMenu';
export { type DropdownMenuItemButtonProps } from './DropdownMenuItemButton';
export { type DropdownMenuItemButtonCheckableProps } from './DropdownMenuItemButtonCheckable';
export { type DropdownMenuItemButtonDestructiveProps } from './DropdownMenuItemButtonDestructive';
export { type DropdownMenuItemLinkProps } from './DropdownMenuItemLink';
export { type DropdownMenuItemLinkDownloadProps } from './DropdownMenuItemLinkDownload';
export { type DropdownMenuSubProps } from './DropdownMenuSubMenu';

export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  GroupLabel: DropdownMenuGroupLabel,
  ItemButton: DropdownMenuItemButton,
  ItemButtonCheckable: DropdownMenuItemButtonCheckable,
  ItemButtonDestructive: DropdownMenuItemButtonDestructive,
  ItemLink: DropdownMenuItemLink,
  ItemLinkDownload: DropdownMenuItemLinkDownload,
  Separator: DropdownMenuSeparator,
  SubMenu: DropdownMenuSubMenu,
});
