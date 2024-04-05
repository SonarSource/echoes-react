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
import { PropsWithChildren } from 'react';
import { DesignTokensColors } from '~common/helpers/design-tokens';
import { isDefined, isStringDefined } from '~common/helpers/types';

export interface IconProps {
  ariaLabel?: string;
  className?: string;
  color?: DesignTokensColors;
}

export interface IconFilledProps extends IconProps {
  isFilled?: boolean;
}

function IconBase(props: Readonly<PropsWithChildren<IconFilledProps>>) {
  const { ariaLabel, className, children } = props;

  return (
    <span
      aria-hidden={isStringDefined(ariaLabel) ? 'false' : 'true'}
      aria-label={ariaLabel}
      className={className}
      role="img">
      {children}
    </span>
  );
}

export const IconMaterialWrapper = styled(IconBase)<PropsWithChildren<IconFilledProps>>`
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

  ${({ color }) => isDefined(color) && `color: var(--${color});`}
  ${({ isFilled = false }) => (isFilled ? `font-variation-settings: 'FILL' 1;` : '')}
`;
IconMaterialWrapper.displayName = 'IconMaterialWrapper';

export const IconCustomWrapper = styled(IconMaterialWrapper)<PropsWithChildren<IconProps>>`
  font-family: 'Echoes';
`;
IconMaterialWrapper.displayName = 'IconCustomWrapper';
