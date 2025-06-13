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

import { act, renderHook } from '@testing-library/react';
import { useFollowScroll } from '../useFollowScroll';

const THROTTLE_SHORT_DELAY = 16;
const SCROLL_LEFT_VALUE = 100;
const SCROLL_TOP_VALUE = 200;
const SCROLL_INCREMENT = 50;

const mockScrollLeft = jest.spyOn(document.documentElement, 'scrollLeft', 'get');
const mockScrollTop = jest.spyOn(document.documentElement, 'scrollTop', 'get');

beforeEach(() => {
  jest.useFakeTimers();

  // Mock addEventListener and removeEventListener
  jest.spyOn(document, 'addEventListener');
  jest.spyOn(document, 'removeEventListener');

  // Mock document.documentElement scroll properties
  mockScrollLeft.mockReturnValue(0);
  mockScrollTop.mockReturnValue(0);
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.clearAllMocks();
});

it('should return initial scroll position of 0,0', () => {
  const { result } = renderHook(() => useFollowScroll());

  expect(result.current.left).toBe(0);
  expect(result.current.top).toBe(0);
});

it('should add scroll event listener when enabled (default)', () => {
  renderHook(() => useFollowScroll());

  expect(document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
});

it('should not add scroll event listener when disabled', () => {
  renderHook(() => useFollowScroll(false));

  expect(document.addEventListener).not.toHaveBeenCalled();
});

it('should remove scroll event listener on unmount', () => {
  const { unmount } = renderHook(() => useFollowScroll());

  unmount();

  expect(document.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
});

it('should update scroll position when scroll event is triggered', () => {
  const { result } = renderHook(() => useFollowScroll());

  // Mock scroll position change
  mockScrollLeft.mockReturnValue(SCROLL_LEFT_VALUE);
  mockScrollTop.mockReturnValue(SCROLL_TOP_VALUE);
  act(() => {
    // Trigger scroll event
    document.dispatchEvent(new Event('scroll'));

    // Advance timers to trigger throttled callback
    jest.advanceTimersByTime(THROTTLE_SHORT_DELAY);
  });

  expect(result.current.left).toBe(SCROLL_LEFT_VALUE);
  expect(result.current.top).toBe(SCROLL_TOP_VALUE);
});

it('should throttle scroll events', () => {
  const { result } = renderHook(() => useFollowScroll());

  // Mock scroll position change
  mockScrollLeft.mockReturnValue(SCROLL_LEFT_VALUE);
  mockScrollTop.mockReturnValue(SCROLL_TOP_VALUE);
  act(() => {
    // Trigger first scroll event
    document.dispatchEvent(new Event('scroll'));
  });

  // Should update immediately on first call
  expect(result.current.left).toBe(SCROLL_LEFT_VALUE);
  expect(result.current.top).toBe(SCROLL_TOP_VALUE);

  // Change scroll position again
  mockScrollLeft.mockReturnValue(SCROLL_LEFT_VALUE + SCROLL_INCREMENT);
  mockScrollTop.mockReturnValue(SCROLL_TOP_VALUE + SCROLL_INCREMENT);
  act(() => {
    // Trigger second scroll event immediately
    document.dispatchEvent(new Event('scroll'));
  });

  // Should not update during throttle period
  expect(result.current.left).toBe(SCROLL_LEFT_VALUE);
  expect(result.current.top).toBe(SCROLL_TOP_VALUE);

  act(() => {
    // Advance time past throttle delay
    jest.advanceTimersByTime(THROTTLE_SHORT_DELAY);

    // Trigger another scroll event
    document.dispatchEvent(new Event('scroll'));
  });

  // Should update after throttle period
  expect(result.current.left).toBe(SCROLL_LEFT_VALUE + SCROLL_INCREMENT);
  expect(result.current.top).toBe(SCROLL_TOP_VALUE + SCROLL_INCREMENT);
});

it('should re-add event listener when enabled changes from false to true', () => {
  const { rerender } = renderHook(({ enabled }) => useFollowScroll(enabled), {
    initialProps: { enabled: false },
  });

  expect(document.addEventListener).not.toHaveBeenCalled();

  rerender({ enabled: true });

  expect(document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
});

it('should remove event listener when enabled changes from true to false', () => {
  const { rerender } = renderHook(({ enabled }) => useFollowScroll(enabled), {
    initialProps: { enabled: true },
  });

  expect(document.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

  rerender({ enabled: false });

  expect(document.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
});
