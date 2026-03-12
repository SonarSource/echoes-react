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

import { forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { cssVar, EchoesCSSVarString } from '~utils/design-tokens';
import { IndicatorDuplicationGraphic } from './IndicatorDuplicationGraphic';
import {
  BaseIndicatorProps,
  INDICATOR_DEFAULT_COLOR,
  IndicatorDuplicationRating,
  IndicatorSize,
  IndicatorSvgWrapper,
} from './indicatorUtils';

/**
 * There are more duplication ratings than color ratings, so `rating-a` is duplicated.
 */
const DUPLICATION_COLOR_STYLE: Record<`${IndicatorDuplicationRating}`, EchoesCSSVarString> = {
  [IndicatorDuplicationRating.A]: cssVar('ratings-colors-border-rating-a-default'),
  [IndicatorDuplicationRating.B]: cssVar('ratings-colors-border-rating-a-default'),
  [IndicatorDuplicationRating.C]: cssVar('ratings-colors-border-rating-b-default'),
  [IndicatorDuplicationRating.D]: cssVar('ratings-colors-border-rating-c-default'),
  [IndicatorDuplicationRating.E]: cssVar('ratings-colors-border-rating-d-default'),
  [IndicatorDuplicationRating.F]: cssVar('ratings-colors-border-rating-e-default'),
};

export interface IndicatorDuplicationProps extends BaseIndicatorProps {
  /**
   * The rating of the indicator. Ranges from A to F.
   */
  rating: `${IndicatorDuplicationRating}` | undefined;
}

export const IndicatorDuplication = forwardRef<SVGSVGElement, IndicatorDuplicationProps>(
  (props, ref) => {
    const { rating, size = IndicatorSize.Medium } = props;

    return (
      <IndicatorSvgWrapper
        aria-hidden
        color={isDefined(rating) ? DUPLICATION_COLOR_STYLE[rating] : INDICATOR_DEFAULT_COLOR}
        ref={ref}
        role="img"
        size={size}
        viewBox="0 0 36 34"
        xmlns="http://www.w3.org/2000/svg"
        {...props}>
        <IndicatorDuplicationGraphic rating={rating} />
      </IndicatorSvgWrapper>
    );
  },
);
IndicatorDuplication.displayName = 'IndicatorDuplication';
