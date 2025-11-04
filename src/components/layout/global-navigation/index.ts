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
import { GlobalNavigationRoot, GlobalNavigationSecondary } from './GlobalNavigation';
import { GlobalNavigationAccount } from './GlobalNavigationAccount';
import { GlobalNavigationAction } from './GlobalNavigationAction';
import { GlobalNavigationDropdownItem } from './GlobalNavigationDropdownItem';
import { GlobalNavigationHome } from './GlobalNavigationHome';
import { GlobalNavigationItem } from './GlobalNavigationItem';
import { GlobalNavigationItemsContainer } from './GlobalNavigationItemsContainer';
import { GlobalNavigationPrimary } from './GlobalNavigationPrimary';

export { type GlobalNavigationProps } from './GlobalNavigation';
export { type GlobalNavigationAccountProps } from './GlobalNavigationAccount';
export { type GlobalNavigationActionProps } from './GlobalNavigationAction';
export { type GlobalNavigationDropdownItemProps } from './GlobalNavigationDropdownItem';
export { type GlobalNavigationHomeProps } from './GlobalNavigationHome';
export { type GlobalNavigationItemProps } from './GlobalNavigationItem';
export { type GlobalNavigationItemsContainerProps } from './GlobalNavigationItemsContainer';
export { type GlobalNavigationPrimaryProps } from './GlobalNavigationPrimary';

export const GlobalNavigation = Object.assign(GlobalNavigationRoot, {
  Primary: GlobalNavigationPrimary,
  Secondary: GlobalNavigationSecondary,
  /**
   * {@link GlobalNavigationItem | GlobalNavigation.Item} is basically a menu link.
   *
   * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
   *
   * Its children should be limited to formatted text.
   */
  Item: GlobalNavigationItem,
  /**
   * {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer} wraps the GlobalNavigation Items.
   * It should be in the Primary section and contain only instances of {@link GlobalNavigationItem | GlobalNavigation.Item}
   * and {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem}.
   */
  ItemsContainer: GlobalNavigationItemsContainer,
  /**
   * {@link GlobalNavigationDropdownItem | GlobalNavigation.DropdownItem} is a menu item that opens a dropdown menu.
   *
   * Place it inside the {@link GlobalNavigationItemsContainer | GlobalNavigation.ItemsContainer}.
   *
   * It uses a button with a chevron suffix as a trigger, so its children should be limited to formatted text.
   */
  DropdownItem: GlobalNavigationDropdownItem,
  /**
   * {@link GlobalNavigationAction | GlobalNavigation.Action} is a ButtonIcon dedicated to the Secondary section of the GlobalNavigation.
   * It has the same API
   */
  Action: GlobalNavigationAction,
  /**
   * {@link GlobalNavigationAccount | GlobalNavigation.Account} is a special button for the account menu of the GlobalNavigation.
   *
   * It wraps a DropdownMenu, so it expects the `items` to be provided directly to it.
   * It includes an `avatar` render prop that should be supplied with the product's Avatar component.
   * Note that it will constrain it to 20x20 px.
   */
  Account: GlobalNavigationAccount,
  /* {@link GlobalNavigationHome | GlobalNavigation.Home} is a navigation element that wraps the brand logo and links to the home page.
   *
   * Place it inside {@link GlobalNavigationPrimary | GlobalNavigation.Primary} to render the brand logo.
   *
   * Its children should be your brand logo.
   */
  Home: GlobalNavigationHome,
});

/**
 * @deprecated Use Layout.GlobalNavigation instead
 */
export const DirectImportGlobalNavigation = GlobalNavigation;
