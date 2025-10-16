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

import { ReactNode } from 'react';

export enum PageHeaderArea {
  breadcrumbs = 'breadcrumbs',
  callout = 'callout',
  main = 'main',
  actions = 'actions',
  nav = 'nav',
  divider = 'divider',
}

export enum PageHeaderScrollBehavior {
  collapse = 'collapse',
  scroll = 'scroll',
  sticky = 'sticky',
}

export interface HeaderProps {
  as?: keyof JSX.IntrinsicElements;
  /**
   * Action elements (e.g. a set of <Button>s) to display on the right side of the header.
   * Use <PageHeader.Actions> to wrap them.
   */
  actions?: ReactNode;
  /**
   * Breadcrumb navigation elements to display above the title.
   * Use <PageHeader.Breadcrumbs> to wrap them.
   *
   * If you need to reuse most of a PageHeader across multiple pages but breadcrumbs change for each,
   * it can be a bit tricky to implement in a KISS way.
   * We suggest you create a *[SpecificSpace]PageTemplate* component that renders the entire PageGrid
   * and expects props to render the page specifics (breadcrumbs, contents and whatever else).
   *
   * For instance:
   *
   * ```
   * function ExamplePageTemplate(props) {
   *   return (
   *     <Layout.PageGrid>
   *       <Layout.PageHeader
   *         breadcrumbs={
   *           <Layout.PageHeader.Breadcrumbs
   *             items={[
   *               { linkElement: 'root', to: '/scope' },
   *               { linkElement: 'example', to: '/scope/example' },
   *               props.pageBreadcrumb,
   *             ]}
   *           />
   *         }
   *         {...otherHeaderProps}
   *       />
   *
   *       <Layout.PageContent>{props.children}</Layout.PageContent>
   *
   *       <GlobalFooter />
   *     </Layout.PageGrid>
   *   );
   * }
   * ```
   *
   * Each page can then use it as a root element:
   * ```
   * function PageOne() {
   *   return (
   *     <ExamplePageTemplate pageBreadcrumb={{ linkElement: 'Page 1', to: '/scope/example/p1' }}>
   *       Whatever content
   *     </ExamplePageTemplate>
   *   );
   * }
   * ```
   *
   */
  breadcrumbs?: ReactNode;
  /**
   * Optional callout message to display at the very top, above the breadcrumbs.
   * Use <MessageCallout> for it.
   */
  callout?: ReactNode;
  /**
   * Additional CSS class name(s)
   */
  className?: string;
  /**
   * Description text to display below the title. Use <PageHeader.Description> to wrap it.
   */
  description?: ReactNode;
  /**
   * Whether to show a divider line at the bottom of the header
   * @default false
   */
  hasDivider?: boolean;
  /**
   * Metadata elements to display below the title. Use <PageHeader.Metadata> to wrap them.
   */
  metadata?: ReactNode;
  /**
   * Navigation elements to display at the bottom. Use <PageHeader.Navigation> to wrap them.
   */
  navigation?: ReactNode;
  /**
   * The main title content (required). Use <PageHeader.Title> to wrap it.
   */
  title: ReactNode;
}

export interface PageHeaderProps extends HeaderProps {
  /**
   * When `scrollBehavior` is `collapsed`, the actions become sticky and scroll down
   * to align with the navigation items. Set this to true to let them scroll out of view.
   */
  disableStickyActions?: boolean;
  /**
   * When the PageHeader is in the PageGrid container, it scrolls with the content by default.
   *
   *  - `scroll`: default, the header scrolls with the content
   *  - `sticky`: the header sticks to the top
   *  - `collapse`: the header collapses partially
   */
  scrollBehavior?: `${PageHeaderScrollBehavior}`;
}
