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

import { Layout as LayoutRoot } from './Layout';
import {
  Aside,
  BannerContainer,
  ContentWrapper,
  Header,
  PageContent,
  PageFooter,
  PageHeader,
  PageWrapper,
} from './LayoutSlots';

/**
 * The Layout component is meant to be placed at the very root of
 * your project. It provides the base viewport and a CSS grid definition
 * for the BannerContainer, Header, Sidebar and ContentWrapper components
 * to occupy.
 *
 * The resulting layout looks like this:
 * ```
 * +------------------------------------------------------+
 * |                    BannerContainer                   |
 * +------------------------------------------------------+
 * |                        Header                        |
 * +------------------------------------------------------+
 * |         |                                            |
 * | Sidebar |               ContentWrapper               |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * +---------+--------------------------------------------+
 * ```
 *
 * The ContentWrapper has its own internal sub-structure
 */
export const Layout = Object.assign(LayoutRoot, {
  Header,
  Aside,
  BannerContainer,
  ContentWrapper,
  PageWrapper,
  PageContent,
  PageFooter,
  PageHeader,
});
