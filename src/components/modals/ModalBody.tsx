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
import { PropsWithChildren, useCallback, useState } from 'react';

export function ModalBody({ children }: PropsWithChildren<{}>) {
  const [showBottomShadow, setShowBottomShadow] = useState(false);

  const handleScroll = useCallback((event) => {
    const { scrollHeight, clientHeight, scrollTop } = event.currentTarget;
    setShowBottomShadow(scrollTop + clientHeight < scrollHeight - 16); // -16 for bottom padding
  }, []);

  const initShadows = useCallback(
    (node) => {
      if (node) {
        handleScroll({ currentTarget: node });
      }
    },
    [handleScroll],
  );

  return (
    <ModalBodyWrapper>
      <ModalBodyInner onScroll={handleScroll} ref={initShadows}>
        {children}
      </ModalBodyInner>
      {showBottomShadow && <ModalBodyBottomShadow />}
    </ModalBodyWrapper>
  );
}
ModalBody.displayName = 'ModalBody';

const ModalBodyWrapper = styled.div`
  position: relative;
  display: flex;

  overflow: hidden;
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