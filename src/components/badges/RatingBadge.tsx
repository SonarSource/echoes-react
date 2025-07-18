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

import { cssVar } from '~utils/design-tokens';

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
        data-rating={rating}
        data-size={size}
        ref={ref}
        {...htmlProps}>
        {rating}
      </RatingBadgeStyled>
    );
  },
);

RatingBadge.displayName = 'RatingBadge';

export const RATING_BADGE_SIZE: Record<`${RatingBadgeSize}`, string> = {
  [RatingBadgeSize.ExtraSmall]: cssVar('dimension-width-200'),
  [RatingBadgeSize.Small]: cssVar('dimension-width-300'),
  [RatingBadgeSize.Medium]: cssVar('dimension-width-400'),
  [RatingBadgeSize.Large]: cssVar('dimension-width-600'),
  [RatingBadgeSize.ExtraLarge]: cssVar('dimension-width-700'),
};

const RatingBadgeStyled = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${cssVar('border-radius-full')};
  font-weight: ${cssVar('font-weight-semi-bold')};

  &[data-rating='${RatingBadgeRating.Null}'] {
    background-color: ${cssVar('color-surface-disabled')};
    color: ${cssVar('color-text-disabled')};
  }
  &[data-rating='${RatingBadgeRating.A}'] {
    background-color: ${cssVar('ratings-colors-background-rating-a-default')};
    color: ${cssVar('ratings-colors-text-rating-a-default')};
  }
  &[data-rating='${RatingBadgeRating.B}'] {
    background-color: ${cssVar('ratings-colors-background-rating-b-default')};
    color: ${cssVar('ratings-colors-text-rating-b-default')};
  }
  &[data-rating='${RatingBadgeRating.C}'] {
    background-color: ${cssVar('ratings-colors-background-rating-c-default')};
    color: ${cssVar('ratings-colors-text-rating-c-default')};
  }
  &[data-rating='${RatingBadgeRating.D}'] {
    background-color: ${cssVar('ratings-colors-background-rating-d-default')};
    color: ${cssVar('ratings-colors-text-rating-d-default')};
  }
  &[data-rating='${RatingBadgeRating.E}'] {
    background-color: ${cssVar('ratings-colors-background-rating-e-default')};
    color: ${cssVar('ratings-colors-text-rating-e-default')};
  }

  &[data-size='${RatingBadgeSize.ExtraSmall}'] {
    font-size: ${cssVar('font-size-10')};
    height: ${RATING_BADGE_SIZE[RatingBadgeSize.ExtraSmall]};
    width: ${RATING_BADGE_SIZE[RatingBadgeSize.ExtraSmall]};
  }
  &[data-size='${RatingBadgeSize.Small}'] {
    font-size: ${cssVar('font-size-10')};
    height: ${RATING_BADGE_SIZE[RatingBadgeSize.Small]};
    width: ${RATING_BADGE_SIZE[RatingBadgeSize.Small]};
  }
  &[data-size='${RatingBadgeSize.Medium}'] {
    font-size: ${cssVar('font-size-20')};
    height: ${RATING_BADGE_SIZE[RatingBadgeSize.Medium]};
    width: ${RATING_BADGE_SIZE[RatingBadgeSize.Medium]};
  }
  &[data-size='${RatingBadgeSize.Large}'] {
    font-size: ${cssVar('font-size-20')};
    height: ${RATING_BADGE_SIZE[RatingBadgeSize.Large]};
    width: ${RATING_BADGE_SIZE[RatingBadgeSize.Large]};
  }
  &[data-size='${RatingBadgeSize.ExtraLarge}'] {
    font-size: ${cssVar('font-size-30')};
    height: ${RATING_BADGE_SIZE[RatingBadgeSize.ExtraLarge]};
    width: ${RATING_BADGE_SIZE[RatingBadgeSize.ExtraLarge]};
  }
`;
