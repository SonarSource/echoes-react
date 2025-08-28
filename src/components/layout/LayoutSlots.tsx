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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { PropsWithChildren } from 'react';
import { cssVar } from '~utils/design-tokens';

export enum GlobalGridArea {
  banner = 'banner',
  globalNav = 'global-nav',
  sidebar = 'sidebar',
  content = 'content',
}

export enum ContentGridArea {
  header = 'header',
  aside = 'aside',
  page = 'page',
}

export enum PageGridArea {
  header = 'header',
  main = 'main',
  footer = 'footer',
}

export enum AsideSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const AsideWidth = {
  [AsideSize.small]: cssVar('layout-aside-width-small'),
  [AsideSize.medium]: cssVar('layout-aside-width-medium'),
  [AsideSize.large]: cssVar('layout-aside-width-large'),
};

/*
 * Layer 1 Grid components
 */
export const BannerContainer = styled.div`
  grid-area: ${GlobalGridArea.banner};
`;
BannerContainer.displayName = 'BannerContainer';

export const GlobalNavContainer = styled.div`
  grid-area: ${GlobalGridArea.globalNav};
`;
GlobalNavContainer.displayName = 'GlobalNavContainer';

export const ContentGrid = styled.div<{ fixed?: boolean }>`
  position: relative;
  grid-area: ${GlobalGridArea.content};
  overflow-y: hidden;

  ${(props) =>
    props.fixed
      ? css`
          margin-left: auto;
          margin-right: auto;
          max-width: ${cssVar('layout-sizes-max-width-large')};
        `
      : ''}

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    '${ContentGridArea.header} ${ContentGridArea.header}'
    '${ContentGridArea.aside} ${ContentGridArea.page}';
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
export function AsideLeft(props: PropsWithChildren<AsideProps>) {
  const { children, size, ...restProps } = props;
  return (
    <StyledAside {...restProps} css={{ width: AsideWidth[size] }}>
      {children}
    </StyledAside>
  );
}
const StyledAside = styled.div`
  grid-area: ${ContentGridArea.aside};
  overflow-y: auto;
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

export const PageHeader = styled.div<{ sticky: boolean }>`
  grid-area: ${PageGridArea.header};
  height: 200px;
  ${(props) => (props.sticky ? 'position: sticky;' : '')}
  top: -150px;
  background-color: aliceblue;
  padding: 16px;
`;
PageHeader.displayName = 'PageHeader';

export const PageContent = styled.div`
  grid-area: ${PageGridArea.main};
  padding: 16px;
`;
PageContent.displayName = 'PageContent';

export const PageFooter = styled.div`
  grid-area: ${PageGridArea.footer};
`;
PageFooter.displayName = 'PageFooter';
