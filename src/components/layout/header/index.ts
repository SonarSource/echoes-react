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

import { Breadcrumbs } from '../../breadcrumbs';
import { ButtonGroup } from '../../buttons';
import { Text } from '../../typography';
import { GlobalNavigationDropdownItem } from '../global-navigation/GlobalNavigationDropdownItem';
import { GlobalNavigationItem } from '../global-navigation/GlobalNavigationItem';
import { GlobalNavigationItemsContainer } from '../global-navigation/GlobalNavigationItemsContainer';
import { HeaderMetadata } from './common/HeaderMetadata';
import { ContentHeaderTitle, PageHeaderTitle } from './common/HeaderTitle';
import { ContentHeaderRoot } from './content-header/ContentHeader';
import { PageHeaderRoot } from './page-header/PageHeader';

export type { HeaderMetadataProps as PageHeaderMetadataProps } from './common/HeaderMetadata';
export type { ContentHeaderTitleProps, PageHeaderTitleProps } from './common/HeaderTitle';
export type { HeaderProps as ContentHeaderProps, PageHeaderProps } from './common/HeaderTypes';

const commonComponents = {
  /**
   * Action elements container (button group)
   */
  Actions: ButtonGroup,
  /**
   * Breadcrumb navigation component
   */
  Breadcrumbs,
  /**
   * Description text component
   */
  Description: Text,
  /**
   * Metadata information component
   */
  Metadata: HeaderMetadata,
  /**
   * Global navigation items container
   */
  Navigation: GlobalNavigationItemsContainer,
  /**
   * Dropdown navigation item component
   */
  NavigationDropdownItem: GlobalNavigationDropdownItem,
  /**
   * Individual navigation item component
   */
  NavigationItem: GlobalNavigationItem,
};

export const PageHeader = Object.assign(PageHeaderRoot, {
  ...commonComponents,
  /**
   * Page title component (required) with optional prefix/suffix
   */
  Title: PageHeaderTitle,
});
export const ContentHeader = Object.assign(ContentHeaderRoot, {
  ...commonComponents,
  /**
   * Content title component (required) with optional prefix/suffix
   */
  Title: ContentHeaderTitle,
});
