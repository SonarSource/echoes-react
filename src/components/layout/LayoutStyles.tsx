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

export const Header = styled.div`
  grid-area: header;
  background-color: rgba(80, 80, 0, 0.5);
  height: 54px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const BannerContainer = styled.div`
  grid-area: banner;
  background-color: rgba(190, 190, 2, 0.5);
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0 16px;
`;

export const Sidebar = styled.div<{ isCollapsed: boolean }>`
  grid-area: sidebar;
  background-color: rgba(10, 120, 120, 0.6);
  padding: 16px;
  width: ${(props) => (props.isCollapsed ? '48px' : '240px')};
`;

export const Aside = styled.div`
  grid-area: aside-left;
  background-color: rgba(10, 120, 30, 0.6);
  padding: 16px;
  width: 200px;
  overflow-y: auto;
`;

export const ContentWrapper = styled.div<{ fixed?: boolean }>`
  position: relative;
  grid-area: content;
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
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    'header header header'
    'aside-left main aside-right';
`;

export const PageWrapper = styled.div`
  grid-area: main;
  overflow-y: auto;

  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 'header' 'body' 'footer';
`;

export const PageHeader = styled.div<{ sticky: boolean }>`
  grid-area: header;
  height: 200px;
  ${(props) => (props.sticky ? 'position: sticky;' : '')}
  top: -150px;
  background-color: aliceblue;
  padding: 16px;
`;

export const PageContent = styled.div`
  grid-area: body;
  padding: 16px;
`;

export const PageFooter = styled.div`
  grid-area: footer;
  height: 120px;
  background: linear-gradient(rgb(122, 108, 108), rgb(130, 44, 44));
`;
