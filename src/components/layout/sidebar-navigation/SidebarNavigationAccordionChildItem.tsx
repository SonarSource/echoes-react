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

import { SidebarNavigationBaseItem } from './SidebarNavigationBaseItem';

import {
  SidebarNavigationIconComponent,
  SidebarNavigationItemBaseProps,
} from './SidebarNavigationTypes';

export interface SidebarNavigationAccordionChildItemProps extends SidebarNavigationItemBaseProps {
  /**
   * The icon component to display at the start of the SidebarNavigationAccordionChildItem.
   * Must be an Echoes Icon component. Omit it for icon-less accordion child rows.
   */
  Icon?: SidebarNavigationIconComponent;
}

export function SidebarNavigationAccordionChildItem(
  props: Readonly<SidebarNavigationAccordionChildItemProps>,
) {
  return <SidebarNavigationBaseItem {...props} />;
}

SidebarNavigationAccordionChildItem.displayName = 'SidebarNavigationAccordionChildItem';
