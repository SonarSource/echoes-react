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

import { useEffect, useState } from 'react';
import { throttle, THROTTLE_SHORT_DELAY } from './utils';

/**
 * A React hook that tracks the scroll position of the document.
 * It returns an object containing the current scroll position (left and top).
 * The scroll position is updated at a throttled rate to improve performance.
 *
 * @returns An object with `left` and `top` properties representing the current scroll position.
 */
export function useFollowScroll(enabled = true) {
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    const followScroll = throttle(() => {
      if (document.documentElement) {
        setLeft(document.documentElement.scrollLeft);
        setTop(document.documentElement.scrollTop);
      }
    }, THROTTLE_SHORT_DELAY);

    if (enabled) {
      document.addEventListener('scroll', followScroll);
    }

    return () => document.removeEventListener('scroll', followScroll);
  }, [enabled]);

  return { left, top };
}
