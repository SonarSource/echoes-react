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

import styled from '@emotion/styled';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { cssVar } from '~utils/design-tokens';
import { useResizeObserver } from './useResizeObserver';

/**
 * Custom hook to manage the visibility of a bottom shadow on a scrollable container.
 * The shadow indicates that there is more content to scroll to.
 * @param scrollableContainerRef - Ref to the scrollable container element, its height and scroll event are monitored to recompute the shadow
 * @param resizableContentRef - Ref to the resizable content element inside the scrollable container, its height is monitored to recompute the shadow
 * @returns {boolean} Whether the bottom shadow should be shown
 */
export function useBottomShadowScroll(
  scrollableContainerRef: RefObject<HTMLElement>,
  resizableContentRef: RefObject<HTMLElement>,
) {
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  // Monitor the height of the scrollable container, and recompute the shadow if it changes
  const { height: scrollableContainerHeight } = useResizeObserver(scrollableContainerRef);
  // Monitor the height of the resizable content, and recompute the shadow if it changes, because it may move the scroll position
  const { height: resizableContentHeight } = useResizeObserver(resizableContentRef);

  const updateBottomShadowScroll = useCallback(() => {
    if (scrollableContainerRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = scrollableContainerRef.current;
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 8); // -8px for bottom padding
    }
  }, [scrollableContainerRef]);

  // Compute the bottom shadow visibility on first render and attach the scroll event listener
  useEffect(() => {
    const scrollableContainerRefNode = scrollableContainerRef.current;
    if (!scrollableContainerRefNode) {
      return undefined;
    }

    // Re-compute the bottom shadow visibility on scroll event
    scrollableContainerRefNode.addEventListener('scroll', updateBottomShadowScroll);

    // Initial computation
    updateBottomShadowScroll();

    return () => {
      scrollableContainerRefNode.removeEventListener('scroll', updateBottomShadowScroll);
    };
  }, [scrollableContainerRef, updateBottomShadowScroll]);

  // Re-compute the bottom shadow visibility on container and content resize
  useEffect(updateBottomShadowScroll, [
    resizableContentHeight,
    scrollableContainerHeight,
    updateBottomShadowScroll,
  ]);

  return [showBottomShadow] as const;
}

export const BottomShadowScroll = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;

  min-height: ${cssVar('dimension-height-400')};

  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  background: radial-gradient(
      farthest-side at 50% 100%,
      ${cssVar('bottom-scroll-colors-shadow-gradient')},
      ${cssVar('color-support-transparent')}
    )
    center bottom;
`;
BottomShadowScroll.displayName = 'BottomShadowScroll';
