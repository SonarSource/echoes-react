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
import { PageGridArea } from '../LayoutTypes';

export enum PageHeaderBehavior {
  collapse = 'collapse',
  scroll = 'scroll',
  sticky = 'sticky',
}

/**
 * Height of the minimal visible portion of the PageHeader when `scrollBehavior` is `collapse`
 */
const COLLAPSED_HEIGHT = 56;

const PageHeaderBehaviorStyles: Record<PageHeaderBehavior, CSSProperties> = {
  [PageHeaderBehavior.collapse]: {
    position: 'sticky',
    // The top position is the target height to which we remove the total height and the top margin
    top: `calc(${COLLAPSED_HEIGHT}px - var(--page-header-total-height) - var(--echoes-dimension-space-300))`,
  },
  [PageHeaderBehavior.scroll]: {},
  [PageHeaderBehavior.sticky]: {
    position: 'sticky',
    top: 0,
  },
};

export interface PageHeaderProps {
  /**
   * Action elements (e.g. a set of <Button>s) to display on the right side of the header.
   * Use <PageHeader.Actions> to wrap them.
   */
  actions?: ReactNode;
  /**
   * When `scrollBehavior` is `collapsed`, the actions become sticky and scroll down
   * to align with the navigation items. Set this to true to let them scroll out of view.
   */
  disableStickyActions?: boolean;
  /**
   * Breadcrumb navigation elements to display above the title.
   * Use <PageHeader.Breadcrumbs> to wrap them.
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
   * When the PageHeader is in the PageGrid container, it scrolls with the content by default.
   *
   *  - `scroll`: default, the header scrolls with the content
   *  - `sticky`: the header sticks to the top
   *  - `collapse`: the header collapses partially
   *
   * /!\ This has no effect when PageHeader is in the ContentGrid container!
   */
  scrollBehavior?: PageHeaderBehavior;
  /**
   * The main title content (required). Use <PageHeader.Title> to wrap it.
   */
  title: ReactNode;
}

/**
 * A flexible page header component that displays a title, optional metadata, description,
 * breadcrumbs, and actions. Can optionally include a divider, and <PageHeader.Navigation> elements
 * as children.
 */
export const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderProps>((props, forwardedRef) => {
  const {
    actions,
    breadcrumbs,
    description,
    disableStickyActions = false,
    hasDivider,
    metadata,
    navigation,
    scrollBehavior = PageHeaderBehavior.scroll,
    title,
    ...rest
  } = props;

  const [ref, setRef] = useForwardedRef(forwardedRef);
  const { height = 0 } = useResizeObserver(ref);

  //
  const stickyActions = scrollBehavior === PageHeaderBehavior.collapse && !disableStickyActions;

  return (
    <StyledPageHeader
      ref={setRef}
      {...rest}
      css={{
        '--page-header-total-height': `${height}px`,
        ...PageHeaderBehaviorStyles[scrollBehavior],
      }}
      hasFullWidthNav={!stickyActions}>
      {breadcrumbs && <StyledPageHeaderBreadcrumbs>{breadcrumbs}</StyledPageHeaderBreadcrumbs>}

      <StyledPageHeaderMain>
        {title}

        {metadata}

        {description}
      </StyledPageHeaderMain>

      {actions && (
        <StyledPageHeaderActions
          style={stickyActions ? { top: cssVar('dimension-space-100'), position: 'sticky' } : {}}>
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
});

PageHeaderRoot.displayName = 'PageHeader';

const StyledPageHeader = styled.div<{ hasFullWidthNav: boolean }>`
  grid-area: ${PageGridArea.header};

  display: grid;

  grid-template-columns: auto min-content;
  grid-template-rows: repeat(4, auto);
  grid-template-areas:
    'breadcrumbs breadcrumbs'
    'main actions'
    '${({ hasFullWidthNav }) => (hasFullWidthNav ? 'nav nav' : 'nav _')}'
    'divider divider';

  padding-top: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};

  background-color: ${cssVar('color-surface-default')};
`;

StyledPageHeader.displayName = 'StyledPageHeader';

const StyledPageHeaderBreadcrumbs = styled.div`
  grid-area: breadcrumbs;

  margin-bottom: ${cssVar('dimension-space-200')};
`;
StyledPageHeaderBreadcrumbs.displayName = 'StyledPageHeaderBreadcrumbs';

const StyledPageHeaderBottom = styled.div`
  grid-area: nav;

  white-space: nowrap;

  margin-top: ${cssVar('dimension-space-300')};
`;

StyledPageHeaderBottom.displayName = 'StyledPageHeaderBottom';

const StyledPageHeaderMain = styled.div`
  grid-area: main;

  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-150')};
  margin-right: ${cssVar('dimension-space-100')};
`;
StyledPageHeaderMain.displayName = 'StyledPageHeaderMain';

const StyledPageHeaderActions = styled.div`
  grid-area: actions;

  display: flex;
  gap: ${cssVar('dimension-space-100')};
  white-space: nowrap;
`;
StyledPageHeaderActions.displayName = 'StyledPageHeaderActions';

const StyledDivider = styled(Divider)`
  grid-area: divider;
  margin-top: ${cssVar('dimension-space-300')};
`;
StyledDivider.displayName = 'StyledDivider';

const StyledDividerWithOverlap = styled(StyledDivider)`
  margin-top: -1px;
`;
StyledDividerWithOverlap.displayName = 'StyledDividerWithOverlap';
