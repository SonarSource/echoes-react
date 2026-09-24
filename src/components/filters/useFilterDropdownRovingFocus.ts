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

import { useCallback, useRef } from 'react';

/**
 * @internal
 * Feature-local roving-tabindex helper for FilterDropdown's flat vertical lists. Similar implementation as radix-ui.
 *
 * Returns:
 * - `register(index)` — a stable ref-callback to attach to each row. Caches one callback
 *   per index so React does not unnecessarily null-and-re-register elements across renders.
 *   The slot is set to null when the element unmounts (React 19 null-on-detach safe).
 * - `focus(index)` — imperatively moves focus to the registered element at `index`.
 */
export function useFilterDropdownRovingFocus() {
  const itemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  // One cached callback per index so React gets a stable reference across re-renders,
  // avoiding unnecessary null → element → null detach/attach cycles.
  const callbacksRef = useRef<((el: HTMLButtonElement | null) => void)[]>([]);

  const register = useCallback((index: number) => {
    let cb = callbacksRef.current[index];
    if (cb === undefined) {
      cb = (el: HTMLButtonElement | null) => {
        itemsRef.current[index] = el;
      };
      callbacksRef.current[index] = cb;
    }
    return cb;
  }, []);

  const focus = useCallback((index: number) => {
    itemsRef.current[index]?.focus();
  }, []);

  return { focus, register };
}
