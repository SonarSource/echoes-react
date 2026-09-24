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

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { isDefined } from '~common/helpers/types';
import { designToken } from '~utils/design-tokens';
import type { LayoutSidebarContextShape } from './LayoutSidebarContext';

import { isWithinSidebarInteractionZone } from './LayoutSidebarInteraction';

interface UseLayoutSidebarStateInput {
  isSidebarInitiallyDocked?: boolean;
  onSidebarDockedChange?: (isDocked: boolean) => void;
}

export function useLayoutSidebarState(
  props: Readonly<UseLayoutSidebarStateInput>,
): LayoutSidebarContextShape {
  const { isSidebarInitiallyDocked, onSidebarDockedChange } = props;

  const mediaQueryList = useMemo(
    () =>
      globalThis.matchMedia(
        `(min-width: ${designToken('layout-sidebar-navigation-sizes-breakpoint-dockable')})`,
      ),
    [],
  );

  const [isInLayout, setIsInLayout] = useState(false);

  const [isDocked, setIsDocked] = useState(
    () => isSidebarInitiallyDocked ?? mediaQueryList.matches,
  );

  const [isDockable, setIsDockable] = useState(() => mediaQueryList.matches);
  const [isUndockedOpen, setIsUndockedOpen] = useState(false);
  const blurTimeoutRef = useRef<ReturnType<typeof globalThis.setTimeout> | undefined>(undefined);
  const shouldIgnoreNextInteractionZoneBlurRef = useRef(false);

  const isOpen = isInLayout && ((isDocked && isDockable) || isUndockedOpen);

  const open = useCallback(() => {
    if (isInLayout) {
      setIsUndockedOpen(true);
    }
  }, [isInLayout]);

  const close = useCallback(() => {
    setIsUndockedOpen(false);
  }, []);

  const handleInteractionZoneBlur = useCallback(
    (relatedTarget: EventTarget | null) => {
      if (isWithinSidebarInteractionZone(relatedTarget)) {
        return;
      }

      if (shouldIgnoreNextInteractionZoneBlurRef.current) {
        shouldIgnoreNextInteractionZoneBlurRef.current = false;

        return;
      }

      if (isDefined(blurTimeoutRef.current)) {
        globalThis.clearTimeout(blurTimeoutRef.current);
      }

      // Defer the close check until the browser updates activeElement after blur
      blurTimeoutRef.current = globalThis.setTimeout(() => {
        if (isWithinSidebarInteractionZone(globalThis.document.activeElement)) {
          return;
        }

        close();
      }, 0);
    },
    [close],
  );

  const handleInteractionZoneMouseLeave = useCallback(
    (relatedTarget: EventTarget | null) => {
      if (
        isWithinSidebarInteractionZone(relatedTarget) ||
        isWithinSidebarInteractionZone(globalThis.document.activeElement)
      ) {
        return;
      }

      close();
    },
    [close],
  );

  const ignoreNextInteractionZoneBlur = useCallback(() => {
    shouldIgnoreNextInteractionZoneBlurRef.current = true;
  }, []);

  useEffect(() => {
    const handleMediaQueryChange = ({ matches: canDockSidebar }: MediaQueryListEvent) => {
      setIsDockable(canDockSidebar);
    };

    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [mediaQueryList]);

  useEffect(() => {
    onSidebarDockedChange?.(isDocked);
  }, [isDocked, onSidebarDockedChange]);

  useEffect(() => {
    if (!isInLayout || (isDocked && isDockable)) {
      setIsUndockedOpen(false);
    }
  }, [isDockable, isDocked, isInLayout]);

  useEffect(() => {
    return () => {
      if (isDefined(blurTimeoutRef.current)) {
        globalThis.clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  return useMemo(
    () => ({
      close,
      handleInteractionZoneBlur,
      handleInteractionZoneMouseLeave,
      ignoreNextInteractionZoneBlur,
      isDockable,
      isDocked,
      isInLayout,
      isOpen,
      open,
      setIsDocked,
      setIsInLayout,
    }),
    [
      close,
      handleInteractionZoneBlur,
      handleInteractionZoneMouseLeave,
      ignoreNextInteractionZoneBlur,
      isDockable,
      isDocked,
      isInLayout,
      isOpen,
      open,
    ],
  );
}
