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
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import { cssVar } from '~utils/design-tokens';
import { AsideSize, ContentGridArea, GlobalGridArea, PageGridArea, PageWidth } from './LayoutTypes';

const AsideSizeStyles: Record<AsideSize, CSSProperties> = {
  [AsideSize.small]: { width: cssVar('layout-aside-width-small') },
  [AsideSize.medium]: { width: cssVar('layout-aside-width-medium') },
  [AsideSize.large]: { width: cssVar('layout-aside-width-large') },
};

/*
 * Layer 1 Grid components
 */
export const BannerContainer = styled.div`
  grid-area: ${GlobalGridArea.banner};

  z-index: 1; // Ensure the banners are showing over the content
`;
BannerContainer.displayName = 'BannerContainer';

export const ContentGrid = styled.div`
  grid-area: ${GlobalGridArea.content};

  position: relative;
  overflow-y: hidden;
  isolation: isolate; // Reset stacking context

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    '${ContentGridArea.header} ${ContentGridArea.header}'
    '${ContentGridArea.aside} ${ContentGridArea.page}';

  background-color: ${cssVar('color-surface-canvas-default')};
`;
ContentGrid.displayName = 'ContentGrid';

/*
 * Layer 2 Grid components
 * (ContentGrid)
 */
export interface AsideProps {
  className?: string;
  id?: string;
  role?: string;
  size?: `${AsideSize}`;
}

export const AsideLeft = forwardRef<HTMLDivElement, PropsWithChildren<AsideProps>>((props, ref) => {
  const { children, size = 'medium', ...restProps } = props;
  return (
    <StyledAsideLeft {...restProps} ref={ref} style={AsideSizeStyles[size]}>
      {children}
    </StyledAsideLeft>
  );
});
AsideLeft.displayName = 'AsideLeft';

const StyledAsideLeft = styled.div`
  grid-area: ${ContentGridArea.aside};
  overflow-y: auto;

  background-color: ${cssVar('color-surface-default')};
  border-right: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};

  box-sizing: border-box;
  padding-left: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-100')};
  padding-top: ${cssVar('dimension-space-300')};
`;
StyledAsideLeft.displayName = 'StyledAside';

export interface PageGridProps {
  className?: string;
  width?: `${PageWidth}`;
}

export const PageGrid = forwardRef<HTMLDivElement, PropsWithChildren<PageGridProps>>(
  (props, ref) => {
    const { children, width = 'default', ...restProps } = props;
    return (
      <PageGridContainer {...restProps} ref={ref}>
        <PageGridInner style={PAGE_WIDTH_STYLES[width]}>{children}</PageGridInner>
      </PageGridContainer>
    );
  },
);
PageGrid.displayName = 'PageGrid';

const PageGridContainer = styled.div`
  grid-area: ${ContentGridArea.page};
  position: relative; // Prevent scroll issues with sr-only elements we can have inside
  overflow-y: auto;
`;
PageGridContainer.displayName = 'PageGridContainer';

const PageGridInner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';

  min-height: 100%;
`;
PageGridInner.displayName = 'PageGridInner';

const PAGE_WIDTH_STYLES: Record<PageWidth, CSSProperties> = {
  [PageWidth.default]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: cssVar('layout-sizes-max-width-default'),
  },

  [PageWidth.fluid]: {},
};

export const PageContent = styled.main`
  grid-area: ${PageGridArea.main};

  padding: ${cssVar('dimension-space-300')};
`;
PageContent.displayName = 'PageContent';

export const PageFooter = styled.footer`
  grid-area: ${PageGridArea.footer};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: ${cssVar('dimension-space-300')};
  padding-top: ${cssVar('dimension-space-200')};
`;
PageFooter.displayName = 'PageFooter';
