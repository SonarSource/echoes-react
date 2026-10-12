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

import { act, renderHook } from '@testing-library/react';
import { useIsOverflow } from '../useIsOverflow';

const emptyMockRef = { current: null };
const mockRef = { current: document.createElement('div') };

const getScrollWidth = jest.fn().mockReturnValue(100);
const getOffsetWidth = jest.fn().mockReturnValue(100);

beforeAll(() => {
  // Mock the scrollWidth and offsetWidth properties
  Object.defineProperty(mockRef.current, 'scrollWidth', {
    get: getScrollWidth,
    configurable: true,
  });

  Object.defineProperty(mockRef.current, 'offsetWidth', {
    get: getOffsetWidth,
    configurable: true,
  });
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  // clearAllMocks() doesn't reset mockReturnValue(Once) chains set by individual tests
  getScrollWidth.mockReturnValue(100);
  getOffsetWidth.mockReturnValue(100);
});

it('should return undefined initially when ref.current is null', () => {
  const { result } = renderHook(() => useIsOverflow(emptyMockRef));

  expect(result.current[0]).toBeUndefined();
});

it('should return false when content is not overflowing', () => {
  const { result } = renderHook(() => useIsOverflow(mockRef));

  expect(result.current[0]).toBe(false);
});

it('should return true when content is overflowing', () => {
  // Mock scrollWidth to be greater than offsetWidth, to simulate overflow. Uses a persistent
  // mockReturnValue rather than mockReturnValueOnce: the resize observer's initial synchronous
  // notification causes the overflow check to re-run once more right after mount.
  getScrollWidth.mockReturnValue(200);

  const { result } = renderHook(() => useIsOverflow(mockRef));

  expect(result.current[0]).toBe(true);
});

it('should recalculate overflow when dependencies change', () => {
  let dependency = 'initial';
  const { result, rerender } = renderHook(() => useIsOverflow(mockRef, [dependency]));

  // Initially not overflowing
  expect(result.current[0]).toBe(false);

  // Change the element to be overflowing
  getScrollWidth.mockReturnValueOnce(200);
  rerender();

  // Still not overflowing because dependencies haven't changed
  expect(result.current[0]).toBe(false);

  // Change dependency to trigger recalculation
  dependency = 'changed';
  rerender();
  expect(result.current[0]).toBe(true);
});

it('should recalculate overflow when the observed element is resized, without any dep changing', () => {
  const { result } = renderHook(() => useIsOverflow(mockRef));

  expect(result.current[0]).toBe(false);

  // The element now overflows (e.g. its fluid grid column got narrower), with no dep changing
  getScrollWidth.mockReturnValueOnce(200);

  const [resizeCallback] = jest.mocked(global.ResizeObserver).mock.calls[0];
  act(() => {
    resizeCallback(
      [{ contentRect: { width: 50, height: 10 } }] as ResizeObserverEntry[],
      {} as ResizeObserver,
    );
  });

  expect(result.current[0]).toBe(true);
});
