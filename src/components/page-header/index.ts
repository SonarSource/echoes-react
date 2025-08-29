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

import { Breadcrumbs } from '../breadcrumbs';
import { ButtonGroup } from '../buttons';
import { GlobalNavigationDropdownItem } from '../global-navigation/GlobalNavigationDropdownItem';
import { GlobalNavigationItem } from '../global-navigation/GlobalNavigationItem';
import { GlobalNavigationItemsContainer } from '../global-navigation/GlobalNavigationItemsContainer';
import { Text } from '../typography';
import { PageHeaderRoot } from './PageHeader';
import { PageHeaderMetadata } from './PageHeaderMetadata';
import { PageHeaderTitle } from './PageHeaderTitle';

export type { PageHeaderProps } from './PageHeader';

/**
 * {@link PageHeaderRoot | PageHeader} is a flexible header component for displaying page titles,
 * metadata, description, breadcrumbs, and actions at the top of application pages.
 *
 * **Components**
 * - {@link ButtonGroup | PageHeader.Actions} - Action buttons or controls
 * - {@link Breadcrumbs | PageHeader.Breadcrumbs} - Navigation breadcrumb trail
 * - {@link Text | PageHeader.Description} - Descriptive text content
 * - {@link PageHeaderMetadata | PageHeader.Metadata} - Subtle metadata information
 * - {@link GlobalNavigationItemsContainer | PageHeader.Navigation} - Navigation items container
 * - {@link GlobalNavigationDropdownItem | PageHeader.NavigationDropdownItem} - Dropdown navigation item
 * - {@link GlobalNavigationItem | PageHeader.NavigationItem} - Regular navigation item
 * - {@link PageHeaderTitle | PageHeader.Title} - Main page title (required) with optional prefix/suffix
 *
 * ```tsx
 * <PageHeader
 *   actions={
 *     <PageHeader.Actions>
 *       <Button>Secondary action</Button>
 *       <Button variety={ButtonVariety.Primary}>Primary action</Button>
 *     </PageHeader.Actions>
 *   }
 *   breadcrumbs={
 *     <PageHeader.Breadcrumbs
 *       items={[
 *         { linkElement: 'Breadcrumb item 1', to: 'https://sonarsource.com' },
 *         { linkElement: 'Breadcrumb item 2', to: '' },
 *       ]}
 *     />
 *   }
 *   description={<PageHeader.Description>Page description</PageHeader.Description>}
 *   metadata={<PageHeader.Metadata>Page metadata</PageHeader.Metadata>}
 *   navigation={
 *     <PageHeader.Navigation>
 *       <PageHeader.NavigationItem to="/">Home</PageHeader.NavigationItem>
 *
 *       <PageHeader.NavigationDropdownItem
 *         items={
 *           <>
 *             <DropdownMenu.ItemLink to="/option1">option 1</DropdownMenu.ItemLink>
 *             <DropdownMenu.ItemLink to="/option2">option 2</DropdownMenu.ItemLink>
 *           </>
 *         }>
 *         More
 *       </PageHeader.NavigationDropdownItem>
 *     </PageHeader.Navigation>
 *   }
 *   title={
 *     <PageHeader.Title
 *       prefix={
 *         <ButtonIcon
 *           Icon={IconArrowLeft}
 *           ariaLabel="Go back"
 *           variety={ButtonVariety.DefaultGhost}
 *         />
 *       }
 *       suffix={
 *         <ButtonIcon Icon={IconEdit} ariaLabel="Edit" variety={ButtonVariety.DefaultGhost} />
 *       }>
 *       Page title
 *     </PageHeader.Title>
 *   }
 * />
 * ```
 */
export const PageHeader = Object.assign(PageHeaderRoot, {
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
  Metadata: PageHeaderMetadata,
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
  /**
   * Page title component (required) with optional prefix/suffix
   */
  Title: PageHeaderTitle,
});
