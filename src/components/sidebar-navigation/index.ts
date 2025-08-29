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

import { SidebarNavigation as SidebarNavigationRoot } from './SidebarNavigation';
import { SidebarNavigationAccordionItem } from './SidebarNavigationAccordionItem';
import { SidebarNavigationBody } from './SidebarNavigationBody';
import { SidebarNavigationGroup } from './SidebarNavigationGroup';
import { SidebarNavigationHeader } from './SidebarNavigationHeader';
import { SidebarNavigationItem } from './SidebarNavigationItem';
import { SidebarNavigationFooter } from './SidebarNavigationItemStyles';

export { type SidebarNavigationProps } from './SidebarNavigation';
export { type SidebarNavigationAccordionItemProps } from './SidebarNavigationAccordionItem';
export { type SidebarNavigationGroupProps } from './SidebarNavigationGroup';
export { type SidebarNavigationHeaderProps } from './SidebarNavigationHeader';
export { type SidebarNavigationItemProps } from './SidebarNavigationItem';

/**
 * {@link SidebarNavigationRoot | SidebarNavigation} is a dockable secondary navigation component for application sidebars.
 * Supports open (full-width with labels) and closed (icon-only with tooltips) states.
 *
 * **Components**
 * - {@link SidebarNavigationHeader | Header} - Header with avatar and dropdown
 * - {@link SidebarNavigationBody | Body} - Main scrollable content area
 * - {@link SidebarNavigationGroup | Group} - Grouped navigation sections
 * - {@link SidebarNavigationItem | Item} - Individual navigation items
 * - {@link SidebarNavigationAccordionItem | AccordionItem} - Expandable sections
 * - {@link SidebarNavigationFooter | Footer} - Fixed footer section
 *
 * ```tsx
 * <SidebarNavigation>
 *   <SidebarNavigation.Header name="My Project" />
 *   <SidebarNavigation.Body>
 *     <SidebarNavigation.Group label="Main">
 *       <SidebarNavigation.Item Icon={HomeIcon} to="/home">
 *         Home
 *       </SidebarNavigation.Item>
 *     </SidebarNavigation.Group>
 *   </SidebarNavigation.Body>
 *   <SidebarNavigation.Footer>
 *     <SidebarNavigation.Item Icon={SettingsIcon} to="/settings">
 *       Settings
 *     </SidebarNavigation.Item>
 *   </SidebarNavigation.Footer>
 * </SidebarNavigation>
 * ```
 */
export const SidebarNavigation = Object.assign(SidebarNavigationRoot, {
  /**
   * {@link SidebarNavigationAccordionItem | AccordionItem} provides expandable navigation sections
   * with collapsible sub-items. Ideal for organizing related navigation items.
   *
   * ```tsx
   * <SidebarNavigation.AccordionItem Icon={SecurityIcon} label="Security">
   *   <SidebarNavigation.Item to="/security/hotspots">
   *     Security Hotspots
   *   </SidebarNavigation.Item>
   * </SidebarNavigation.AccordionItem>
   * ```
   */
  AccordionItem: SidebarNavigationAccordionItem,

  /**
   * {@link SidebarNavigationBody | Body} provides the main scrollable content area for navigation items.
   * Should contain groups, items, and accordions. Automatically handles overflow in closed state.
   *
   * ```tsx
   * <SidebarNavigation.Body>
   *   <SidebarNavigation.Item to="/dashboard">Dashboard</SidebarNavigation.Item>
   * </SidebarNavigation.Body>
   * ```
   */
  Body: SidebarNavigationBody,

  /**
   * {@link SidebarNavigationFooter | Footer} provides a fixed footer section at the bottom of the sidebar.
   * Can contain accordions and items.
   *
   * ```tsx
   * <SidebarNavigation.Footer>
   *   <SidebarNavigation.Item Icon={SettingsIcon} to="/settings">
   *     Settings
   *   </SidebarNavigation.Item>
   * </SidebarNavigation.Footer>
   * ```
   */
  Footer: SidebarNavigationFooter,

  /**
   * {@link SidebarNavigationGroup | Group} organizes navigation items under a common label,
   * creating visual separation and hierarchy.
   *
   * ```tsx
   * <SidebarNavigation.Group label="Analysis">
   *   <SidebarNavigation.Item Icon={IssuesIcon} to="/issues">
   *     Issues
   *   </SidebarNavigation.Item>
   * </SidebarNavigation.Group>
   * ```
   */
  Group: SidebarNavigationGroup,

  /**
   * {@link SidebarNavigationHeader | Header} displays project/organization information at the top
   * of the sidebar. Supports avatars and interactive dropdowns.
   *
   * ```tsx
   * <SidebarNavigation.Header
   *   name="SonarQube Community"
   *   qualifier="Organization"
   *   avatar={<Avatar />}
   *   isInteractive
   * />
   * ```
   */
  Header: SidebarNavigationHeader,

  /**
   * {@link SidebarNavigationItem | Item} represents individual navigation items with support for
   * icons, active states, and router integration. Do not wrap children in Text components.
   *
   * ```tsx
   * <SidebarNavigation.Item Icon={HomeIcon} to="/dashboard" enableTooltip>
   *   Dashboard
   * </SidebarNavigation.Item>
   * ```
   */
  Item: SidebarNavigationItem,
});
