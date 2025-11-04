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
import React, { useMemo } from 'react';
import { Divider } from '../divider';
import { Heading } from '../typography';
import { useCardSize } from './CardRoot';
import { CardSize } from './CardSize';
import { CARD_HEADER_SIZE_STYLES, CardHeaderStyled } from './CardStyles';

export interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  hasDivider?: boolean;
  rightContent?: React.ReactNode;
  className?: string;
}

const CARD_SIZE_CONFIG = {
  [CardSize.Small]: {
    headingLevel: 'h4' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Small],
  },
  [CardSize.Medium]: {
    headingLevel: 'h3' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Medium],
  },
  [CardSize.Large]: {
    headingLevel: 'h2' as const,
    styles: CARD_HEADER_SIZE_STYLES[CardSize.Large],
  },
};

export const CardHeader = React.forwardRef<HTMLDivElement, Readonly<CardHeaderProps>>(
  ({ className, description, hasDivider = false, rightContent, title }, ref) => {
    const size = useCardSize();

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

            {description && <DescriptionStyled>{description}</DescriptionStyled>}
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
  width: 100%;
`;
CardHeaderContentStyled.displayName = 'CardHeaderContentStyled';

const CardHeaderTextStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
CardHeaderTextStyled.displayName = 'CardHeaderTextStyled';

const RightContentStyled = styled.div`
  display: flex;
`;
RightContentStyled.displayName = 'RightContentStyled';

const DescriptionStyled = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;
DescriptionStyled.displayName = 'DescriptionStyled';
