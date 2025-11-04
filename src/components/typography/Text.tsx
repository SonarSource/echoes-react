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
import { CSSProperties, forwardRef, PropsWithChildren } from 'react';
import { isDefined } from '~common/helpers/types';
import { DesignTokensColorsText } from '~types/design-tokens';
import { cssVar } from '~utils/design-tokens';

export enum TextSize {
  Small = 'small',
  Default = 'default',
  Large = 'large',
}

type TextTags = 'span' | 'p' | 'div' | 'strong' | 'b' | 'em' | 'i' | 'ul' | 'ol' | 'li';

export type TextProps = {
  as?: TextTags;
  className?: string;
  id?: string;
  isHighlighted?: boolean;
  size?: `${TextSize}`;
} & ColorProps;

type ColorProps =
  | {
      colorOverride?: DesignTokensColorsText;
      isSubtle?: never;
    }
  | {
      colorOverride?: never;
      isSubtle: boolean;
    };

export const Text = forwardRef<HTMLSpanElement, PropsWithChildren<TextProps>>((props, ref) => {
  const {
    children,
    colorOverride,
    isHighlighted = false,
    isSubtle = false,
    size = TextSize.Default,
    ...restAndRadixProps
  } = props;

  const additionalProps: { style?: CSSProperties } = isDefined(colorOverride)
    ? { style: { color: `var(--${colorOverride})` } }
    : {};

  return (
    <StyledText
      isHighlighted={isHighlighted}
      isSubtle={isSubtle}
      ref={ref}
      size={size}
      {...additionalProps}
      {...restAndRadixProps}>
      {children}
    </StyledText>
  );
});
Text.displayName = 'Text';

export const TextTypographyStyle = styled.span`
  & ul,
  &:is(ul) {
    list-style-type: disc;
  }

  & ol,
  &:is(ol) {
    list-style-type: decimal;
  }

  & ul,
  & ol,
  &:is(ul, ol) {
    margin-block-start: ${cssVar('dimension-space-100')};
    margin-block-end: 0;
    padding-inline-start: 28px;

    display: flex;
    flex-direction: column;
    gap: ${cssVar('dimension-space-100')};
  }

  & strong,
  & b,
  &:is(strong, b) {
    font-weight: ${cssVar('font-weight-bold')};
  }

  & em,
  & i,
  &:is(em, i) {
    font-style: ${cssVar('font-weight-italic-style')};
  }
`;
TextTypographyStyle.displayName = 'TextTypographyStyle';

type StyledTextProps = Required<Pick<TextProps, 'isSubtle' | 'isHighlighted' | 'size'>>;

const StyledText = styled(TextTypographyStyle)<StyledTextProps>`
  max-width: ${cssVar('sizes-typography-max-width-default')};

  font: ${getFontForSizeAndWeight};

  color: ${({ isSubtle }) =>
    isSubtle ? cssVar('color-text-subtle') : cssVar('color-text-default')};
`;
StyledText.displayName = 'StyledText';

function getFontForSizeAndWeight({
  size,
  isHighlighted,
}: Pick<StyledTextProps, 'size' | 'isHighlighted'>) {
  return TYPOGRAPHY_MAP[`${isHighlighted}`][size];
}

const TYPOGRAPHY_MAP = {
  /* isHighlighted is true */
  true: {
    [TextSize.Small]: cssVar('typography-text-small-semi-bold'),
    [TextSize.Default]: cssVar('typography-text-default-semi-bold'),
    [TextSize.Large]: cssVar('typography-text-large-semi-bold'),
  },
  /* isHighlighted is false */
  false: {
    [TextSize.Small]: cssVar('typography-text-small-regular'),
    [TextSize.Default]: cssVar('typography-text-default-regular'),
    [TextSize.Large]: cssVar('typography-text-large-regular'),
  },
};
