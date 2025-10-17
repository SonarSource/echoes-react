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

import { Banner } from './banner';
import { GlobalNavigation } from './global-navigation';
import { ContentHeader, PageHeader } from './header';
import { Layout as LayoutRoot } from './Layout';
import {
  AsideLeft,
  BannerContainer,
  ContentGrid,
  PageContent,
  PageFooter,
  PageGrid,
} from './LayoutSlots';
import { SidebarNavigation } from './sidebar-navigation';

export { BannerVariety, type BannerProps } from './banner';
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
export type {
  ContentHeaderProps,
  ContentHeaderTitleProps,
  PageHeaderMetadataProps,
  PageHeaderProps,
  PageHeaderTitleProps,
} from './header';
export type { LayoutProps } from './Layout';
export type { AsideProps, PageGridProps } from './LayoutSlots';
export { AsideSize, PageWidth } from './LayoutTypes';
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
   * Layout grid. It can optionally hold multiple banners but ideally should only hold one at a time.
   */
  BannerContainer,
  /**
   * The Banner is used to communicate system status or to promote a feature.
   * They are not related to a specific page or element. They are displayed in the {@link BannerContainer}.
   *
   * /!\ This component must be used sparingly and only when truly necessary to commmunicate critical information.
   * To avoid disrupting the user experience, ensure banners are contextually relevant with clear, concise messaging.
   * Display only one banner at a time to prevent alert fatigue.
   *
   * **Varieties**
   *
   * - `info`: To provide neutral information about updates. Be careful not to overuse it.
   * - `success`: To provide a success message. e.g when a feature is activated to all org members.
   * - `warning`: For messages that need the user's attention or acknowledgment but might not cause errors.
   * - `danger`: For errors, system malfunctions, and critical issues, such as license expiration.
   *
   * **Behavior**
   *
   * - Content is ellipsized if too long to maintain single-line display
   * - Dismiss button appears only when `onDismiss` callback is provided
   */
  Banner,

  /**
   * The Content Grid defines the layout that includes the Page and the optional AsideLeft & ContentHeader.
   * Scrollable areas are the AsideLeft and the PageGrid. The ContentHeader does not scroll.
   *
   *```
   * +-------------------------------+
   * |         ContentHeader         |
   * +-------------------------------+
   * |  Aside  |      PageGrid       |
   * |  Left   |                     |
   * +-------------------------------+
   * ```
   */
  ContentGrid,

  /**
   * {@link ContentHeader} is a flexible header component for displaying page titles,
   * metadata, description, breadcrumbs, and actions at the top of application pages.
   *
   * **Components**
   * - {@link ContentHeader.Actions} - Action buttons or controls
   * - {@link ContentHeader.Breadcrumbs} - Navigation breadcrumb trail
   * - {@link ContentHeader.Description} - Descriptive text content
   * - {@link ContentHeader.Metadata} - Subtle metadata information
   * - {@link ContentHeader.Navigation} - Navigation items container
   * - {@link ContentHeader.NavigationDropdownItem} - Dropdown navigation item
   * - {@link ContentHeader.NavigationItem} - Regular navigation item
   * - {@link ContentHeader.Title} - Main page title (required) with optional prefix/suffix
   *
   * ```tsx
   * <Layout.ContentHeader
   *   actions={
   *     <Layout.ContentHeader.Actions>
   *       <Button>Secondary action</Button>
   *       <Button variety={ButtonVariety.Primary}>Primary action</Button>
   *     </Layout.ContentHeader.Actions>
   *   }
   *   breadcrumbs={
   *     <Layout.ContentHeader.Breadcrumbs
   *       items={[
   *         { linkElement: 'Breadcrumb item 1', to: 'https://sonarsource.com' },
   *         { linkElement: 'Breadcrumb item 2', to: '' },
   *       ]}
   *     />
   *   }
   *   description={<Layout.ContentHeader.Description>Page description</Layout.ContentHeader.Description>}
   *   metadata={<Layout.ContentHeader.Metadata>Page metadata</Layout.ContentHeader.Metadata>}
   *   navigation={
   *     <Layout.ContentHeader.Navigation>
   *       <Layout.ContentHeader.NavigationItem to="/">Home</Layout.ContentHeader.NavigationItem>
   *
   *       <Layout.ContentHeader.NavigationDropdownItem
   *         items={
   *           <>
   *             <DropdownMenu.ItemLink to="/option1">option 1</DropdownMenu.ItemLink>
   *             <DropdownMenu.ItemLink to="/option2">option 2</DropdownMenu.ItemLink>
   *           </>
   *         }>
   *         More
   *       </Layout.ContentHeader.NavigationDropdownItem>
   *     </Layout.ContentHeader.Navigation>
   *   }
   *   title={
   *     <Layout.ContentHeader.Title
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
   *     </Layout.ContentHeader.Title>
   *   }
   * />
   * ```
   */
  ContentHeader,

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
   * The Page Grid defines the layout for the page elements. PageContent is the main container and is mandatory.
   * PageHeader and PageFooter are optional.
   *
   * ```
   * +---------------------+
   * |     PageHeader      |
   * +---------------------+
   * |     PageContent     |
   * +---------------------+
   * |     PageFooter      |
   * +---------------------+
   * ```
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
