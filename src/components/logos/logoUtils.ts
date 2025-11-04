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

export interface LogoProps {
  className?: string;
  hasText?: boolean;
  size?: `${LogoSize}`;
}

export enum LogoSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export const LogoSvgWrapper = styled.svg<Pick<LogoProps, 'size'>>`
  height: ${({ size }) => LOGO_HEIGHT_STYLES[size ?? LogoSize.Medium]};
  width: auto;
`;
LogoSvgWrapper.displayName = 'LogoSvgWrapper';

const LOGO_HEIGHT_STYLES: Record<`${LogoSize}`, EchoesCSSVarString> = {
  [LogoSize.Small]: cssVar('sizes-logo-height-small'),
  [LogoSize.Medium]: cssVar('sizes-logo-height-medium'),
  [LogoSize.Large]: cssVar('sizes-logo-height-large'),
};
