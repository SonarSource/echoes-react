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

import { Link as RouterLink } from 'react-router-dom';
import { styled } from 'storybook/internal/theming';
import { LinkProps } from '../links';
import { buttonIconStyles, ButtonStyled } from './ButtonStyles';
import { ButtonCommonProps } from './ButtonTypes';

type LinkPropsSubset = Pick<
  LinkProps,
  'to' | 'download' | 'reloadDocument' | 'shouldOpenInNewTab' | 'state'
>;

export enum ButtonAsLinkVariety {
  Default = 'default',
  DefaultGhost = 'default-ghost',
  Primary = 'primary',
  PrimaryGhost = 'primary-ghost',
}

export interface ButtonAsLinkBaseProps extends ButtonCommonProps, LinkPropsSubset {
  variety?: `${ButtonAsLinkVariety}`;
}

export const ButtonAsLink = ButtonStyled.withComponent(RouterLink);
ButtonAsLink.displayName = 'ButtonAsLink';

// We can't use `withComponent` here because it breaks the TS types adding some references
export const ButtonIconAsLink = styled(ButtonAsLink)(buttonIconStyles);
ButtonIconAsLink.displayName = 'ButtonIconAsLink';
