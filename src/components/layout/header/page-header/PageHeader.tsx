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

import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { useForwardedRef } from '~common/helpers/useForwardedRef';
import { useResizeObserver } from '~common/helpers/useResizeObserver';
import { cssVar } from '~utils/design-tokens';
import { PageGridArea } from '../../LayoutTypes';
import { StyledHeaderBase } from '../common/HeaderBase';
import { PageHeaderProps, PageHeaderScrollBehavior } from '../common/HeaderTypes';

/**
 * A flexible page header component that displays a title, optional metadata, description,
 * breadcrumbs, actions and navigation. And that has special scroll behaviors.
 */
export const PageHeaderRoot = forwardRef<HTMLDivElement, PageHeaderProps>((props, forwardedRef) => {
  const {
    disableStickyActions = false,
    hasDivider,
    navigation,
    scrollBehavior = PageHeaderScrollBehavior.scroll,
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
      actionsStyles={
        stickyActions
          ? {
              top: cssVar('layout-page-header-actions-offset-collapsed'),
              position: 'sticky',
            }
          : undefined
      }
      css={{
        '--page-header-total-height': `${height}px`,
      }}
      data-scroll-behavior={scrollBehavior}
      hasDivider={hasDivider || Boolean(navigation)}
      hasFullWidthNav={!stickyActions}
      navigation={navigation}
    />
  );
});
PageHeaderRoot.displayName = 'PageHeader';

const StyledPageHeader = styled(StyledHeaderBase)`
  grid-area: ${PageGridArea.header};

  background-color: ${cssVar('color-surface-canvas-default')};

  &[data-scroll-behavior='${PageHeaderScrollBehavior.collapse}'] {
    position: sticky;
    // The top position is the target height from which we remove the total height and the top margin
    top: calc(
      ${cssVar('layout-page-header-sizes-height-collapsed')} - var(--page-header-total-height) -
        ${cssVar('dimension-space-300')}
    );
  }

  &[data-scroll-behavior='${PageHeaderScrollBehavior.sticky}'] {
    position: sticky;
    top: 0;
  }
`;
StyledPageHeader.displayName = 'StyledPageHeader';
