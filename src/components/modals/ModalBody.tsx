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

import styled from '@emotion/styled';
import { PropsWithChildren, useMemo, useRef, useState } from 'react';
import { PortalContext } from '../../common/components/PortalContext';

import { BottomShadowScroll, useBottomShadowScroll } from '~common/helpers/useBottomShadowScroll';
import { cssVar } from '~utils/design-tokens';

interface Props {
  isLast?: boolean;
}

export function ModalBody(props: PropsWithChildren<Props>) {
  const { children, isLast = false } = props;
  const scrollableContainerRef = useRef<HTMLDivElement>(null);
  const resizableContentRef = useRef<HTMLDivElement>(null);
  const [showBottomShadow] = useBottomShadowScroll(scrollableContainerRef, resizableContentRef);

  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);

  const modalContextProviderValue = useMemo(
    () => ({ portalReference: portalRef ?? undefined }),
    [portalRef],
  );

  return (
    <>
      <PortalContext.Provider value={modalContextProviderValue}>
        <ModalBodyWrapper isLast={isLast}>
          <ModalBodyScrollContainer ref={scrollableContainerRef}>
            <ModalBodyInner ref={resizableContentRef}>{children}</ModalBodyInner>
          </ModalBodyScrollContainer>
          {showBottomShadow && <BottomShadowScroll />}
        </ModalBodyWrapper>
      </PortalContext.Provider>

      {/*
       * This node is the portal anchor for other overlay types that need to break out of the scrolling content
       * e.g. Select
       */}
      <div ref={setPortalRef} />
    </>
  );
}
ModalBody.displayName = 'ModalBody';

// This first layer wrapper allows to hold the bottom scroll shadow in place.
const ModalBodyWrapper = styled.div<Props>`
  position: relative;
  display: flex;

  overflow-y: hidden;

  ${({ isLast }) =>
    isLast && `border-radius: 0 0 ${cssVar('border-radius-400')} ${cssVar('border-radius-400')};`}
`;
ModalBodyWrapper.displayName = 'ModalBodyWrapper';

// This second layer wrapper holds the scrollbar, it's monitored by the useBottomShadowScroll hook to
// recompute the shadow visibility when it scrolls or resizes.
const ModalBodyScrollContainer = styled.div`
  position: relative;
  flex: 1;

  overflow-y: auto;
`;
ModalBodyScrollContainer.displayName = 'ModalBodyScrollContainer';

// This third layer wrapper contains inner content of the modal body, its height can eventually
// change if there is dynamic content, when its height changes it impact the scroll height of its
// parent but not its size. So we also monitor this element resizes to recompute the shadow visibility.
const ModalBodyInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-300')};
`;
ModalBodyInner.displayName = 'ModalBodyInner';
