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
import { ButtonVariety } from '../buttons';
import { Button, ButtonProps } from '../buttons/Button';
import {
  RatingBadge,
  RatingBadgeDimensions,
  RatingBadgeProps,
  RatingBadgeRating,
  RatingBadgeSize,
} from './RatingBadge';

export type RatingBadgeButtonProps = Pick<ButtonProps, 'onClick'> & RatingBadgeProps;

const RatingBadgeButtonInner = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'size'> & Pick<RatingBadgeProps, 'rating' | 'size'>
>(({ rating, size, ...buttonProps }, ref) => <Button ref={ref} {...buttonProps} />);

RatingBadgeButtonInner.displayName = 'RatingBadgeButtonInner';

export const RatingBadgeButton = forwardRef<HTMLButtonElement, RatingBadgeButtonProps>(
  (
    { className, rating: ratingPropValue, size = RatingBadgeSize.Medium, style, ...buttonProps },
    ref,
  ) => {
    const rating = isStringDefined(ratingPropValue) ? ratingPropValue : RatingBadgeRating.Null;

    return (
      <RatingBadgeButtonStyled
        ref={ref}
        variety={ButtonVariety.DefaultGhost}
        {...{ className, rating, size, style, ...buttonProps }}>
        <RatingBadge {...{ rating, size }} />
      </RatingBadgeButtonStyled>
    );
  },
);

RatingBadgeButton.displayName = 'RatingBadgeButton';

const RatingBadgeButtonStyled = styled(RatingBadgeButtonInner)`
  border-radius: var(--echoes-border-radius-full);
  padding: 0;

  ${({ rating = RatingBadgeRating.Null }) =>
    rating === RatingBadgeRating.Null
      ? ''
      : `
          & div:hover {
            box-sizing: border-box;
            border: 1px solid var(--echoes-ratings-colors-border-rating-${rating.toLowerCase()}-hover);
          }
        `}

  ${({ size = RatingBadgeSize.Medium }) => {
    const dimensions = RatingBadgeDimensions[size];

    return `
      &,
      span {
         height: var(--echoes-dimension-width-${dimensions.width});
         min-height: var(--echoes-dimension-width-${dimensions.width});
         min-width: var(--echoes-dimension-width-${dimensions.width});
         width: var(--echoes-dimension-width-${dimensions.width});
      }
    `;
  }}
`;
