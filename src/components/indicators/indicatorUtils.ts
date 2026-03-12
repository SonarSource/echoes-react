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

import styled from '@emotion/styled';
import { cssVar, EchoesCSSVarString } from '~utils/design-tokens';
import { IndicatorDuplicationProps } from './IndicatorDuplication';

export interface BaseIndicatorProps {
  /**
   * Defines the size of the indicator
   */
  size?: `${IndicatorSize}`;
}

export enum IndicatorSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum IndicatorDuplicationRating {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
}

export enum IndicatorCoverageRating {
  A = 'A',
  B = 'B',
  C = 'C',
  D = 'D',
  E = 'E',
  F = 'F',
  G = 'G',
  H = 'H',
}

export interface WrapperProps extends Pick<IndicatorDuplicationProps, 'size'> {
  color: EchoesCSSVarString;
}

export const IndicatorSvgWrapper = styled.svg<WrapperProps>`
  ${({ size }) => INDICATOR_SIZE_STYLES[size ?? IndicatorSize.Medium]};

  fill: ${({ color }) => color};
`;
IndicatorSvgWrapper.displayName = 'IndicatorSvgWrapper';

const INDICATOR_SIZE_STYLES: Record<IndicatorSize, string> = {
  [IndicatorSize.Small]: `
    height: ${cssVar('dimension-height-400')};
    width: ${cssVar('dimension-width-200')};
  `,
  [IndicatorSize.Medium]: `
    height: ${cssVar('dimension-height-600')};
    width: ${cssVar('dimension-width-300')};
  `,
  [IndicatorSize.Large]: `
    height: ${cssVar('dimension-height-900')};
    width: ${cssVar('dimension-width-450')};
  `,
};

export const INDICATOR_DEFAULT_COLOR = cssVar('color-background-neutral-bolder-default');
