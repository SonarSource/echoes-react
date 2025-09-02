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

import { GlobalNavigation } from './global-navigation';
import { Layout as LayoutRoot } from './Layout';
import {
  AsideLeft,
  BannerContainer,
  ContentGrid,
  PageContent,
  PageFooter,
  PageGrid,
} from './LayoutSlots';
import { PageHeader } from './page-header';
import { SidebarNavigation } from './sidebar-navigation';

export type {
  GlobalNavigationAccountProps,
  GlobalNavigationActionProps,
  GlobalNavigationDropdownItemProps,
  GlobalNavigationHomeProps,
  GlobalNavigationItemProps,
  GlobalNavigationItemsContainerProps,
  GlobalNavigationPrimaryProps,
  GlobalNavigationProps,
} from './global-navigation';
export type { LayoutProps } from './Layout';
export type { AsideProps, PageGridProps } from './LayoutSlots';
export type { PageHeaderMetadataProps, PageHeaderProps, PageHeaderTitleProps } from './page-header';
export type {
  SidebarNavigationAccordionItemProps,
  SidebarNavigationGroupProps,
  SidebarNavigationHeaderProps,
  SidebarNavigationItemProps,
  SidebarNavigationProps,
} from './sidebar-navigation';

/**
 * The Layout component is meant to be placed at the very root of
 * your project. It provides the base viewport and a CSS grid definition
 * for the BannerContainer, GlobalNav, Sidebar and ContentGrid components
 * to occupy.
 *
 * The resulting layout looks like this:
 * ```
 * +------------------------------------------------------+
 * |                    BannerContainer                   |
 * +------------------------------------------------------+
 * |                      GlobalNav                       |
 * +------------------------------------------------------+
 * |         |                                            |
 * | Sidebar |               ContentGrid                  |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * |         |                                            |
 * +---------+--------------------------------------------+
 * ```
 *
 * The ContentGrid has its own internal grid sub-structure.
 */
