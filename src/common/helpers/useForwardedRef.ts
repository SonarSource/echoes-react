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
import { type ForwardedRef, useCallback, useRef, useState } from 'react';

/**
 * This hook may be used to intercept a forwarded ref, providing a local ref
 * that can be used in the component.
 * It stores the ref in a state to ensure the component is re-rendered when the ref changes.
 *
 * **Example**
 *
 * ```typescript
 * const Input = forwardRef<HTMLInputElement>((props, forwardedRef) => {
 *   const [ref, setRef] = useForwardedRefWithState(forwardedRef);
 *   return <input ref={setRef} />
 * });
 * ```
 */
export function useForwardedRefWithState<T>(forwardedRef: ForwardedRef<T>) {
  const [ref, setRef] = useState<T | null>(null);
  const previousElementRef = useRef<T | null>(null);

  const setForwardedRef = useCallback(
    (element: T | null) => {
      // React 19 can invoke function refs with null during detach/reattach cycles.
      // Skip null for function refs to avoid commit-phase state update feedback loops.
      if (typeof forwardedRef === 'function') {
        if (element !== null) {
          forwardedRef(element);
        }
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }

      if (element === null || previousElementRef.current === element) {
        return;
      }

      previousElementRef.current = element;
      setRef(element);
    },
    [forwardedRef],
  );

  return [ref, setForwardedRef] as const;
}

/**
 * This hook may be used to intercept a forwarded ref, providing a local ref
 * that can be used in the component.
 * It uses a real ref, so the component won't be re-rendered when the ref changes.
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
  const ref = useRef<T | null>(null);

  const setForwardedRef = useCallback(
    (element: T | null) => {
      if (typeof forwardedRef === 'function') {
        if (element !== null) {
          forwardedRef(element);
        }
      } else if (forwardedRef) {
        forwardedRef.current = element;
      }

      if (element !== null) {
        ref.current = element;
      }
    },
    [forwardedRef],
  );

  return [ref, setForwardedRef] as const;
}
