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
import { forwardRef } from 'react';
import { Heading, HelperText, Text } from '../typography';
import { SpotlightModalProps } from './SpotlightTypes';

export const SpotlightModal = forwardRef<HTMLDivElement, Readonly<SpotlightModalProps>>(
  ({ actions, bodyText, headerText, helperText, image, ...otherProps }, ref) => (
    <SpotlightModalStyled
      // Stop click propagation, to not accidentally close other elements below this modal
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      {...otherProps}>
      {image && <ImageContainer>{image}</ImageContainer>}

      <ModalContainer>
        <ModalContentContainer>
          {helperText && <HelperText>{helperText}</HelperText>}

          <ModalContentBodyContainer>
            <Heading as="h3" hasMarginBottom>
              {headerText}
            </Heading>

            <Text isSubdued>{bodyText}</Text>
          </ModalContentBodyContainer>
        </ModalContentContainer>

        <ModalFooterContainer>{actions}</ModalFooterContainer>
      </ModalContainer>
    </SpotlightModalStyled>
  ),
);

SpotlightModal.displayName = 'SpotlightModal';

const ImageContainer = styled.div`
  align-items: center;
  align-self: stretch;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  justify-content: center;
  overflow: hidden; /* to force the border radius properties onto the child image */
`;

ImageContainer.displayName = 'ImageContainer';

const ModalContainer = styled.div`
  align-items: flex-start;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-250);
  padding: var(--echoes-dimension-space-250);
`;

ModalContainer.displayName = 'ModalContainer';

const ModalContentBodyContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  gap: var(--echoes-dimension-space-75);
  justify-content: center;
`;

ModalContentBodyContainer.displayName = 'ModalContentBodyContainer';

const ModalContentContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-75);
`;

ModalContentContainer.displayName = 'ModalContentContainer';

const ModalFooterContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  justify-content: flex-end;
  width: 100%;
`;

ModalFooterContainer.displayName = 'ModalFooterContainer';

const SpotlightModalStyled = styled.div`
  background-color: var(--echoes-color-surface-default);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-large);
  display: flex;
  flex-direction: column;
  position: relative;
  width: var(--echoes-sizes-overlays-width-small);
`;

SpotlightModalStyled.displayName = 'SpotlightModalStyled';
