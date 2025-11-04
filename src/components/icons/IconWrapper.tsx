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
import { forwardRef } from 'react';
import { isDefined } from '~common/helpers/types';
import { DesignTokensColorsIcons } from '~types/design-tokens';

export interface IconProps {
  className?: string;
  color?: DesignTokensColorsIcons;
}

export interface IconFilledProps extends IconProps {
  isFilled?: boolean;
}

interface IconBaseProps {
  children: React.ReactNode;
}

const IconBase = forwardRef<HTMLSpanElement, IconBaseProps & IconFilledProps>((props, ref) => {
  const { className, children, color, isFilled, ...radixProps } = props;

  return (
    <span {...radixProps} aria-hidden className={className} ref={ref}>
      {children}
    </span>
  );
});
IconBase.displayName = 'IconBase';

const IconWrapper = styled(IconBase)<IconBaseProps & IconFilledProps>`
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  display: inline-block;
  font-size: calc(1em + 4px);
  font-style: normal;
  font-weight: normal;
  height: calc(2em - 16px);
  line-height: calc(2em - 16px);
  text-align: center;
  vertical-align: bottom;
  width: calc(2em - 16px);

  ${({ color }) => isDefined(color) && `color: var(--${color});`}
  ${({ isFilled = false }) => (isFilled ? `font-variation-settings: 'FILL' 1;` : '')}
`;
IconWrapper.displayName = 'IconWrapper';

export const IconMaterialWrapper = styled(IconWrapper)<IconBaseProps & IconFilledProps>`
  font-family: 'Material Symbols Rounded';
`;
IconMaterialWrapper.displayName = 'IconMaterialWrapper';

export const IconCustomWrapper = styled(IconWrapper)<IconBaseProps & IconProps>`
  font-family: 'Echoes';
`;
IconCustomWrapper.displayName = 'IconCustomWrapper';
