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
import { Link as RouterLink } from 'react-router-dom';
import { LinkBaseProps } from '../links/LinkTypes';
import { ButtonStyled, buttonIconStyles } from './ButtonStyles';
import { ButtonCommonProps, HTMLButtonAttributesSubset } from './ButtonTypes';

type LinkPropsSubset = Pick<
  LinkBaseProps,
  'to' | 'download' | 'reloadDocument' | 'enableOpenInNewTab' | 'state'
>;

export type LinkPropsForbiddenForButton = {
  [K in keyof LinkPropsSubset]?: never;
};

/**
 * Available visual style variants for buttons that render as links.
 * Limited to varieties that work well with navigation elements.
 */
export enum ButtonAsLinkVariety {
  /**
   * The "default" style is the go-to button.
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
}

type ButtonPropsForbiddenForLink = {
  [K in keyof HTMLButtonAttributesSubset]?: never;
};

export interface ButtonAsLinkBaseProps
  extends ButtonCommonProps, LinkPropsSubset, ButtonPropsForbiddenForLink {
  /**
   * The visual style variant of the link button (optional).
   * Limited to varieties appropriate for navigation elements. Default is `default`.
   */
  variety?: `${ButtonAsLinkVariety}`;
}

export const ButtonAsLink = ButtonStyled.withComponent(RouterLink);
ButtonAsLink.displayName = 'ButtonAsLink';

// We can't use `withComponent` here because it breaks the TS types adding some references
export const ButtonIconAsLink = styled(ButtonAsLink)(buttonIconStyles);
ButtonIconAsLink.displayName = 'ButtonIconAsLink';