export const Layout = Object.assign(LayoutRoot, {
  /**
   * The left aside container, that fills the Aside area of the ContentGrid.
   * Should be used for filters, facets or navigation lists.
   */
  AsideLeft,

  /**
   * The banner container, that holds all the product banners and fills BannerContainer area of the
   * Layout grid. It can eventually hold multiple banners but ideally should only hold one at a time.
   */
  BannerContainer,

  /**
   * The Content Grid defines the layout that includes the Page and the optional Aside & Header.
   * Scrollable areas are the Aside and the Page, the PageHeader is not scrollable.
   *```
   * +-------------------------------+
   * |          PageHeader           |
   * +-------------------------------+
   * |  Aside  |        Page         |
   * |         |                     |
   * +-------------------------------+
   * ```
   */
  ContentGrid,

  /**
   * {@link GlobalNavigation} is a navigation element that wraps {@link GlobalNavigation.Primary}, and
   * {@link GlobalNavigation.Secondary}.
   * It provides a consistent layout for global navigation.
   *
   * **Permitted Content**
   *
   * Exactly one {@link GlobalNavigation.Primary}, one {@link GlobalNavigation.Secondary}, and one {@link GlobalNavigation.Home} within {@link GlobalNavigation.Primary}.
   *
   * **Example**
   *
   * ```tsx
   * <Layout.GlobalNavigation>
   *  <Layout.GlobalNavigation.Primary>
   *    <Layout.GlobalNavigation.Home>
   *      ...
   *    </Layout.GlobalNavigation.Home>
   *    <Layout.GlobalNavigation.ItemsContainer>
   *      <Layout.GlobalNavigation.Item to="/projects">Projects</Layout.GlobalNavigation.Item>
   *      <Layout.GlobalNavigation.DropdownItem
   *        items={
   *          <>
   *            <DropdownMenu.ItemLink to="/link1"><FormattedMessage id='ext1.name'/></DropdownMenu.ItemLink>
   *            <DropdownMenu.ItemLink to="/link2"><FormattedMessage id='ext2.name'/></DropdownMenu.ItemLink>
   *          </>
   *        }
   *      >
   *        <FormattedMessage id='more'/>
   *      </Layout.GlobalNavigation.DropdownItem>
   *    </Layout.GlobalNavigation.ItemsContainer>
   *  </Layout.GlobalNavigation.Primary>
   *  <Layout.GlobalNavigation.Secondary>
   *    <Layout.GlobalNavigation.Action Icon={IconQuestionMark} ariaLabel="Help" isIconFilled />
   *
   *    <DropdownMenu items={<DropdownMenu.ItemLink to="/create">project</DropdownMenu.ItemLink>}>
   *      <Layout.GlobalNavigation.Action Icon={IconPlus} ariaLabel="Create..." />
   *    </DropdownMenu>
   *
   *    <Layout.GlobalNavigation.Account
   *       avatar={<Avatar />}
   *       items={<DropdownMenu.ItemLink to="/account">account settings</DropdownMenu.ItemLink>}
   *    />
   *  </Layout.GlobalNavigation.Secondary>
   * </Layout.GlobalNavigation>
   * ```
   */
  GlobalNavigation,

  /**
   * The Page Grid defines the layout for the page elements, including the header which is optional and
   * can be sticky to the top, main content which is mandatory, and footer that comes after the main content:
   * ```
   * +---------------------+
   * |      PageHeader     |
   * +---------------------+
   * |        Main         |
   * +---------------------+
   * |       Footer        |
   * +---------------------+
   * ```
   *
   * The PageHeader is optional and can be placed in the outer grid
   * (see ContentGrid).
   *
   */
  PageGrid,

  /**
   * {@link PageHeader} is a flexible header component for displaying page titles,
   * metadata, description, breadcrumbs, and actions at the top of application pages.
   *
   * **Components**
   * - {@link PageHeader.Actions} - Action buttons or controls
   * - {@link PageHeader.Breadcrumbs} - Navigation breadcrumb trail
   * - {@link PageHeader.Description} - Descriptive text content
   * - {@link PageHeader.Metadata} - Subtle metadata information
   * - {@link PageHeader.Navigation} - Navigation items container
   * - {@link PageHeader.NavigationDropdownItem} - Dropdown navigation item
   * - {@link PageHeader.NavigationItem} - Regular navigation item
   * - {@link PageHeader.Title} - Main page title (required) with optional prefix/suffix
   *
   * ```tsx
   * <Layout.PageHeader
   *   actions={
   *     <Layout.PageHeader.Actions>
   *       <Button>Secondary action</Button>
   *       <Button variety={ButtonVariety.Primary}>Primary action</Button>
   *     </Layout.PageHeader.Actions>
   *   }
   *   breadcrumbs={
   *     <Layout.PageHeader.Breadcrumbs
   *       items={[
   *         { linkElement: 'Breadcrumb item 1', to: 'https://sonarsource.com' },
   *         { linkElement: 'Breadcrumb item 2', to: '' },
   *       ]}
   *     />
   *   }
   *   description={<Layout.PageHeader.Description>Page description</Layout.PageHeader.Description>}
   *   metadata={<Layout.PageHeader.Metadata>Page metadata</Layout.PageHeader.Metadata>}
   *   navigation={
   *     <Layout.PageHeader.Navigation>
   *       <Layout.PageHeader.NavigationItem to="/">Home</Layout.PageHeader.NavigationItem>
   *
   *       <Layout.PageHeader.NavigationDropdownItem
   *         items={
   *           <>
   *             <DropdownMenu.ItemLink to="/option1">option 1</DropdownMenu.ItemLink>
   *             <DropdownMenu.ItemLink to="/option2">option 2</DropdownMenu.ItemLink>
   *           </>
   *         }>
   *         More
   *       </Layout.PageHeader.NavigationDropdownItem>
   *     </Layout.PageHeader.Navigation>
   *   }
   *   title={
   *     <Layout.PageHeader.Title
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
   *     </Layout.PageHeader.Title>
   *   }
   * />
   * ```
   */
  PageHeader,

  /**
   * The layout for the main content area of the page. It fills the Main area of the PageGrid.
   */
  PageContent,

  /**
   * The layout for the footer area of the page. It fills the Footer area of the PageGrid.
   */
  PageFooter,

  /**
   * {@link SidebarNavigation} is a dockable secondary navigation component for application sidebars.
   * Supports open (full-width with labels) and closed (icon-only with tooltips) states.
   *
   * **Components**
   * - {@link SidebarNavigation.Header} - Header with avatar and dropdown
   * - {@link SidebarNavigation.Body} - Main scrollable content area
   * - {@link SidebarNavigation.Group} - Grouped navigation sections
   * - {@link SidebarNavigation.Item} - Individual navigation items
   * - {@link SidebarNavigation.AccordionItem} - Expandable sections
   * - {@link SidebarNavigation.Footer} - Fixed footer section
   *
   * ```tsx
   * <Layout.SidebarNavigation>
   *   <Layout.SidebarNavigation.Header name="My Project" />
   *   <Layout.SidebarNavigation.Body>
   *     <Layout.SidebarNavigation.Group label="Main">
   *       <Layout.SidebarNavigation.Item Icon={HomeIcon} to="/home">
   *         Home
   *       </Layout.SidebarNavigation.Item>
   *     </Layout.SidebarNavigation.Group>
   *   </Layout.SidebarNavigation.Body>
   *   <Layout.SidebarNavigation.Footer>
   *     <Layout.SidebarNavigation.Item Icon={SettingsIcon} to="/settings">
   *       Settings
   *     </Layout.SidebarNavigation.Item>
   *   </Layout.SidebarNavigation.Footer>
   * </Layout.SidebarNavigation>
   * ```
   */
  SidebarNavigation,
});
