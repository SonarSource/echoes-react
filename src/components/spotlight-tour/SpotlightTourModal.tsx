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
import { forwardRef, ReactNode } from 'react';
import { TextNode } from '~types/utils';
import { Heading, HelperText, Text } from '../typography';

export interface SpotlightTourModalProps {
  /**
   * The actions at the bottom, grouped in a ButtonGroup
   */
  actions: React.ReactNode;

  /**
   * The text to display in the card body
   */
  cardBodyText: ReactNode;

  /**
   * The text to display in the card header
   */
  cardHeaderText: ReactNode;

  /**
   * CSS class name(s) to apply to the modal (optional)
   */
  className?: string;

  /**
   * The helper text to display at the top of the card (optional)
   */
  helperText?: TextNode;

  /**
   * The image to display at the top of the card (optional)
   */
  image?: React.ReactNode;
}

export const SpotlightTourModal = forwardRef<HTMLDivElement, Readonly<SpotlightTourModalProps>>(
  ({ actions, cardBodyText, cardHeaderText, helperText, image, ...otherProps }, ref) => (
    <SpotlightTourModalStyled
      // Stop click propagation, to not accidentally close other elements below this modal
      onClick={(e) => e.stopPropagation()}
      ref={ref}
      {...otherProps}>
      {image && <ImageContainer>{image}</ImageContainer>}

      <CardContainer>
        <CardContentContainer>
          {helperText && <HelperText>{helperText}</HelperText>}

          <CardContentBodyContainer>
            <Heading as="h3" hasMarginBottom>
              {cardHeaderText}
            </Heading>

            <Text isSubdued>{cardBodyText}</Text>
          </CardContentBodyContainer>
        </CardContentContainer>

        <CardFooterContainer>{actions}</CardFooterContainer>
      </CardContainer>
    </SpotlightTourModalStyled>
  ),
);

SpotlightTourModal.displayName = 'SpotlightTourModal';

const CardContainer = styled.div`
  align-items: flex-start;
  border-radius: inherit;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-250);
  padding: var(--echoes-dimension-space-250);
`;

CardContainer.displayName = 'CardContainer';

const CardContentBodyContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  gap: var(--echoes-dimension-space-75);
  justify-content: center;
`;

CardContentBodyContainer.displayName = 'CardContentBodyContainer';

const CardContentContainer = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-75);
`;

CardContentContainer.displayName = 'CardContentContainer';

const CardFooterContainer = styled.div`
  align-items: center;
  display: flex;
  flex: 1 0 0;
  justify-content: flex-end;
  width: 100%;
`;

CardFooterContainer.displayName = 'CardFooterContainer';

const ImageContainer = styled.div`
  align-items: center;
  align-self: stretch;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  display: flex;
  justify-content: center;
`;

ImageContainer.displayName = 'ImageContainer';

const SpotlightTourModalStyled = styled.div`
  background-color: var(--echoes-color-background-default);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-large);
  display: flex;
  flex-direction: column;
  position: relative;
  width: var(--echoes-sizes-overlays-width-small);
  z-index: 1;
`;

SpotlightTourModalStyled.displayName = 'SpotlightTourModalStyled';
