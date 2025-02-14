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
import { NavbarRoot, NavbarPrimary, NavbarSecondary } from './Navbar';

/**
 * {@link NavbarRoot | Navbar} is a navigation element that wraps {@link NavbarPrimary | Navbar.Primary}, and
 * {@link NavbarSecondary | Navbar.Secondary}.
 * It provides a consistent layout for global navigation.
 *
 * **Permitted Content**
 *
 * Exactly one {@link NavbarPrimary | Navbar.Primary}, one {@link NavbarSecondary | Navbar.Secondary}.
 *
 * **Example**
 *
 * ```tsx
 * <Navbar>
 *  <Navbar.Primary>
 *      ...
 *  </Navbar.Primary>
 *  <Navbar.Secondary>
 *      ...
 *  </Navbar.Secondary>
 * </Navbar>
 * ```
 */

export const Navbar = Object.assign(NavbarRoot, {
  Primary: NavbarPrimary,
  Secondary: NavbarSecondary,
});
