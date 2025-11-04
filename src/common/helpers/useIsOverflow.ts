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

import { DependencyList, MutableRefObject, useLayoutEffect, useState } from 'react';

/**
 * This hook checks if the content of a given ref is overflowing its container horizontally.
 * It returns a boolean indicating whether the content is overflowing.
 *
 * @param forwardedRef - The ref to check for overflow.
 * @param deps - Optional dependencies array to re-compute the overflow state.
 */
export function useIsOverflow(
  forwardedRef: MutableRefObject<HTMLElement | null>,
  deps: DependencyList = [],
) {
  const [isOverflow, setIsOverflow] = useState<boolean | undefined>(undefined);

  useLayoutEffect(() => {
    if (forwardedRef.current) {
      setIsOverflow(forwardedRef.current.scrollWidth > forwardedRef.current.offsetWidth);
    }
    // We want to be able to pass an array of dependencies to re-compute the overflow state
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forwardedRef, ...deps]);

  return [isOverflow] as const;
}
