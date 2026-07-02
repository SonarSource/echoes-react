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
import { type PropsWithChildren, useRef } from 'react';

import {
  BottomShadowScroll,
  TopShadowScroll,
  useShadowScroll,
} from '~common/helpers/useShadowScroll';

import { cssVar } from '~utils/design-tokens';

const SIDEBAR_NAVIGATION_BODY_SPACE_50 = cssVar('dimension-space-50');
const SIDEBAR_NAVIGATION_BODY_SPACE_100 = cssVar('dimension-space-100');

export function SidebarNavigationBody({ children }: Readonly<PropsWithChildren<{}>>) {
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const resizableContentRef = useRef<HTMLUListElement>(null);

  const { showBottomShadow, showTopShadow } = useShadowScroll(
    scrollableContainerRef,
    resizableContentRef,
  );

  return (
    <SidebarNavigationBodyScrollWrapper>
      {showTopShadow && <TopShadowScroll />}

      <SidebarNavigationBodyScrollContainer ref={scrollableContainerRef}>
        <SidebarNavigationBodyInner ref={resizableContentRef}>
          {children}
        </SidebarNavigationBodyInner>
      </SidebarNavigationBodyScrollContainer>

      {showBottomShadow && <BottomShadowScroll />}
    </SidebarNavigationBodyScrollWrapper>
  );
}

SidebarNavigationBody.displayName = 'SidebarNavigationBody';

// This first layer wrapper allows to hold the bottom scroll shadow in place
const SidebarNavigationBodyScrollWrapper = styled.div`
  flex: 1;

  position: relative;
  display: flex;
  overflow-y: hidden;

  padding: ${SIDEBAR_NAVIGATION_BODY_SPACE_50} 0;
`;

SidebarNavigationBodyScrollWrapper.displayName = 'SidebarNavigationBodyScrollWrapper';

// This second layer wrapper holds the scrollbar, it's monitored by the useBottomShadowScroll hook to
// recompute the shadow visibility when it scrolls or resize.
const SidebarNavigationBodyScrollContainer = styled.div`
  flex: 1;

  overflow-x: hidden;
  overflow-y: auto;
`;

SidebarNavigationBodyScrollContainer.displayName = 'SidebarNavigationBodyScrollContainer';

// This third layer wrapper contains the list of navigation items, its height can change when there
// are accordion items in its content, when its height changes it impact the scroll height of its
// parent but not its size. So we also monitor this element resizes to recompute the shadow visibility.
const SidebarNavigationBodyInner = styled.ul`
  all: unset;

  display: flex;
  flex-direction: column;
  gap: ${SIDEBAR_NAVIGATION_BODY_SPACE_50};

  padding: ${SIDEBAR_NAVIGATION_BODY_SPACE_50} ${SIDEBAR_NAVIGATION_BODY_SPACE_100};
`;

SidebarNavigationBodyInner.displayName = 'SidebarNavigationBodyInner';
