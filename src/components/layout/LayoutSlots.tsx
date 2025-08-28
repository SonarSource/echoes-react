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

export enum GlobalGridArea {
  header = 'header',
  banner = 'banner',
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

/*
 * Layer 1 Grid components
 */
export const BannerContainer = styled.div`
  grid-area: ${GlobalGridArea.banner};
`;
BannerContainer.displayName = 'BannerContainer';

export const Header = styled.div`
  grid-area: ${GlobalGridArea.header};
`;
Header.displayName = 'Header';

export const ContentWrapper = styled.div<{ fixed?: boolean }>`
  position: relative;
  grid-area: ${GlobalGridArea.content};
  overflow-y: hidden;

  ${(props) =>
    props.fixed
      ? css`
          margin-left: auto;
          margin-right: auto;
          max-width: 1550px;
        `
      : ''}

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    '${ContentGridArea.header} ${ContentGridArea.header}'
    '${ContentGridArea.aside} ${ContentGridArea.page}';
`;
ContentWrapper.displayName = 'ContentWrapper';

/*
 * Layer 2 Grid components
 * (ContentGrid)
 */

export const Aside = styled.div`
  grid-area: ${ContentGridArea.aside};
  background-color: rgba(10, 120, 30, 0.6);
  padding: 16px;
  width: 200px;
  overflow-y: auto;
`;
Aside.displayName = 'Aside';

export const PageWrapper = styled.div`
  grid-area: ${ContentGridArea.page};
  overflow-y: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    '${PageGridArea.header}'
    '${PageGridArea.main}'
    '${PageGridArea.footer}';
`;

export const PageHeader = styled.div<{ sticky: boolean }>`
  grid-area: ${PageGridArea.header};
  height: 200px;
  ${(props) => (props.sticky ? 'position: sticky;' : '')}
  top: -150px;
  background-color: aliceblue;
  padding: 16px;
`;

export const PageContent = styled.div`
  grid-area: ${PageGridArea.main};
  padding: 16px;
`;

export const PageFooter = styled.div`
  grid-area: ${PageGridArea.footer};
  height: 120px;
  background: linear-gradient(rgb(122, 108, 108), rgb(130, 44, 44));
`;
