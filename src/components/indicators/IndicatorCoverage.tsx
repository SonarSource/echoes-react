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
import { IndicatorCoverageGraphic } from './IndicatorCoverageGraphic';
import {
  BaseIndicatorProps,
  INDICATOR_DEFAULT_COLOR,
  IndicatorCoverageRating,
  IndicatorSize,
  IndicatorSvgWrapper,
} from './indicatorUtils';

/**
 * Coverage color scale is inverted, using two consecutive instances of each of rating-a, rating-b and rating-c.
 */
const COVERAGE_COLOR_STYLE: Record<`${IndicatorCoverageRating}`, EchoesCSSVarString> = {
  [IndicatorCoverageRating.A]: cssVar('ratings-colors-border-rating-a-default'),
  [IndicatorCoverageRating.B]: cssVar('ratings-colors-border-rating-a-default'),
  [IndicatorCoverageRating.C]: cssVar('ratings-colors-border-rating-b-default'),
  [IndicatorCoverageRating.D]: cssVar('ratings-colors-border-rating-b-default'),
  [IndicatorCoverageRating.E]: cssVar('ratings-colors-border-rating-c-default'),
  [IndicatorCoverageRating.F]: cssVar('ratings-colors-border-rating-c-default'),
  [IndicatorCoverageRating.G]: cssVar('ratings-colors-border-rating-d-default'),
  [IndicatorCoverageRating.H]: cssVar('ratings-colors-border-rating-e-default'),
};

export interface IndicatorCoverageProps extends BaseIndicatorProps {
  /**
   * The rating of the indicator. Ranges from A to H.
   */
  rating: `${IndicatorCoverageRating}` | undefined;
}

export const IndicatorCoverage = forwardRef<SVGSVGElement, IndicatorCoverageProps>((props, ref) => {
  const { rating, size = IndicatorSize.Medium } = props;

  return (
    <IndicatorSvgWrapper
      aria-hidden
      color={isDefined(rating) ? COVERAGE_COLOR_STYLE[rating] : INDICATOR_DEFAULT_COLOR}
      ref={ref}
      role="img"
      size={size}
      viewBox="0 0 36 34"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <IndicatorCoverageGraphic rating={rating} />
    </IndicatorSvgWrapper>
  );
});
IndicatorCoverage.displayName = 'IndicatorCoverage';
