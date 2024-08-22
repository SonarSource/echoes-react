/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { PortalContext } from '../../common/components/PortalContext';

interface Props {
  isLast?: boolean;
}

export function ModalBody(props: PropsWithChildren<Props>) {
  const { children, isLast = false } = props;
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const handleScroll = useCallback((event) => {
    const { scrollHeight, clientHeight, scrollTop } = event?.currentTarget ?? {};
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 16); // -16px for bottom padding
  }, []);

  const initShadows = useCallback(
    (node) => {
      if (node) {
        handleScroll({ currentTarget: node });
      }
    },
    [handleScroll],
  );

  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);
  const modalContextProviderValue = useMemo(
    () => ({ portalReference: portalRef ?? undefined }),
    [portalRef],
  );

  return (
    <>
      <PortalContext.Provider value={modalContextProviderValue}>
        <ModalBodyWrapper isLast={isLast}>
          <ModalBodyInner onScroll={handleScroll} ref={initShadows}>
            {children}
          </ModalBodyInner>
          {showBottomShadow && <ModalBodyBottomShadow />}
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

const ModalBodyWrapper = styled.div<Props>`
  position: relative;
  display: flex;

  overflow-y: hidden;

  ${({ isLast }) =>
    isLast && 'border-radius: 0 0 var(--echoes-border-radius-400) var(--echoes-border-radius-400);'}
`;
ModalBodyWrapper.displayName = 'ModalBodyWrapper';

const ModalBodyInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-200);
  padding: var(--echoes-dimension-space-300) var(--echoes-dimension-space-400);

  max-height: 100%;
  width: 100%;

  overflow-y: auto;
`;
ModalBodyInner.displayName = 'ModalBodyInner';

const ModalBodyBottomShadow = styled.div`
  position: absolute;
  bottom: 0;

  min-height: var(--echoes-dimension-height-800);
  width: 100%;

  border-bottom: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  background: radial-gradient(
      farthest-side at 50% 100%,
      var(--echoes-modal-colors-shadow-gradient),
      var(--echoes-color-support-transparent)
    )
    center bottom;
`;
ModalBodyBottomShadow.displayName = 'ModalBodyBottomShadow';
