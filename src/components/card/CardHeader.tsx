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
import { Heading, Text } from '../typography';
import { useCardContext } from './CardRoot';
import { CARD_HEADER_STYLES, HEADER_LEVEL_MAP, TEXT_SIZE_MAP } from './CardStyles';

export interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  hasDivider?: boolean;
  rightContent?: React.ReactNode;
  className?: string;
}

export const CardHeader = React.forwardRef<HTMLDivElement, Readonly<CardHeaderProps>>(
  ({ className, description, hasDivider = false, rightContent, title }, ref) => {
    const size = useCardContext();

    return (
      <CardHeaderStyled
        className={className}
        css={useMemo(
          () => ({
            ...CARD_HEADER_STYLES[size],
          }),
          [size],
        )}
        hasDivider={hasDivider}
        ref={ref}>
        <CardHeaderContentStyled>
          <CardHeaderTextStyled>
            <Heading as={HEADER_LEVEL_MAP[size]}>{title}</Heading>
            {description && <Text size={TEXT_SIZE_MAP[size]}>{description}</Text>}
          </CardHeaderTextStyled>
          {rightContent && <RightContentStyled>{rightContent}</RightContentStyled>}
        </CardHeaderContentStyled>
      </CardHeaderStyled>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const CardHeaderStyled = styled.header<{ hasDivider: boolean }>`
  ${(props) =>
    props.hasDivider
      ? `border-bottom: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);`
      : ''}
`;

const CardHeaderContentStyled = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CardHeaderTextStyled = styled.div`
  flex: 1;
`;

const RightContentStyled = styled.div`
  display: flex;
`;
