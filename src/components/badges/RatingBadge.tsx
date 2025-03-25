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
import { isStringDefined } from '~common/helpers/types';

export enum RatingBadgeRating {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  Null = '—',
}

export enum RatingBadgeSize {
  ExtraSmall = 'xs', // 16px
  Small = 'sm', // 24px (default)
  Medium = 'md', // 32px
  Large = 'lg', // 48px
  ExtraLarge = 'xl', // 56px
}

export interface RatingBadgeProps {
  ariaLabel?: string;
  className?: string;
  rating?: `${RatingBadgeRating}`;
  size?: `${RatingBadgeSize}`;
  style?: React.CSSProperties;
}

export const RatingBadge = forwardRef<HTMLDivElement, RatingBadgeProps>(
  ({ ariaLabel, rating: ratingPropValue, size = RatingBadgeSize.Small, ...htmlProps }, ref) => {
    const rating = isStringDefined(ratingPropValue) ? ratingPropValue : RatingBadgeRating.Null;

    return (
      <RatingBadgeStyled
        aria-label={isStringDefined(ariaLabel) ? ariaLabel : rating}
        {...{ rating, ref, size }}
        {...htmlProps}>
        {rating}
      </RatingBadgeStyled>
    );
  },
);

RatingBadge.displayName = 'RatingBadge';

export const RatingBadgeDimensions: Record<RatingBadgeSize, { fontSize: number; width: number }> = {
  [RatingBadgeSize.ExtraSmall]: { fontSize: 10, width: 200 },
  [RatingBadgeSize.Small]: { fontSize: 10, width: 300 },
  [RatingBadgeSize.Medium]: { fontSize: 20, width: 400 },
  [RatingBadgeSize.Large]: { fontSize: 20, width: 600 },
  [RatingBadgeSize.ExtraLarge]: { fontSize: 30, width: 700 },
};

const RatingBadgeStyled = styled.div<{
  rating: `${RatingBadgeRating}`;
  size: `${RatingBadgeSize}`;
}>`
  align-items: center;

  ${({ rating = RatingBadgeRating.Null }) => {
    if (rating === RatingBadgeRating.Null) {
      return `
        background-color: var(--echoes-color-background-disabled);
        color: var(--echoes-color-text-disabled);
    `;
    }

    return `
      background-color: var(--echoes-ratings-colors-background-rating-${rating.toLowerCase()}-default);
      color: var(--echoes-ratings-colors-text-rating-${rating.toLowerCase()}-default);
    `;
  }};

  border-radius: var(--echoes-border-radius-full);
  display: inline-flex;
  font-weight: var(--echoes-font-weight-semi-bold);
  justify-content: center;

  ${({ size = RatingBadgeSize.Small }) => {
    const dimensions = RatingBadgeDimensions[size];

    return `
      height: var(--echoes-dimension-width-${dimensions.width});
      font-size: var(--echoes-font-size-${dimensions.fontSize});
      width: var(--echoes-dimension-width-${dimensions.width});
    `;
  }}
`;
