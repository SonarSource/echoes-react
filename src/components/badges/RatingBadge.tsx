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
import { forwardRef, useMemo } from 'react';
import { isStringDefined } from '~common/helpers/types';
import { cssVar } from '~utils/design-tokens';

/**
 * Represents the available rating values for the RatingBadge component.
 */
export enum RatingBadgeRating {
  /**
   * The highest rating (A).
   */
  A = 'A',
  /**
   * The second-highest rating (B).
   */
  B = 'B',
  /**
   * The middle rating (C).
   */
  C = 'C',
  /**
   * The second-lowest rating (D).
   */
  D = 'D',
  /**
   * The lowest rating (E).
   */
  E = 'E',
  /**
   * No rating available (displayed as "—").
   */
  Null = '—',
}

/**
 * The available size options for the RatingBadge component.
 */
export enum RatingBadgeSize {
  /**
   * Extra small size (1rem).
   */
  ExtraSmall = 'xs', // 1rem
  /**
   * Small size (1.5rem) - default.
   */
  Small = 'sm', // 1.5rem (default)
  /**
   * Medium size (2rem).
   */
  Medium = 'md', // 2rem
  /**
   * Large size (3rem).
   */
  Large = 'lg', // 3rem
  /**
   * Extra large size (3.5rem).
   */
  ExtraLarge = 'xl', // 3.5rem
}

export interface RatingBadgeProps {
  /**
   * Custom ARIA label for accessibility (optional). If not provided, the rating value will be used.
   */
  ariaLabel?: string;
  className?: string;
  /**
   * The rating to display (optional). If not provided, displays "—" (null rating).
   */
  rating?: `${RatingBadgeRating}`;
  /**
   * The size of the badge (optional). The default is `small`.
   */
  size?: `${RatingBadgeSize}`;
  style?: React.CSSProperties;
}

/**
 * The A-E ratings badge component visually represents the quality of the code or the severity of issues,
 * providing a quick and intuitive assessment.
 */
export const RatingBadge = forwardRef<HTMLDivElement, RatingBadgeProps>(
  ({ ariaLabel, rating: ratingPropValue, size = RatingBadgeSize.Small, ...htmlProps }, ref) => {
    const rating = isStringDefined(ratingPropValue) ? ratingPropValue : RatingBadgeRating.Null;

    return (
      <RatingBadgeStyled
        aria-label={isStringDefined(ariaLabel) ? ariaLabel : rating}
        css={useMemo(
          () => ({
            ...RATING_BADGE_STYLES[rating],
            ...RATING_BADGE_SIZE[size],
          }),
          [size, rating],
        )}
        ref={ref}
        {...htmlProps}>
        {rating}
      </RatingBadgeStyled>
    );
  },
);

RatingBadge.displayName = 'RatingBadge';

const RatingBadgeStyled = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${cssVar('border-radius-full')};
  font-weight: ${cssVar('font-weight-semi-bold')};

  background-color: var(--rating-badge-background);
  color: var(--rating-badge-color);
  font-size: var(--rating-badge-font-size);
  height: var(--rating-badge-size);
  width: var(--rating-badge-size);
`;
RatingBadgeStyled.displayName = 'RatingBadgeStyled';

const RATING_BADGE_STYLES = {
  [RatingBadgeRating.Null]: {
    '--rating-badge-background': cssVar('color-surface-disabled'),
    '--rating-badge-color': cssVar('color-text-disabled'),
  },
  [RatingBadgeRating.A]: {
    '--rating-badge-background': cssVar('ratings-colors-background-rating-a-default'),
    '--rating-badge-color': cssVar('ratings-colors-text-rating-a-default'),
  },
  [RatingBadgeRating.B]: {
    '--rating-badge-background': cssVar('ratings-colors-background-rating-b-default'),
    '--rating-badge-color': cssVar('ratings-colors-text-rating-b-default'),
  },
  [RatingBadgeRating.C]: {
    '--rating-badge-background': cssVar('ratings-colors-background-rating-c-default'),
    '--rating-badge-color': cssVar('ratings-colors-text-rating-c-default'),
  },
  [RatingBadgeRating.D]: {
    '--rating-badge-background': cssVar('ratings-colors-background-rating-d-default'),
    '--rating-badge-color': cssVar('ratings-colors-text-rating-d-default'),
  },
  [RatingBadgeRating.E]: {
    '--rating-badge-background': cssVar('ratings-colors-background-rating-e-default'),
    '--rating-badge-color': cssVar('ratings-colors-text-rating-e-default'),
  },
};

export const RATING_BADGE_SIZE = {
  [RatingBadgeSize.ExtraSmall]: {
    '--rating-badge-font-size': cssVar('font-size-10'),
    '--rating-badge-size': cssVar('dimension-width-200'),
  },
  [RatingBadgeSize.Small]: {
    '--rating-badge-font-size': cssVar('font-size-10'),
    '--rating-badge-size': cssVar('dimension-width-300'),
  },
  [RatingBadgeSize.Medium]: {
    '--rating-badge-font-size': cssVar('font-size-20'),
    '--rating-badge-size': cssVar('dimension-width-400'),
  },
  [RatingBadgeSize.Large]: {
    '--rating-badge-font-size': cssVar('font-size-20'),
    '--rating-badge-size': cssVar('dimension-width-600'),
  },
  [RatingBadgeSize.ExtraLarge]: {
    '--rating-badge-font-size': cssVar('font-size-30'),
    '--rating-badge-size': cssVar('dimension-width-700'),
  },
};
