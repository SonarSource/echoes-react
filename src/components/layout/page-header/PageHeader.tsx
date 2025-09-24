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

import styled from '@emotion/styled';
import { CSSProperties, forwardRef, ReactNode } from 'react';
import { useForwardedRef } from '~common/helpers/useForwardedRef';
import { useResizeObserver } from '~common/helpers/useResizeObserver';
import { cssVar } from '~utils/design-tokens';
import { Divider } from '../../divider';
import { ContentGridArea, PageGridArea, PageHeaderScrollBehavior } from '../LayoutTypes';

enum PageHeaderArea {
  breadcrumbs = 'breadcrumbs',
  main = 'main',
  actions = 'actions',
  nav = 'nav',
  divider = 'divider',
}

const STICKY_ACTIONS_STYLES: CSSProperties = {
  top: cssVar('layout-page-header-actions-offset-collapsed'),
  position: 'sticky',
};

export interface HeaderProps {
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
   *   return <Layout.PageGrid>
   *     <Layout.PageHeader breadcrumbs={<Layout.PageHeader.Breadcrumbs
   *       items={[
   *         { linkElement: 'root', to: '/scope' },
   *         { linkElement: 'example', to: '/scope/example' },
   *         props.pageBreadcrumb
   *       ]}
   *     />} {...otherHeaderProps} />
   *
   *     <Layout.PageContent>
   *       {props.children}
   *     </Layout.PageContent>
   *
   *     <GlobalFooter />
   *   </Layout.PageGrid>
   * }
   * ```
   *
   * Each page can then use it as a root element:
   * ```
   * function PageOne() {
   *   return <ExamplePageTemplate pageBreadcrumb={{ linkElement: 'Page 1', to: '/scope/example/p1' }}>
   *      Whatever content
   *   </ExamplePageTemplate>
   * }
   * ```
   *
   */
  breadcrumbs?: ReactNode;
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

/**
 * A flexible content header component that displays a title, optional metadata, description,
 * breadcrumbs, actions and navigation.
 */
export const ContentHeaderRoot = forwardRef<HTMLDivElement, HeaderProps>((props, forwardedRef) => (
  <BaseHeader {...props} gridArea={ContentGridArea.header} ref={forwardedRef} />
));
ContentHeaderRoot.displayName = 'ContentHeader';

/**
 * A flexible page header component that displays a title, optional metadata, description,
 * breadcrumbs, actions and navigation.
 */
export const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderProps>((props, forwardedRef) => (
  <BaseHeader {...props} gridArea={PageGridArea.header} ref={forwardedRef} />
));
PageHeaderRoot.displayName = 'PageHeader';

interface InternalProps {
  gridArea: ContentGridArea | PageGridArea;
}

const BaseHeader = forwardRef<HTMLDivElement, PageHeaderProps & InternalProps>(
  (props, forwardedRef) => {
    const {
      actions,
      breadcrumbs,
      description,
      disableStickyActions = false,
      gridArea,
      hasDivider,
      metadata,
      navigation,
      scrollBehavior = PageHeaderScrollBehavior.scroll,
      title,
      ...rest
    } = props;

    const [ref, setRef] = useForwardedRef(forwardedRef);
    const { height = 0 } = useResizeObserver(ref);

    // The actions are sticky when the PageHeader's behavior is `collapse`.
    // `disableStickyActions` cancels that.
    const stickyActions =
      scrollBehavior === PageHeaderScrollBehavior.collapse && !disableStickyActions;

    return (
      <StyledPageHeader
        ref={setRef}
        {...rest}
        css={{
          '--header-grid-area': gridArea,
          '--page-header-total-height': `${height}px`,
          ...pageHeaderBehaviorStyles[scrollBehavior],
        }}
        hasFullWidthNav={!stickyActions}>
        {breadcrumbs && <StyledPageHeaderBreadcrumbs>{breadcrumbs}</StyledPageHeaderBreadcrumbs>}

        <StyledPageHeaderMain>
          {title}

          {metadata}

          {description}
        </StyledPageHeaderMain>

        {actions && (
          <StyledPageHeaderActions style={stickyActions ? STICKY_ACTIONS_STYLES : undefined}>
            {actions}
          </StyledPageHeaderActions>
        )}

        {navigation && (
          <>
            <StyledPageHeaderBottom>{navigation}</StyledPageHeaderBottom>
            <StyledDividerWithOverlap />
          </>
        )}
        {hasDivider && !navigation && <StyledDivider />}
      </StyledPageHeader>
    );
  },
);
BaseHeader.displayName = 'BaseHeader';

const pageHeaderBehaviorStyles: Record<PageHeaderScrollBehavior, CSSProperties> = {
  [PageHeaderScrollBehavior.collapse]: {
    position: 'sticky',
    // The top position is the target height from which we remove the total height and the top margin
    top: `calc(
      ${cssVar('layout-page-header-sizes-height-collapsed')}
      - var(--page-header-total-height)
      - ${cssVar('dimension-space-300')})`,
  },
  [PageHeaderScrollBehavior.scroll]: {},
  [PageHeaderScrollBehavior.sticky]: {
    position: 'sticky',
    top: 0,
  },
};

const StyledPageHeader = styled.div<{ hasFullWidthNav: boolean }>`
  grid-area: var(--header-grid-area);

  display: grid;

  grid-template-columns: auto min-content;
  grid-template-rows: repeat(4, auto);
  grid-template-areas: ${({ hasFullWidthNav }) =>
    hasFullWidthNav
      ? `
      '${PageHeaderArea.breadcrumbs}  ${PageHeaderArea.breadcrumbs}'
      '${PageHeaderArea.main}         ${PageHeaderArea.actions}'
      '${PageHeaderArea.nav}          ${PageHeaderArea.nav}'
      '${PageHeaderArea.divider}      ${PageHeaderArea.divider}'
    `
      : `
      '${PageHeaderArea.breadcrumbs}  ${PageHeaderArea.breadcrumbs}'
      '${PageHeaderArea.main}         ${PageHeaderArea.actions}'
      '${PageHeaderArea.nav}          _'
      '${PageHeaderArea.divider}      ${PageHeaderArea.divider}'
    `};

  padding-top: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};

  background-color: ${cssVar('color-surface-default')};
