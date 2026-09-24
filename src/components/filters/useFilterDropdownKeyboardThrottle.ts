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
import { KEYBOARD_THROTTLE_MS } from '~common/helpers/constants';

/**
 * @internal
 * Returns a stable gate function. Call it before processing a key-repeat navigation event:
 * returns `true` (and records the timestamp) when enough time has elapsed since the last
 * allowed event, `false` when the event should be dropped.
 */
export function useFilterDropdownKeyboardThrottle() {
  const lastFiredRef = useRef(0);
  return useCallback(() => {
    const now = Date.now();
    if (now - lastFiredRef.current < KEYBOARD_THROTTLE_MS) {
      return false;
    }
    lastFiredRef.current = now;
    return true;
  }, []);
}
