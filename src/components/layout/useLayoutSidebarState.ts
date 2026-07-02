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

import { useCallback, useEffect, useMemo, useState } from 'react';
import { designToken } from '~utils/design-tokens';
import type { LayoutContextShape } from './LayoutContext';

import {
  isSidebarInteractionBoundaryTarget,
  isSidebarPointerWithinSafeArea,
} from './LayoutSidebarInteraction';

interface UseLayoutSidebarStateInput {
  isSidebarInitiallyDocked?: boolean;
  onSidebarDockedChange?: (isDocked: boolean) => void;
}

export function useLayoutSidebarState(
  props: Readonly<UseLayoutSidebarStateInput>,
): LayoutContextShape {
  const { isSidebarInitiallyDocked, onSidebarDockedChange } = props;

  const mediaQueryList = useMemo(
    () =>
      globalThis.matchMedia(
        `(min-width: ${designToken('layout-sidebar-navigation-sizes-breakpoint-dockable')})`,
      ),
    [],
  );

  const [hasSidebar, setHasSidebar] = useState(false);

  const [isSidebarDocked, setIsSidebarDocked] = useState(
    () => isSidebarInitiallyDocked ?? mediaQueryList.matches,
  );

  const [isSidebarDockable, setIsSidebarDockable] = useState(() => mediaQueryList.matches);
  const [isSidebarUndockedOpen, setIsSidebarUndockedOpen] = useState(false);
  const [isSidebarPointerInside, setIsSidebarPointerInside] = useState(false);

  const [sidebarInteractionSafeAreaElement, setSidebarInteractionSafeAreaElement] =
    useState<HTMLElement | null>(null);

  const isSidebarOpen =
    hasSidebar && ((isSidebarDocked && isSidebarDockable) || isSidebarUndockedOpen);

  const openSidebar = useCallback(() => {
    if (hasSidebar) {
      setIsSidebarUndockedOpen(true);
    }
  }, [hasSidebar]);

  const closeSidebar = useCallback(() => {
    setIsSidebarUndockedOpen(false);
  }, []);

  const enterSidebarInteractionBoundary = useCallback(() => {
    setIsSidebarPointerInside(true);
    openSidebar();
  }, [openSidebar]);

  const leaveSidebarInteractionBoundary = useCallback(() => {
    setIsSidebarPointerInside(false);
  }, []);

  const isPointerWithinSidebarSafeArea = useCallback(
    (clientX: number) => isSidebarPointerWithinSafeArea(sidebarInteractionSafeAreaElement, clientX),
    [sidebarInteractionSafeAreaElement],
  );

  const handleSidebarInteractionBoundaryBlur = useCallback(
    (relatedTarget: EventTarget | null) => {
      if (!isSidebarInteractionBoundaryTarget(relatedTarget) && !isSidebarPointerInside) {
        closeSidebar();
      }
    },
    [closeSidebar, isSidebarPointerInside],
  );

  const handleSidebarInteractionBoundaryExit = useCallback(
    (clientX: number, relatedTarget: EventTarget | null) => {
      if (!isSidebarInteractionBoundaryTarget(relatedTarget)) {
        leaveSidebarInteractionBoundary();

        if (
          !isSidebarInteractionBoundaryTarget(globalThis.document.activeElement) &&
          !isPointerWithinSidebarSafeArea(clientX)
        ) {
          closeSidebar();
        }
      }
    },
    [closeSidebar, isPointerWithinSidebarSafeArea, leaveSidebarInteractionBoundary],
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

  useEffect(() => {
    if (!hasSidebar || (isSidebarDocked && isSidebarDockable)) {
      setIsSidebarPointerInside(false);
      setIsSidebarUndockedOpen(false);
    }
  }, [hasSidebar, isSidebarDockable, isSidebarDocked]);

  useEffect(() => {
    if (!hasSidebar || !isSidebarUndockedOpen || (isSidebarDocked && isSidebarDockable)) {
      return undefined;
    }

    const handleDocumentMouseMove = ({ clientX }: MouseEvent) => {
      if (
        isSidebarPointerInside ||
        isSidebarInteractionBoundaryTarget(globalThis.document.activeElement) ||
        isPointerWithinSidebarSafeArea(clientX)
      ) {
        return;
      }

      closeSidebar();
    };

    const handleDocumentMouseLeave = () => {
      if (!isSidebarInteractionBoundaryTarget(globalThis.document.activeElement)) {
        closeSidebar();
      }
    };

    globalThis.document.addEventListener('mouseleave', handleDocumentMouseLeave);
    globalThis.document.addEventListener('mousemove', handleDocumentMouseMove);

    return () => {
      globalThis.document.removeEventListener('mouseleave', handleDocumentMouseLeave);
      globalThis.document.removeEventListener('mousemove', handleDocumentMouseMove);
    };
  }, [
    closeSidebar,
    hasSidebar,
    isPointerWithinSidebarSafeArea,
    isSidebarDockable,
    isSidebarDocked,
    isSidebarPointerInside,
    isSidebarUndockedOpen,
  ]);

  return useMemo(
    () => ({
      closeSidebar,
      enterSidebarInteractionBoundary,
      handleSidebarInteractionBoundaryBlur,
      handleSidebarInteractionBoundaryExit,
      hasSidebar,
      isSidebarDockable,
      isSidebarDocked,
      isSidebarOpen,
      isSidebarPointerInside,
      leaveSidebarInteractionBoundary,
      openSidebar,
      setHasSidebar,
      setIsSidebarDocked,
      setSidebarInteractionSafeAreaElement,
    }),
    [
      closeSidebar,
      enterSidebarInteractionBoundary,
      handleSidebarInteractionBoundaryBlur,
      handleSidebarInteractionBoundaryExit,
      hasSidebar,
      isSidebarDockable,
      isSidebarDocked,
      isSidebarOpen,
      isSidebarPointerInside,
      leaveSidebarInteractionBoundary,
      openSidebar,
      setSidebarInteractionSafeAreaElement,
    ],
  );
}
