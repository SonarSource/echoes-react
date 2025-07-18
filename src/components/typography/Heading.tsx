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
import { forwardRef, PropsWithChildren } from 'react';

export enum HeadingSize {
  ExtraSmall = 'xsmall',
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  ExtraLarge = 'xlarge',
}

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface HeadingProps {
  as: HeadingTag;
  className?: string;
  id?: string;
  hasMarginBottom?: boolean;
  size?: `${HeadingSize}`;
}

export const Heading = forwardRef<HTMLDivElement, Readonly<PropsWithChildren<HeadingProps>>>(
  ({ as, size = defaultSizeByTag[as], hasMarginBottom = false, ...props }, ref) => (
    <StyledHeading as={as} hasMarginBottom={hasMarginBottom} ref={ref} size={size} {...props} />
  ),
);

Heading.displayName = 'Heading';

const defaultSizeByTag: Record<HeadingTag, HeadingSize> = {
  h1: HeadingSize.ExtraLarge,
  h2: HeadingSize.Large,
  h3: HeadingSize.Medium,
  h4: HeadingSize.Small,
  h5: HeadingSize.ExtraSmall,
};

const StyledHeading = styled.div<Required<Pick<HeadingProps, 'hasMarginBottom' | 'size'>>>`
  font: ${getHeadingFont};
  color: var(--echoes-color-text-strong);
  margin: 0;
  max-width: var(--echoes-sizes-typography-max-width-default);

  ${({ hasMarginBottom, size }) =>
    hasMarginBottom ? `margin-bottom: ${bottomMarginByHeadingSize({ size })}` : ''}
`;
StyledHeading.displayName = 'StyledHeading';

function getHeadingFont({ size }: Required<Pick<HeadingProps, 'size'>>) {
  return HEADING_TYPOGRAPHY_MAP[size];
}

const HEADING_TYPOGRAPHY_MAP = {
  [HeadingSize.ExtraSmall]: 'var(--echoes-typography-heading-xsmall)',
  [HeadingSize.Small]: 'var(--echoes-typography-heading-small)',
  [HeadingSize.Medium]: 'var(--echoes-typography-heading-medium)',
  [HeadingSize.Large]: 'var(--echoes-typography-heading-large)',
  [HeadingSize.ExtraLarge]: 'var(--echoes-typography-heading-xlarge)',
};

const bottomMarginByHeadingSize = ({ size }: Required<Pick<HeadingProps, 'size'>>) => {
  switch (size) {
    case HeadingSize.Large:
      return 'var(--echoes-dimension-space-200)';
    case HeadingSize.ExtraLarge:
      return 'var(--echoes-dimension-space-250)';
    default:
      return 'var(--echoes-dimension-space-100)';
  }
};
