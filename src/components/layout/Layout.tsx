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
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { cssVar } from '~utils/design-tokens';
import { LayoutContext } from './LayoutContext';
import { GlobalGridArea } from './LayoutTypes';

const LAYOUT_SIDEBAR_BREAKPOINT = 1320;

export function Layout({ children }: PropsWithChildren) {
  const mediaQueryList = useMemo(
    () => window.matchMedia(`(min-width: ${LAYOUT_SIDEBAR_BREAKPOINT}px)`),
    [],
  );
  const [hasSidebar, setHasSidebar] = useState(false);
  const [isSidebarDocked, setIsSidebarDocked] = useState(() => mediaQueryList.matches);
  const [isSidebarDockable, setIsSidebarDockable] = useState(() => mediaQueryList.matches);

  const layoutContextValue = useMemo(
    () => ({
      hasSidebar,
      isSidebarDocked,
      setHasSidebar,
      setIsSidebarDocked,
    }),
    [hasSidebar, isSidebarDocked],
  );

  useEffect(() => {
    const handleMediaQueryChange = ({ matches: canDockSidebar }: MediaQueryListEvent) => {
      setIsSidebarDockable(canDockSidebar);
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [mediaQueryList]);

  return (
    <Viewport>
      <MainGrid
        data-sidebar-docked={isSidebarDocked && isSidebarDockable}
        data-sidebar-exist={hasSidebar}
        data-sidebar-is-dockable={isSidebarDockable}>
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
