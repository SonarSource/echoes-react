/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

const bottomMarginByHeadingSize = (headingSize: HeadingSize) => {
  switch (headingSize) {
    case HeadingSize.Large:
      return 'var(--echoes-dimension-space-200)';
    case HeadingSize.ExtraLarge:
      return 'var(--echoes-dimension-space-250)';
    default:
      return 'var(--echoes-dimension-space-100)';
  }
};

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

const defaultSizeByTag: Record<HeadingTag, HeadingSize> = {
  h1: HeadingSize.ExtraLarge,
  h2: HeadingSize.Large,
  h3: HeadingSize.Medium,
  h4: HeadingSize.Small,
  h5: HeadingSize.ExtraSmall,
};

interface Props {
  as: HeadingTag;
  className?: string;
  hasMarginBottom?: boolean;
  size?: HeadingSize;
}

export const Heading = forwardRef<HTMLDivElement, Readonly<PropsWithChildren<Props>>>(
  ({ as, size = defaultSizeByTag[as], ...props }, ref) => (
    <StyledHeading as={as} ref={ref} size={size} {...props} />
  ),
);

Heading.displayName = 'Heading';

const StyledHeading = styled.div<{
  hasMarginBottom?: Props['hasMarginBottom'];
  size: Props['size'];
}>`
  font: var(--echoes-typography-heading-${({ size }) => size});
  color: var(--echoes-color-text-bold);
  margin: 0;
  max-width: var(--echoes-sizes-typography-max-width-default);

  ${({ hasMarginBottom, size }) =>
    hasMarginBottom ? `margin-bottom: ${bottomMarginByHeadingSize(size as HeadingSize)}` : ''}
`;
