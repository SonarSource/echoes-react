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
import { ButtonVariety } from '../buttons';
import { Button, ButtonAsButtonProps } from '../buttons/Button';
import {
  RATING_BADGE_SIZE,
  RatingBadge,
  RatingBadgeProps,
  RatingBadgeRating,
  RatingBadgeSize,
} from './RatingBadge';

/**
 * Props for the RatingBadgeButton component.
 * Combines button click functionality with all RatingBadge properties.
 */
export type RatingBadgeButtonProps = Pick<ButtonAsButtonProps, 'onClick'> & RatingBadgeProps;

/**
 * An interactive button version of the RatingBadge component.
 */
export const RatingBadgeButton = forwardRef<HTMLButtonElement, RatingBadgeButtonProps>(
  (
    { className, rating: ratingPropValue, size = RatingBadgeSize.Medium, style, ...buttonProps },
    ref,
  ) => {
    const rating = isStringDefined(ratingPropValue) ? ratingPropValue : RatingBadgeRating.Null;

    return (
      <RatingBadgeButtonStyled
        className={className}
        css={useMemo(
          () => ({
            ...RATING_BADGE_SIZE[size],
            ...RATING_BADGE_BORDER_STYLES[rating],
          }),
          [rating, size],
        )}
        data-rating={rating}
        ref={ref}
        style={style}
        {...buttonProps}>
        <RatingBadge {...{ rating, size }} />
      </RatingBadgeButtonStyled>
    );
  },
);

RatingBadgeButton.displayName = 'RatingBadgeButton';

const RatingBadgeButtonInner = forwardRef<
  HTMLButtonElement,
  Omit<ButtonAsButtonProps, 'size' | 'variety'> & Pick<RatingBadgeProps, 'rating' | 'size'>
>(({ rating, size, ...buttonProps }, ref) => (
  <Button {...buttonProps} ref={ref} variety={ButtonVariety.DefaultGhost} />
));

RatingBadgeButtonInner.displayName = 'RatingBadgeButtonInner';

const RatingBadgeButtonStyled = styled(RatingBadgeButtonInner)`
  border-radius: ${cssVar('border-radius-full')};
  padding: 0;

  & div:hover {
    box-sizing: border-box;
    border: ${cssVar('border-width-default')} solid var(--rating-badge-border-color);
  }

  &,
  span {
    height: var(--rating-badge-size);
    min-height: var(--rating-badge-size);
    min-width: var(--rating-badge-size);
    width: var(--rating-badge-size);
  }
`;
RatingBadgeButtonStyled.displayName = 'RatingBadgeButtonStyled';

const RATING_BADGE_BORDER_STYLES = {
  [RatingBadgeRating.Null]: {
    '--rating-badge-border-color': cssVar('color-border-disabled'),
  },
  [RatingBadgeRating.A]: {
    '--rating-badge-border-color': cssVar('ratings-colors-border-rating-a-hover'),
  },
  [RatingBadgeRating.B]: {
    '--rating-badge-border-color': cssVar('ratings-colors-border-rating-b-hover'),
  },
  [RatingBadgeRating.C]: {
    '--rating-badge-border-color': cssVar('ratings-colors-border-rating-c-hover'),
  },
  [RatingBadgeRating.D]: {
    '--rating-badge-border-color': cssVar('ratings-colors-border-rating-d-hover'),
  },
  [RatingBadgeRating.E]: {
    '--rating-badge-border-color': cssVar('ratings-colors-border-rating-e-hover'),
  },
};
