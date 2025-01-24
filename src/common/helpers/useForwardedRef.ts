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
import { type ForwardedRef, useState } from 'react';

/**
 * This hook may be used to intercept a forwarded ref, providing a local ref
 * that can be used in the component.
 *
 * **Example**
 *
 * ```typescript
 * const Input = forwardRef<HTMLInputElement>((props, forwardedRef) => {
 *   const [ref, setRef] = useForwardedRef(forwardedRef);
 *   return <input ref={setRef} />
 * });
 * ```
 */
export function useForwardedRef<T>(forwardedRef: ForwardedRef<T>) {
  const [ref, setRef] = useState<T | null>(null);

  const setForwardedRef = (element: T | null) => {
    if (typeof forwardedRef === 'function') {
      forwardedRef(element);
    } else if (forwardedRef) {
      forwardedRef.current = element;
    }

    setRef(element);
  };

  return [ref, setForwardedRef] as const;
}
