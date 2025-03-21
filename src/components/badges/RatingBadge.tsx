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

export enum RatingBadgeScore {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  Null = '-',
}

export enum RatingBadgeSize {
  ExtraSmall = 'XS',
  Small = 'S',
  Medium = 'M',
  Large = 'L',
  ExtraLarge = 'XL',
}

export interface RatingBadgeProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'children' | 'style'> {
  className?: string;
  score?: RatingBadgeScore;
  size?: RatingBadgeSize;
}

export const RatingBadge = forwardRef<HTMLDivElement, RatingBadgeProps>(
  ({ score = RatingBadgeScore.Null, size = RatingBadgeSize.Medium, ...htmlProps }, ref) => (
    <RatingBadgeStyled {...{ ref, score, size }} {...htmlProps}>
      {score}
    </RatingBadgeStyled>
  ),
);

RatingBadge.displayName = 'RatingBadge';

const RatingBadgeStyled = styled.div<{ score: RatingBadgeScore; size: RatingBadgeSize }>`
  align-items: center;

  ${({ score }) => {
    if (score === RatingBadgeScore.Null) {
      return `
        background-color: var(--echoes-color-background-disabled);
        color: var(--echoes-color-text-disabled);
    `;
    }

    return `
      background-color: var(--echoes-ratings-colors-background-rating-${score.toLowerCase()}-default);
      color: var(--echoes-ratings-colors-text-rating-${score.toLowerCase()}-default);
    `;
  }};

  border-radius: var(--echoes-border-radius-full);
  display: inline-flex;
  font-weight: var(--echoes-font-weight-semi-bold);
  justify-content: center;

  ${({ size }) => {
    const dimensions = {
      [RatingBadgeSize.ExtraSmall]: { fontSize: 10, width: 200 },
      [RatingBadgeSize.Small]: { fontSize: 10, width: 300 },
      [RatingBadgeSize.Medium]: { fontSize: 20, width: 400 },
      [RatingBadgeSize.Large]: { fontSize: 20, width: 600 },
      [RatingBadgeSize.ExtraLarge]: { fontSize: 30, width: 700 },
    }[size];

    return `
      height: var(--echoes-dimension-width-${dimensions.width});
      font-size: var(--echoes-font-size-${dimensions.fontSize});
      width: var(--echoes-dimension-width-${dimensions.width});
    `;
  }}
`;
