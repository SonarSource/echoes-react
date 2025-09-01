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
import {
  AsideSize,
  ContentGridArea,
  ContentWidth,
  GlobalGridArea,
  PageGridArea,
} from './LayoutTypes';

const ContentWidthStyles: Record<ContentWidth, CSSProperties> = {
  [ContentWidth.fixed]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: cssVar('layout-sizes-max-width-default'),
  },
  [ContentWidth.legacy]: {
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: cssVar('layout-sizes-max-width-large'),
  },
  [ContentWidth.fluid]: {},
};

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

export interface ContentGridProps {
  className?: string;
  width: `${ContentWidth}`;
}
export const ContentGrid = forwardRef<HTMLDivElement, PropsWithChildren<ContentGridProps>>(
  (props, ref) => {
    const { children, width, ...restProps } = props;
    return (
      <StyledContentGrid {...restProps} ref={ref} style={ContentWidthStyles[width]}>
        {children}
      </StyledContentGrid>
    );
  },
);

const StyledContentGrid = styled.div`
  position: relative;
  grid-area: ${GlobalGridArea.content};
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

  padding-right: ${cssVar('dimension-space-100')};
  padding-top: ${cssVar('dimension-space-300')};
  margin-right: ${cssVar('dimension-space-200')};
`;
StyledAside.displayName = 'StyledAside';

export const PageGrid = styled.div`
  grid-area: ${ContentGridArea.page};
  overflow-y: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';
`;
PageGrid.displayName = 'PageGrid';

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
