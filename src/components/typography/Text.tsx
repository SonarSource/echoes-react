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
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import { isDefined } from '~common/helpers/types';
import { DesignTokensColorsText } from '~types/design-tokens';

export enum TextSize {
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

type TextTags = 'span' | 'p' | 'div' | 'strong' | 'b' | 'em' | 'i';

type Props = {
  as?: TextTags;
  className?: string;
  isStrong?: boolean;
  size?: TextSize;
} & ColorProps;

type ColorProps =
  | {
      colorOverride?: DesignTokensColorsText;
      isSubdued?: never;
    }
  | {
      colorOverride?: never;
      isSubdued: boolean;
    };

export const Text = forwardRef<HTMLSpanElement, PropsWithChildren<Props>>((props, ref) => {
  const {
    children,
    colorOverride,
    isStrong = false,
    isSubdued = false,
    size = TextSize.Default,
    ...restAndRadixProps
  } = props;

  const additionalProps: { style?: CSSProperties } = isDefined(colorOverride)
    ? { style: { color: `var(--${colorOverride})` } }
    : {};

  return (
    <StyledText
      isStrong={isStrong}
      isSubdued={isSubdued}
      ref={ref}
      size={size}
      {...additionalProps}
      {...restAndRadixProps}>
      {children}
    </StyledText>
  );
});
Text.displayName = 'Text';

type StyledTextProps = Required<Pick<Props, 'isSubdued' | 'isStrong' | 'size'>>;

const BaseStyles = styled.span`
  max-width: var(--echoes-sizes-typography-max-width-default);

  & ul {
    list-style-type: disc;
  }

  & ol {
    list-style-type: decimal;
  }

  & ul,
  & ol {
    margin-block-start: var(--echoes-dimension-space-100);
    margin-block-end: 0;
    padding-inline-start: 28px;

    display: flex;
    flex-direction: column;
    gap: var(--echoes-dimension-space-100);
  }

  & strong,
  & b,
  &:is(strong, b) {
    font-weight: var(--echoes-font-weight-bold);
  }

  &:is(em, i) {
    font-style: italic;
  }
`;

const StyledText = styled(BaseStyles)<StyledTextProps>`
  font: ${getFontForSizeAndWeight};

  color: ${getColor};
`;

function getColor({ isSubdued }: Pick<StyledTextProps, 'isSubdued'>) {
  return isSubdued ? 'var(--echoes-color-text-subdued)' : 'var(--echoes-color-text-default)';
}

function getFontForSizeAndWeight({ size, isStrong }: Pick<StyledTextProps, 'size' | 'isStrong'>) {
  return TYPOGRAPHY_MAP[`${isStrong}`][size];
}

const TYPOGRAPHY_MAP = {
  /* isStrong is true */
  true: {
    [TextSize.Small]: 'var(--echoes-typography-text-small-semi-bold)',
    [TextSize.Default]: 'var(--echoes-typography-text-default-semi-bold)',
    [TextSize.Large]: 'var(--echoes-typography-text-large-semi-bold)',
  },
  /* isStrong is false */
  false: {
    [TextSize.Small]: 'var(--echoes-typography-text-small-medium)',
    [TextSize.Default]: 'var(--echoes-typography-text-default-regular)',
    [TextSize.Large]: 'var(--echoes-typography-text-large-regular)',
  },
};
