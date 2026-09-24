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
import { type ReactNode, type Ref } from 'react';
import { cssVar } from '~utils/design-tokens';
import { LayoutSidebarContext } from './LayoutSidebarContext';
import { SIDEBAR_INTERACTION_ZONE_ATTRIBUTE } from './LayoutSidebarInteraction';
import { GlobalGridArea } from './LayoutTypes';
import { useLayoutSidebarState } from './useLayoutSidebarState';

export interface LayoutProps {
  /** Optional CSS class name applied to the layout root element */
  className?: string;
  /** Main layout content */
  children: ReactNode;
  /**
   * Whether the sidebar should be initially docked 🦆 or not, useful to init with user preferences.
   */
  isSidebarInitiallyDocked?: boolean;
  /**
   * Callback function called when the sidebar docked state changes, useful to save user preferences.
   */
  onSidebarDockedChange?: (isDocked: boolean) => void;
  /** React ref forwarded to the layout root element */
  ref?: Ref<HTMLDivElement>;
}

export function Layout(props: Readonly<LayoutProps>) {
  const {
    children,
    className,
    isSidebarInitiallyDocked,
    onSidebarDockedChange,
    ref,
    ...htmlProps
  } = props;

  const sidebar = useLayoutSidebarState({
    isSidebarInitiallyDocked,
    onSidebarDockedChange,
  });

  return (
    <Viewport>
      <MainGrid
        className={className}
        data-sidebar-docked={sidebar.isDocked && sidebar.isDockable}
        data-sidebar-in-layout={sidebar.isInLayout}
        data-sidebar-is-dockable={sidebar.isDockable}
        data-sidebar-open={sidebar.isOpen}
        {...htmlProps}
        ref={ref}>
        <LayoutSidebarContext.Provider value={sidebar}>
          {children}

          <LayoutSidebarTopInteractionZone
            {...{ [SIDEBAR_INTERACTION_ZONE_ATTRIBUTE]: 'true' }}
            aria-hidden
            data-testid="sidebar-top-interaction-zone"
            onMouseLeave={(event) => {
              sidebar.handleInteractionZoneMouseLeave(event.relatedTarget);
            }}
          />
        </LayoutSidebarContext.Provider>
      </MainGrid>
    </Viewport>
  );
}

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

// Pointer-only zone that covers the full sidebar width above the floating sidebar
const LayoutSidebarTopInteractionZone = styled.div`
  grid-column: 1;
  grid-row: 1 / 3;
  inset: 0;
  pointer-events: none;
  position: absolute;

  width: calc(
    ${cssVar('layout-sidebar-navigation-sizes-width-open')} + ${cssVar('border-width-default')}
  );

  z-index: 0;

  [data-sidebar-docked='false'][data-sidebar-open='true'] & {
    pointer-events: auto;
  }
`;

LayoutSidebarTopInteractionZone.displayName = 'LayoutSidebarTopInteractionZone';
