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
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { BUTTON_VARIETY_STYLES, ButtonStyled } from '../buttons/ButtonStyles';
import { DropdownMenu, DropdownMenuProps } from '../dropdown-menu/DropdownMenu';
import { Tooltip } from '../tooltip';

type TooltipProps = ComponentPropsWithoutRef<typeof Tooltip>;

export interface GlobalNavigationActionProps extends Omit<DropdownMenuProps, 'children'> {
  ariaLabel?: string;
  avatar: ReactNode;
  tooltipContent?: TooltipProps['content'];
}

export const GlobalNavigationAccount = forwardRef<HTMLButtonElement, GlobalNavigationActionProps>(
  (props: Readonly<GlobalNavigationActionProps>, ref) => {
    const { ariaLabel, avatar, tooltipContent = props.ariaLabel, ...dropdownProps } = props;

    const intl = useIntl();

    const defaultAriaLabel = intl.formatMessage({
      defaultMessage: 'Account',
      description: 'aria-label text for the account button (in the GlobalNavigation)',
      id: 'global_navigation.account',
    });

    return (
      <DropdownMenu {...dropdownProps}>
        <Tooltip content={tooltipContent ?? defaultAriaLabel}>
          <StyledAccountButton aria-label={ariaLabel ?? defaultAriaLabel} ref={ref}>
            {avatar}
          </StyledAccountButton>
        </Tooltip>
      </DropdownMenu>
    );
  },
);
GlobalNavigationAccount.displayName = 'GlobalNavigationAccount';

const StyledAccountButton = styled(ButtonStyled)`
  ${BUTTON_VARIETY_STYLES['default-ghost']}

  height: var(--echoes-sizes-buttons-medium);
  width: var(--echoes-sizes-buttons-medium);
  padding: var(--echoes-dimension-space-75);

  & > * {
    height: 100%;
    width: 100%;
  }
`;
