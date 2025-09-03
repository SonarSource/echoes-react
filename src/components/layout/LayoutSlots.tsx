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

  padding-left: ${cssVar('dimension-space-300')};
`;
ContentGrid.displayName = 'ContentGrid';

/*
 * Layer 2 Grid components
 * (ContentGrid)
 */
export interface AsideProps {
  className?: string;
  size: `${AsideSize}`;
}
export const AsideLeft = forwardRef<HTMLDivElement, PropsWithChildren<AsideProps>>((props, ref) => {
  const { children, size, ...restProps } = props;
  return (
    <StyledAside {...restProps} ref={ref} style={AsideSizeStyles[size]}>
      {children}
    </StyledAside>
  );
});
AsideLeft.displayName = 'AsideLeft';

const StyledAside = styled.div`
  grid-area: ${ContentGridArea.aside};
  overflow-y: auto;

  box-sizing: border-box;
  padding-left: ${cssVar('dimension-space-50')};
  padding-right: ${cssVar('dimension-space-100')};
  padding-top: ${cssVar('dimension-space-300')};
  margin-right: ${cssVar('dimension-space-200')};
`;
StyledAside.displayName = 'StyledAside';

export interface PageGridProps {
  className?: string;
  width: `${PageWidth}`;
}

export const PageGrid = forwardRef<HTMLDivElement, PropsWithChildren<PageGridProps>>(
  (props, ref) => {
    const { children, width, ...restProps } = props;
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
  overflow-y: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';
`;
PageGridContainer.displayName = 'PageGridContainer';

const PageGridInner = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';
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

export const PageContent = styled.div`
  grid-area: ${PageGridArea.main};

  padding-top: ${cssVar('dimension-space-300')};
  padding-bottom: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};
`;
PageContent.displayName = 'PageContent';

export const PageFooter = styled.div`
  grid-area: ${PageGridArea.footer};

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding-top: ${cssVar('dimension-space-200')};
  padding-bottom: ${cssVar('dimension-space-300')};
  padding-right: ${cssVar('dimension-space-300')};
`;
PageFooter.displayName = 'PageFooter';
