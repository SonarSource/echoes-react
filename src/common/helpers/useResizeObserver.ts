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

import { RefObject, useCallback, useEffect, useState } from 'react';

export function useResizeObserver(ref: RefObject<HTMLElement>) {
  const [width, setWidth] = useState<number>();
  const [height, setHeight] = useState<number>();

  const handleResize = useCallback<ResizeObserverCallback>((entries) => {
    if (!Array.isArray(entries)) {
      return;
    }

    const entry = entries[0];
    setWidth(entry.contentRect.width);
    setHeight(entry.contentRect.height);
  }, []);

  useEffect(() => {
    if (!ref.current) {
      return undefined;
    }

    const RO = new ResizeObserver(handleResize);
    RO.observe(ref.current);

    return () => {
      RO.disconnect();
    };
  }, [handleResize, ref]);

  return { width, height };
}
