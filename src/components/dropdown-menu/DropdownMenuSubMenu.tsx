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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';
import { forwardRef, ReactNode } from 'react';
import { IconChevronRight } from '../icons';
import { styleDropdownMenuOverlay } from './DropdownMenuCommons';
import { DropdownMenuItemBase } from './DropdownMenuItemBase';

export interface DropdownMenuSubProps extends radixDropdownMenu.DropdownMenuSubProps {
  className?: string;
  id?: string;
  isOpen?: boolean;
  isOpenOnMount?: boolean;
  items: ReactNode | undefined;
}

export const DropdownMenuSubMenu = forwardRef<HTMLDivElement, DropdownMenuSubProps>(
  (props, ref) => {
    const {
      children,
      className,
      id = 'dropdown-submenu',
      isOpen,
      isOpenOnMount,
      items,
      ...radixProps
    } = props;

    return (
      <radixDropdownMenu.Sub defaultOpen={isOpenOnMount} open={isOpen}>
        <DropdownMenuItemBase
          as={radixDropdownMenu.SubTrigger}
          ref={ref}
          suffix={<IconChevronRight />}
          {...radixProps}>
          {children}
        </DropdownMenuItemBase>

        <StyledDropdownMenuSubContent
          aria-labelledby={`${id}-subtrigger`}
          className={className}
          id={`${id}-subdropdown`}>
          {items}
        </StyledDropdownMenuSubContent>
      </radixDropdownMenu.Sub>
    );
  },
);
DropdownMenuSubMenu.displayName = 'DropdownMenuSubMenu';

const RADIX_SUBMENU_PANEL_VERTICAL_OFFSET = '4px';

const StyledDropdownMenuSubContent = styled(styleDropdownMenuOverlay(radixDropdownMenu.SubContent))`
  margin-left: var(--echoes-offset-dropdown-submenu-panel-horizontal);
  margin-top: calc(
    var(--echoes-offset-dropdown-submenu-panel-vertical) - ${RADIX_SUBMENU_PANEL_VERTICAL_OFFSET}
  );
`;
StyledDropdownMenuSubContent.displayName = 'StyledDropdownMenuSubContent';
