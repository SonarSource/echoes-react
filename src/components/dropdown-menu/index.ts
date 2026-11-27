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

import { DropdownMenuRoot } from './DropdownMenu';
import { DropdownMenuGroup } from './DropdownMenuGroup';
import { DropdownMenuGroupLabel } from './DropdownMenuGroupLabel';
import { DropdownMenuItemButton } from './DropdownMenuItemButton';
import { DropdownMenuItemButtonCheckable } from './DropdownMenuItemButtonCheckable';
import { DropdownMenuItemButtonDestructive } from './DropdownMenuItemButtonDestructive';
import { DropdownMenuItemLink } from './DropdownMenuItemLink';
import { DropdownMenuItemLinkDownload } from './DropdownMenuItemLinkDownload';
import { DropdownMenuSeparator } from './DropdownMenuSeparator';
import { DropdownMenuSubMenu } from './DropdownMenuSubMenu';

export { DropdownMenuAlign, DropdownMenuSide, type DropdownMenuProps } from './DropdownMenu';
export { type DropdownMenuGroupProps } from './DropdownMenuGroup';
export { type DropdownMenuGroupLabelProps } from './DropdownMenuGroupLabel';
export { type DropdownMenuItemButtonProps } from './DropdownMenuItemButton';
export { type DropdownMenuItemButtonCheckableProps } from './DropdownMenuItemButtonCheckable';
export { type DropdownMenuItemButtonDestructiveProps } from './DropdownMenuItemButtonDestructive';
export { type DropdownMenuItemLinkProps } from './DropdownMenuItemLink';
export { type DropdownMenuItemLinkDownloadProps } from './DropdownMenuItemLinkDownload';
export { type DropdownMenuSubProps } from './DropdownMenuSubMenu';

/**
 * {@link DropdownMenuRoot | DropdownMenu}
 *
 * A menu of actions or links, displayed in an overlay anchored to a trigger element.
 * The trigger is passed as `children` and the menu content is passed through the `items` prop.
 *
 * **Permitted Content (in `items`)**
 *
 * - `DropdownMenu.Group`: A labelled group of items.
 * - `DropdownMenu.ItemButton`: An item performing an action.
 * - `DropdownMenu.ItemButtonCheckable`: An item that can be checked, e.g. to select an option.
 * - `DropdownMenu.ItemButtonDestructive`: An item performing a destructive action.
 * - `DropdownMenu.ItemLink`: An item navigating to another page.
 * - `DropdownMenu.ItemLinkDownload`: An item downloading a file.
 * - `DropdownMenu.Separator`: A visual separator between items or groups.
 * - `DropdownMenu.SubMenu`: An item opening a nested menu.
 *
 * **example**
 *
 * ```tsx
 * <DropdownMenu
 *   items={
 *     <>
 *       <DropdownMenu.ItemButton onClick={editProject}>Edit</DropdownMenu.ItemButton>
 *       <DropdownMenu.ItemLink to="/project/settings">Settings</DropdownMenu.ItemLink>
 *       <DropdownMenu.Separator />
 *       <DropdownMenu.Group label="Theme">
 *         <DropdownMenu.ItemButtonCheckable isChecked>Light</DropdownMenu.ItemButtonCheckable>
 *         <DropdownMenu.ItemButtonCheckable>Dark</DropdownMenu.ItemButtonCheckable>
 *       </DropdownMenu.Group>
 *       <DropdownMenu.Separator />
 *       <DropdownMenu.ItemButtonDestructive onClick={deleteProject}>
 *         Delete
 *       </DropdownMenu.ItemButtonDestructive>
 *     </>
 *   }>
 *   <Button>Actions</Button>
 * </DropdownMenu>
 * ```
 *
 * **remarks**
 *
 * The trigger must be a single element able to receive a ref and props, like an Echoes `Button`.
 * Use `DropdownMenu.Group` rather than the deprecated `DropdownMenu.GroupLabel` to label a set of items,
 * so the label is programmatically associated with them.
 */
export const DropdownMenu = Object.assign(DropdownMenuRoot, {
  /**
   * {@link DropdownMenuGroup | DropdownMenu.Group}
   *
   * A group of items with a visible label. The items are wrapped in an element with `role="group"`
   * that is labelled by the `label`, so assistive technologies announce which group each item belongs to.
   * An optional `link` can be displayed at the end of the label.
   */
  Group: DropdownMenuGroup,

  /**
   * {@link DropdownMenuGroupLabel | DropdownMenu.GroupLabel}
   *
   * A label displayed above a set of items, with an optional link at its end.
   *
   * @deprecated Use `DropdownMenu.Group` with its `label` prop instead, so that the group's items
   * are programmatically associated with their label.
   */
  GroupLabel: DropdownMenuGroupLabel,

  /**
   * {@link DropdownMenuItemButton | DropdownMenu.ItemButton}
   *
   * An item that performs an action when selected, through its `onClick` handler.
   * It can display a `helpText` below its label, as well as a `prefix` and a `suffix`.
   */
  ItemButton: DropdownMenuItemButton,

  /**
   * {@link DropdownMenuItemButtonCheckable | DropdownMenu.ItemButtonCheckable}
   *
   * An item that displays a check mark when `isChecked` is true, e.g. to show the selected option among several.
   * The checked state is controlled: update `isChecked` from its `onClick` handler.
   */
  ItemButtonCheckable: DropdownMenuItemButtonCheckable,

  /**
   * {@link DropdownMenuItemButtonDestructive | DropdownMenu.ItemButtonDestructive}
   *
   * An item that performs a destructive action (e.g. deleting something), styled accordingly.
   * It doesn't support a `prefix` or a `suffix`.
   */
  ItemButtonDestructive: DropdownMenuItemButtonDestructive,

  /**
   * {@link DropdownMenuItemLink | DropdownMenu.ItemLink}
   *
   * An item that navigates to the `to` destination, using the router adapter provided to the `EchoesProvider`.
   * It is highlighted when its destination matches the current URL (or when `isActive` is true).
   * With `enableOpenInNewTab`, it opens in a new tab and displays an external link icon.
   */
  ItemLink: DropdownMenuItemLink,

  /**
   * {@link DropdownMenuItemLinkDownload | DropdownMenu.ItemLinkDownload}
   *
   * A link item that downloads the file at `to`, saved under the `download` file name.
   * It displays a download icon as its default `prefix`.
   */
  ItemLinkDownload: DropdownMenuItemLinkDownload,

  /**
   * {@link DropdownMenuSeparator | DropdownMenu.Separator}
   *
   * A horizontal line to visually separate items or groups of items.
   */
  Separator: DropdownMenuSeparator,

  /**
   * {@link DropdownMenuSubMenu | DropdownMenu.SubMenu}
   *
   * An item that opens a nested menu, containing the `items` passed to it, when hovered or selected.
   * Its `children` are the label of the item.
   */
  SubMenu: DropdownMenuSubMenu,
});
