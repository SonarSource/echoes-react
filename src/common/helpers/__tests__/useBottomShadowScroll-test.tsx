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

import { act, renderHook, screen } from '@testing-library/react';
import { render } from '../test-utils';
import { BottomShadowScroll, useBottomShadowScroll } from '../useBottomShadowScroll';
import { useResizeObserver } from '../useResizeObserver';

// Mock useResizeObserver since we want to control it in tests
jest.mock('../useResizeObserver', () => ({
  useResizeObserver: jest.fn(),
}));

const SCROLL_HEIGHT = 1000;
const CLIENT_HEIGHT = 400;
const SCROLL_TOP_AT_TOP = 0;
const SCROLL_TOP_NEAR_BOTTOM = SCROLL_HEIGHT - CLIENT_HEIGHT - 20; // A bit before the threshold
const SCROLL_TOP_AT_BOTTOM = SCROLL_HEIGHT - CLIENT_HEIGHT - 4; // Past threshold (should hide shadow)
const CONTAINER_HEIGHT = 500;

// Create a mock HTMLElement
const createMockElement = (
  scrollHeight = SCROLL_HEIGHT,
  clientHeight = CLIENT_HEIGHT,
  scrollTop = SCROLL_TOP_AT_TOP,
) => {
  return {
    scrollHeight,
    clientHeight,
    scrollTop,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  } as unknown as HTMLElement;
};

beforeEach(() => {
  jest.clearAllMocks();

  // Reset the mock to return default dimensions
  jest.mocked(useResizeObserver).mockReturnValue({
    width: CONTAINER_HEIGHT,
    height: CONTAINER_HEIGHT,
  });
});

describe('useBottomShadowScroll', () => {
  it('should return initial state of false when not scrollable', () => {
    const scrollableRef = {
      current: createMockElement(CLIENT_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_AT_TOP),
    };
    const contentRef = { current: createMockElement() };

    const { result } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(result.current[0]).toBe(false);
  });

  it('should return true when content is scrollable and not at bottom', () => {
    const scrollableRef = {
      current: createMockElement(SCROLL_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_AT_TOP),
    };
    const contentRef = { current: createMockElement() };

    const { result } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(result.current[0]).toBe(true);
  });

  it('should hide shadow when scrolled to bottom (within 8px threshold)', () => {
    const scrollableRef = {
      current: createMockElement(SCROLL_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_AT_BOTTOM),
    };
    const contentRef = { current: createMockElement() };

    const { result } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(result.current[0]).toBe(false);
  });

  it('should add scroll event listener to scrollable container', () => {
    const mockElement = createMockElement();
    const scrollableRef = { current: mockElement };
    const contentRef = { current: createMockElement() };

    const { unmount } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(mockElement.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();

    expect(mockElement.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('should update showBottomShadow when scroll event is triggered', () => {
    const mockElement = createMockElement(SCROLL_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_NEAR_BOTTOM);
    const scrollableRef = { current: mockElement };
    const contentRef = { current: createMockElement() };

    const { result } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(result.current[0]).toBe(true);

    // Simulate scrolling to bottom
    mockElement.scrollTop = SCROLL_TOP_AT_BOTTOM;

    act(() => {
      // Get the scroll handler that was added and call it
      const scrollHandler = jest.mocked(mockElement.addEventListener).mock
        .calls[0][1] as EventListener;
      scrollHandler(new Event('scroll'));
    });

    expect(result.current[0]).toBe(false);
  });

  it('should update shadow when the containers height changes', () => {
    const scrollableRef = {
      current: createMockElement(CLIENT_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_AT_TOP),
    };
    const contentRef = { current: createMockElement() };

    const { result, rerender } = renderHook(() => useBottomShadowScroll(scrollableRef, contentRef));

    expect(result.current[0]).toBe(false);

    // Update the scrollableRef to simulate a height change
    scrollableRef.current = createMockElement(SCROLL_HEIGHT, CLIENT_HEIGHT, SCROLL_TOP_AT_TOP);

    // Just a rerender now should trigger a recalculation
    rerender();
    expect(result.current[0]).toBe(false);

    // Mock useResizeObserver to return different container height to trigger the recalculation
    jest.mocked(useResizeObserver).mockReturnValue({
      width: CONTAINER_HEIGHT,
      height: CONTAINER_HEIGHT + 100,
    });
    rerender();

    // Should trigger recalculation
    expect(result.current[0]).toBe(true);
  });
});

describe('BottomShadowScroll component', () => {
  it('should render with correct styling', () => {
    render(<BottomShadowScroll data-testid="bottom-shadow" />);

    expect(screen.getByTestId('bottom-shadow')).toMatchSnapshot();
  });
});
