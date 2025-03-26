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
import React from 'react';
import { Heading, Text, TextSize } from '../typography';
import { CardSize } from './CardRoot';

export interface CardHeaderProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  hasDivider?: boolean;
  rightContent?: React.ReactNode;
  className?: string;
  size?: CardSize;
}

const paddingMap = {
  [CardSize.Small]: {
    vertical: 'var(--echoes-dimension-space-100)',
    horizontal: 'var(--echoes-dimension-space-150)',
  },
  [CardSize.Medium]: {
    vertical: 'var(--echoes-dimension-space-150)',
    horizontal: 'var(--echoes-dimension-space-200)',
  },
  [CardSize.Large]: {
    vertical: 'var(--echoes-dimension-space-200)',
    horizontal: 'var(--echoes-dimension-space-300)',
  },
};

const textSizeMap: Record<CardSize, TextSize> = {
  [CardSize.Small]: TextSize.Small,
  [CardSize.Medium]: TextSize.Default,
  [CardSize.Large]: TextSize.Large,
};

export const CardHeader = React.forwardRef<HTMLDivElement, Readonly<CardHeaderProps>>(
  (
    { className, description, hasDivider = false, rightContent, size = CardSize.Medium, title },
    ref,
  ) => {
    const headerLevel: Record<CardSize, 'h2' | 'h3' | 'h4'> = {
      [CardSize.Small]: 'h4',
      [CardSize.Medium]: 'h3',
      [CardSize.Large]: 'h2',
    };
    return (
      <StyledHeader className={className} hasDivider={hasDivider} ref={ref} size={size}>
        <StyledContentContainer>
          <StyledTextContainer>
            <Heading as={headerLevel[size]}>{title}</Heading>
            {description && <StyledDescription size={size}>{description}</StyledDescription>}
          </StyledTextContainer>
          {rightContent && <StyledRightContent>{rightContent}</StyledRightContent>}
        </StyledContentContainer>
      </StyledHeader>
    );
  },
);

CardHeader.displayName = 'CardHeader';

const StyledHeader = styled.header<{ size: CardSize; hasDivider: boolean }>`
  ${(props) =>
    props.hasDivider ? `border-bottom: 1px solid var(--echoes-color-border-weak);` : ''}

  padding: ${(props) => `${paddingMap[props.size].vertical} ${paddingMap[props.size].horizontal}`};
`;

const StyledContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StyledTextContainer = styled.div`
  flex: 1;
`;

const StyledDescription = styled(({ size, ...props }: { size: CardSize; [key: string]: any }) => (
  <Text size={textSizeMap[size]} {...props} />
))<{ size: CardSize }>`
  color: var(--echoes-color-text-subdued);
`;

const StyledRightContent = styled.div`
  display: flex;
`;