`;

StyledPageHeader.displayName = 'StyledPageHeader';

const StyledPageHeaderBreadcrumbs = styled.div`
  grid-area: ${PageHeaderArea.breadcrumbs};

  margin-bottom: ${cssVar('dimension-space-200')};
`;
StyledPageHeaderBreadcrumbs.displayName = 'StyledPageHeaderBreadcrumbs';

const StyledPageHeaderBottom = styled.div`
  grid-area: ${PageHeaderArea.nav};

  white-space: nowrap;

  margin-top: ${cssVar('dimension-space-300')};
`;

StyledPageHeaderBottom.displayName = 'StyledPageHeaderBottom';

const StyledPageHeaderMain = styled.div`
  grid-area: ${PageHeaderArea.main};

  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  margin-right: ${cssVar('dimension-space-100')};
`;
StyledPageHeaderMain.displayName = 'StyledPageHeaderMain';

const StyledPageHeaderActions = styled.div`
  grid-area: ${PageHeaderArea.actions};

  display: flex;
  gap: ${cssVar('dimension-space-100')};
  white-space: nowrap;
`;
StyledPageHeaderActions.displayName = 'StyledPageHeaderActions';

const StyledDivider = styled(Divider)`
  grid-area: ${PageHeaderArea.divider};
  margin-top: ${cssVar('dimension-space-300')};
`;
StyledDivider.displayName = 'StyledDivider';

const StyledDividerWithOverlap = styled(StyledDivider)`
  margin-top: -1px;
`;
StyledDividerWithOverlap.displayName = 'StyledDividerWithOverlap';
