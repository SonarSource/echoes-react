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
  /**
   * Custom ARIA label for accessibility (optional).
   */
  ariaLabel?: string;
  className?: string;
  /**
   * Whether the button should receive focus when the component mounts (optional).
   * Equivalent to the HTML `autofocus` attribute.
   */
  hasAutoFocus?: boolean;
  id?: string;
  /**
   * Whether the button is disabled (optional).
   * Disabled buttons cannot be interacted with and have reduced visual emphasis.
   */
  isDisabled?: boolean;
  /**
   * Whether the button is in a loading state (optional).
   * When true, displays a spinner. Usually used with `isDisabled` to prevent interaction.
   */
  isLoading?: boolean;
  /**
   * Click event handler (optional).
   */
  onClick?: (event: MouseEvent<HTMLElement>) => unknown;
  /**
   * The size of the button (optional). Default is `large`.
   */
  size?: `${ButtonSize}`;
  style?: React.CSSProperties;
  /**
   * Whether to call preventDefault on click events (optional).
   * Useful for preventing default browser behavior like form submission.
   */
  enablePreventDefault?: boolean;
  /**
   * Whether to call stopPropagation on click events (optional).
   * Prevents the click event from bubbling up to parent elements.
   */
  enableStopPropagation?: boolean;
}

export interface ButtonBaseProps extends ButtonCommonProps, HTMLButtonAttributesSubset {
  /**
   * The appearance, colors and emphasis of the button (optional). Default is `default`.
   */
  variety?: `${ButtonVariety}`;
}

export enum ButtonSize {
  /**
   * Compact size for dense interfaces.
   */
  Medium = 'medium',
  /**
   * Standard size with comfortable touch targets (default).
   */
  Large = 'large',
}

export enum ButtonVariety {
  /**
   * The "default" style is the go-to button. Used for most actions.
   */
  Default = 'default',
  /**
   * Minimal button with transparent background for tertiary actions.
   */
  DefaultGhost = 'default-ghost',
  /**
   * Emphasized button for primary actions and call-to-action scenarios. Should be used once per section.
   */
  Primary = 'primary',
  /**
   * Primary styling with transparent background for tertiary actions.
   */
  PrimaryGhost = 'primary-ghost',
  /**
   * Red-themed button for destructive actions that remove data and are not reversible.
   */
  Danger = 'danger',
  /**
   * Danger styling with outline appearance for secondary destructive actions.
   */
  DangerOutline = 'danger-outline',
  /**
   * Danger styling with transparent background for tertiary destructive actions.
   */
  DangerGhost = 'danger-ghost',
}
