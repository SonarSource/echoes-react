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
import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PortalContext } from '../../common/components/PortalContext';

import { cssVar } from '~utils/design-tokens';

interface Props {
  isLast?: boolean;
}

export function ModalBody(props: PropsWithChildren<Props>) {
  const { children, isLast = false } = props;
  const [showBottomShadow, setShowBottomShadow] = useState(false);
  const shadowRef = useRef<HTMLDivElement | null>(null);

  const updateShadow = useCallback(() => {
    if (shadowRef.current) {
      const { scrollHeight, clientHeight, scrollTop } = shadowRef.current;
      setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 16); // -16px for bottom padding
    }
  }, []);

  const initShadows = useCallback(
    (node: HTMLDivElement) => {
      if (node) {
        shadowRef.current = node;
        updateShadow();
      }
    },
    [updateShadow],
  );

  useEffect(() => {
    window.addEventListener('resize', updateShadow);

    return () => window.removeEventListener('resize', updateShadow);
  }, [updateShadow]);

  const [portalRef, setPortalRef] = useState<HTMLDivElement | null>(null);

  const modalContextProviderValue = useMemo(
    () => ({ portalReference: portalRef ?? undefined }),
    [portalRef],
  );

  return (
    <>
      <PortalContext.Provider value={modalContextProviderValue}>
        <ModalBodyWrapper isLast={isLast}>
          <ModalBodyInner onScroll={updateShadow} ref={initShadows}>
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
    isLast && `border-radius: 0 0 ${cssVar('border-radius-400')} ${cssVar('border-radius-400')};`}
`;
ModalBodyWrapper.displayName = 'ModalBodyWrapper';

const ModalBodyInner = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-200')};
  padding: ${cssVar('dimension-space-150')} ${cssVar('dimension-space-300')};

  max-height: 100%;
  width: 100%;

  overflow-y: auto;
`;
ModalBodyInner.displayName = 'ModalBodyInner';

const ModalBodyBottomShadow = styled.div`
  position: absolute;
  bottom: 0;

  min-height: ${cssVar('dimension-height-800')};
  width: 100%;

  border-bottom: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  background: radial-gradient(
      farthest-side at 50% 100%,
      ${cssVar('modal-colors-shadow-gradient')},
      ${cssVar('color-support-transparent')}
    )
    center bottom;
`;
ModalBodyBottomShadow.displayName = 'ModalBodyBottomShadow';
