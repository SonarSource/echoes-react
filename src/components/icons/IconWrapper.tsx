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
import { isStringDefined } from '~common/helpers/types';

export interface IconProps {
  ariaLabel?: string;
  className?: string;
  /* To discuss?
  ['data-guiding-id']?: string;
  fill?: ThemeColors | CSSColor;
  style?: React.CSSProperties;
  */
}

export interface IconFilledProps extends IconProps {
  isFilled?: boolean;
}

type IconWrapperProps = JSX.IntrinsicElements['span'];

function IconBase(props: Readonly<IconWrapperProps & IconFilledProps>) {
  const {
    ariaLabel,
    'aria-label': nativeAriaLabel,
    children,
    isFilled, // extracted here to prevent it from leaking to the span element
    ...rest
  } = props;

  return (
    <span
      // 'aria-label' is not a valid prop, but it might be used by the consumer when wrapping the component with emotion
      aria-hidden={isStringDefined(ariaLabel ?? nativeAriaLabel) ? 'false' : 'true'}
      aria-label={ariaLabel ?? nativeAriaLabel}
      role="img"
      {...rest}>
      {children}
    </span>
  );
}

export const IconMaterialWrapper = styled(IconBase)<IconWrapperProps & IconFilledProps>`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-family: 'Material Symbols Rounded';
  font-size: calc(1em + 4px);
  font-style: normal;
  font-weight: normal;
  height: calc(2em - 16px);
  line-height: calc(2em - 16px);
  text-align: center;
  vertical-align: bottom;
  width: calc(2em - 16px);

  ${({ isFilled = false }) => (isFilled ? `font-variation-settings: 'FILL' 1;` : '')}
`;
IconMaterialWrapper.displayName = 'IconMaterialWrapper';

export const IconCustomWrapper = styled(IconMaterialWrapper)<IconWrapperProps & IconProps>`
  font-family: 'Echoes';
`;
IconMaterialWrapper.displayName = 'IconCustomWrapper';
