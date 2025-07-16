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

import { ButtonHTMLAttributes, MouseEvent } from 'react';

export type HTMLButtonAttributesSubset = Pick<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'form' | 'name' | 'role' | 'type'
>;

export interface ButtonCommonProps {
  className?: string;
  hasAutoFocus?: boolean;
  id?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: MouseEvent<HTMLElement>) => unknown;
  size?: `${ButtonSize}`;
  style?: React.CSSProperties;
  enablePreventDefault?: boolean;
  shouldStopPropagation?: boolean;
}

export interface ButtonBaseProps extends ButtonCommonProps, HTMLButtonAttributesSubset {
  variety?: `${ButtonVariety}`;
}

export enum ButtonSize {
  Medium = 'medium',
  Large = 'large',
}

export enum ButtonVariety {
  Default = 'default',
  DefaultGhost = 'default-ghost',
  Primary = 'primary',
  PrimaryGhost = 'primary-ghost',
  Danger = 'danger',
  DangerOutline = 'danger-outline',
  DangerGhost = 'danger-ghost',
}
