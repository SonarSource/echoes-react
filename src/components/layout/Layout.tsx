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
import { PropsWithChildren, useMemo, useState } from 'react';
import { cssVar } from '~utils/design-tokens';
import { LayoutContext } from './LayoutContext';
import { GlobalGridArea } from './LayoutTypes';

export function Layout({ children }: PropsWithChildren) {
  const [hasSidebar, setHasSidebar] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const layoutContextValue = useMemo(
    () => ({
      hasSidebar,
      isSidebarCollapsed,
      setHasSidebar,
      setIsSidebarCollapsed,
    }),
    [hasSidebar, isSidebarCollapsed],
  );

  return (
    <Viewport>
      <MainGrid data-sidebar-collapsed={isSidebarCollapsed} data-sidebar-exist={hasSidebar}>
        <LayoutContext.Provider value={layoutContextValue}>{children}</LayoutContext.Provider>
      </MainGrid>
    </Viewport>
  );
}

const Viewport = styled.div`
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;

  height: 100vh;
  width: 100vw;
`;
Viewport.displayName = 'Viewport';

const MainGrid = styled.div`
  position: relative;

  height: 100%;
  min-width: ${cssVar('layout-sizes-min-width-default')};

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto 1fr;
  grid-template-areas:
    '${GlobalGridArea.banner} ${GlobalGridArea.banner}'
    '${GlobalGridArea.globalNav} ${GlobalGridArea.globalNav}'
    '${GlobalGridArea.sidebar} ${GlobalGridArea.content}';
`;
MainGrid.displayName = 'MainGrid';
