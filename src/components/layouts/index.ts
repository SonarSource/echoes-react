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

import { LayoutAsideLeft, LayoutAsideRight, LayoutMain, LayoutRoot } from './Layout';

/**
 * Layout is a container component.
 * It defines a 12-column grid layout, and should only have Layout sub-components as children.
 * 
 * **example**
 * 
 * ```
 * 
 * <VisibleLayout {...args}>
        <Layout.AsideLeft>
          <div>list of filters</div>
        </Layout.AsideLeft>
        <Layout.Main>
          <p>Main content</p>
        </Layout.Main>
        <Layout.AsideRight>
          <div>Metadata</div>
        </Layout.AsideRight>
      </VisibleLayout>
 * 
 * ```
 */
export const Layout = Object.assign(LayoutRoot, {
  /**
   * The {@link LayoutMain | Layout.Main} container takes up all the available columns from the center.
   * It will leave the first and/or last 3 columns to the Asides if they are present.
   */
  Main: LayoutMain,

  /**
   * {@link LayoutAsideLeft | Layout.AsideLeft} occupies the first 3 columns and the full height of the Layout.
   * It is typically used for filter bars or lists of items for navigation
   */
  AsideLeft: LayoutAsideLeft,

  /**
   * {@link LayoutAsideRight | Layout.AsideRight} occupies the last 3 columns and the full height of the Layout.
   * It is typically used for secondary information, metadata, etc.
   */
  AsideRight: LayoutAsideRight,
});
