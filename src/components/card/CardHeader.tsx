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
import React, { useMemo } from 'react';
import { Heading, Text, TextSize } from '../typography';
import { useCardContext } from './CardRoot';
import { CARD_HEADER_SIZE_STYLES, CardHeaderStyled } from './CardStyles';
import { Divider } from '../divider';
import { CardSize } from './CardTypes';

export interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  hasDivider?: boolean;
  rightContent?: React.ReactNode;
  className?: string;
}

const CARD_SIZE_CONFIG = {
  [CardSize.Small]: {
    textSize: TextSize.Small,
    headingLevel: 'h4' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Small],
  },
  [CardSize.Medium]: {
    textSize: TextSize.Default,
    headingLevel: 'h3' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Medium],
  },
  [CardSize.Large]: {
    textSize: TextSize.Large,
    headingLevel: 'h2' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Large],
  },
};

export const CardHeader = React.forwardRef<HTMLDivElement, Readonly<CardHeaderProps>>(
  ({ className, description, hasDivider = false, rightContent, title }, ref) => {
    const size = useCardContext();

    const sizeConfig = CARD_SIZE_CONFIG[size];

    return (
      <>
        <CardHeaderStyled
          className={className}
          css={useMemo(
            () => ({
              ...sizeConfig.styles,
            }),
            [sizeConfig.styles],
          )}
          ref={ref}>
          <CardHeaderContentStyled>
            <CardHeaderTextStyled>
              <Heading as={sizeConfig.headingLevel}>{title}</Heading>
              {rightContent && <RightContentStyled>{rightContent}</RightContentStyled>}
            </CardHeaderTextStyled>
            {description && <Text size={sizeConfig.textSize}>{description}</Text>}
          </CardHeaderContentStyled>
        </CardHeaderStyled>
        {hasDivider && <Divider />}
      </>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const CardHeaderContentStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardHeaderTextStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightContentStyled = styled.div`
  display: flex;
`;
