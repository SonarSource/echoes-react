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

import { createContext, Dispatch, SetStateAction } from 'react';

export interface LayoutContextShape {
  closeSidebar: VoidFunction;
  enterSidebarInteractionBoundary: VoidFunction;
  handleSidebarInteractionBoundaryBlur: (relatedTarget: EventTarget | null) => void;
  handleSidebarInteractionBoundaryExit: (
    clientX: number,
    relatedTarget: EventTarget | null,
  ) => void;
  hasSidebar: boolean;
  isSidebarDockable: boolean;
  isSidebarDocked: boolean;
  isSidebarOpen: boolean;
  isSidebarPointerInside: boolean;
  leaveSidebarInteractionBoundary: VoidFunction;
  openSidebar: VoidFunction;
  setHasSidebar: Dispatch<SetStateAction<boolean>>;
  setIsSidebarDocked: Dispatch<SetStateAction<boolean>>;
  setSidebarInteractionSafeAreaElement: (element: HTMLElement | null) => void;
}

export const LayoutContext = createContext<LayoutContextShape>({
  closeSidebar: () => {},
  enterSidebarInteractionBoundary: () => {},
  handleSidebarInteractionBoundaryBlur: () => {},
  handleSidebarInteractionBoundaryExit: () => {},
  hasSidebar: false,
  isSidebarDockable: false,
  isSidebarDocked: false,
  isSidebarOpen: false,
  isSidebarPointerInside: false,
  leaveSidebarInteractionBoundary: () => {},
  openSidebar: () => {},
  setHasSidebar: () => {},
  setIsSidebarDocked: () => {},
  setSidebarInteractionSafeAreaElement: () => {},
});
