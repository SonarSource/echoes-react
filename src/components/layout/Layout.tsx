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
import { forwardRef, ReactNode, useEffect, useMemo, useState } from 'react';
import { cssVar, designToken } from '~utils/design-tokens';
import { LayoutContext } from './LayoutContext';
import { GlobalGridArea } from './LayoutTypes';

export interface LayoutProps {
  className?: string;
  children: ReactNode;
  /**
   * Whether the sidebar should be initially docked 🦆 or not, useful to init with user preferences.
   */
  isSidebarInitiallyDocked?: boolean;
  /**
   * Callback function called when the sidebar docked state changes, useful to save user preferences.
   */
  onSidebarDockedChange?: (isDocked: boolean) => void;
}

export const Layout = forwardRef<HTMLDivElement, LayoutProps>((props, ref) => {
  const { children, isSidebarInitiallyDocked, onSidebarDockedChange, ...htmlProps } = props;
  const mediaQueryList = useMemo(
    () =>
      window.matchMedia(
        `(min-width: ${designToken('layout-sidebar-navigation-sizes-breakpoint-dockable')})`,
      ),
    [],
  );

  const [hasSidebar, setHasSidebar] = useState(false);
  const [isSidebarDocked, setIsSidebarDocked] = useState(
    () => isSidebarInitiallyDocked ?? mediaQueryList.matches,
  );
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

  useEffect(() => {
    onSidebarDockedChange?.(isSidebarDocked);
  }, [isSidebarDocked, onSidebarDockedChange]);

  return (
    <Viewport>
      <MainGrid
        data-sidebar-docked={isSidebarDocked && isSidebarDockable}
        data-sidebar-exist={hasSidebar}
        data-sidebar-is-dockable={isSidebarDockable}
        {...htmlProps}
        ref={ref}>
        <LayoutContext.Provider value={layoutContextValue}>{children}</LayoutContext.Provider>
      </MainGrid>
    </Viewport>
  );
});
Layout.displayName = 'Layout';

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
