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
import { NavbarPrimary, NavbarRoot, NavbarSecondary } from './Navbar';
import { NavbarAccount } from './NavbarAccount';
import { NavbarAction } from './NavbarAction';
import { NavbarDropdownItem } from './NavbarDropdownItem';
import { NavbarHome } from './NavbarHome';
import { NavbarItem } from './NavbarItem';
import { NavbarItemsContainer } from './NavbarItemsContainer';

/**
 * {@link NavbarRoot | Navbar} is a navigation element that wraps {@link NavbarPrimary | Navbar.Primary}, and
 * {@link NavbarSecondary | Navbar.Secondary}.
 * It provides a consistent layout for global navigation.
 *
 * **Permitted Content**
 *
 * Exactly one {@link NavbarPrimary | Navbar.Primary}, one {@link NavbarSecondary | Navbar.Secondary}, and one {@link NavbarHome | Navbar.Home} within {@link NavbarPrimary | Navbar.Primary}.
 *
 * **Example**
 *
 * ```tsx
 * <Navbar>
 *  <Navbar.Primary>
 *    <Navbar.Home>
 *      ...
 *    </Navbar.Home>
 *    <Navbar.ItemsContainer>
 *      <Navbar.Item to="/projects">Projects</Navbar.Item>
 *      <Navbar.DropdownItem
 *        items={
 *          <>
 *            <DropdownMenu.ItemLink to="/link1"><FormattedMessage id='ext1.name'/></DropdownMenu.ItemLink>
 *            <DropdownMenu.ItemLink to="/link2"><FormattedMessage id='ext2.name'/></DropdownMenu.ItemLink>
 *          </>
 *        }
 *      >
 *        <FormattedMessage id='more'/>
 *      </Navbar.DropdownItem>
 *    </Navbar.ItemsContainer>
 *  </Navbar.Primary>
 *  <Navbar.Secondary>
 *    <Navbar.Action Icon={IconQuestionMark} ariaLabel="Help" isIconFilled />
 *
 *    <DropdownMenu items={<DropdownMenu.ItemLink to="/create">project</DropdownMenu.ItemLink>}>
 *      <Navbar.Action Icon={IconPlus} ariaLabel="Create..." />
 *    </DropdownMenu>
 *
 *    <Navbar.Account
 *       avatar={<Avatar />}
 *       items={<DropdownMenu.ItemLink to="/account">account settings</DropdownMenu.ItemLink>}
 *    />
 *  </Navbar.Secondary>
 * </Navbar>
 * ```
 */
export const Navbar = Object.assign(NavbarRoot, {
  Primary: NavbarPrimary,
  Secondary: NavbarSecondary,
  /**
   * {@link NavbarItem | Navbar.Item} is basically a menu link.
   *
   * Place it inside the {@link NavbarItemsContainer | Navbar.ItemsContainer}.
   *
   * Its children should be limited to formatted text.
   */
  Item: NavbarItem,
  /**
   * {@link NavbarItemsContainer | Navbar.ItemsContainer} wraps the Navbar Items.
   * It should be in the Primary section and contain only instances of {@link NavbarItem | Navbar.Item}
   * and {@link NavbarDropdownItem | Navbar.DropdownItem}.
   */
  ItemsContainer: NavbarItemsContainer,
  /**
   * {@link NavbarDropdownItem | Navbar.DropdownItem} is a menu item that opens a dropdown menu.
   *
   * Place it inside the {@link NavbarItemsContainer | Navbar.ItemsContainer}.
   *
   * It uses a button with a chevron suffix as a trigger, so its children should be limited to formatted text.
   */
  DropdownItem: NavbarDropdownItem,
  /**
   * {@link NavbarAction | Navbar.Action} is a ButtonIcon dedicated to the Secondary section of the Navbar.
   * It has the same API
   */
  Action: NavbarAction,
  /**
   * {@link NavbarAccount | Navbar.Account} is a special button for the account menu of the navbar.
   *
   * It wraps a DropdownMenu, so it expects the `items` to be provided directly to it.
   * It includes an `avatar` render prop that should be supplied with the product's Avatar component.
   * Note that it will constrain it to 20x20 px.
   */
  Account: NavbarAccount,
  /* {@link NavbarHome | Navbar.Home} is a navigation element that wraps the brand logo and links to the home page.
   *
   * Place it inside {@link NavbarPrimary | Navbar.Primary} to render the brand logo.
   *
   * Its children should be your brand logo.
   */
  Home: NavbarHome,
});
