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

import styled from '@emotion/styled';
import { forwardRef } from 'react';
import { ButtonIcon } from '../buttons';
import { ButtonIconProps } from '../buttons/ButtonIcon';

import { cssVar } from '~utils/design-tokens';

export type GlobalNavigationActionProps = ButtonIconProps;

export const GlobalNavigationAction = forwardRef<HTMLButtonElement, GlobalNavigationActionProps>(
  ({ ...buttonProps }: Readonly<GlobalNavigationActionProps>, ref) => {
    return <StyledButtonIcon ref={ref} size="medium" variety="default-ghost" {...buttonProps} />;
  },
);
GlobalNavigationAction.displayName = 'GlobalNavigationAction';

const StyledButtonIcon = styled(ButtonIcon)`
  font-size: ${cssVar('font-size-30')};
`;
StyledButtonIcon.displayName = 'StyledButtonIcon';
