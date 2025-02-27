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

import React, { forwardRef } from 'react';
import { DropdownMenu, DropdownMenuAlign, DropdownMenuProps } from '../dropdown-menu';
import { BreadcrumbLink } from './BreadcrumbLink';

interface BreadcrumbEllipsisProps extends Pick<DropdownMenuProps, 'items'> {
  ariaLabel: string;
  itemRenderer?: (dropdownItem: unknown, index: number) => JSX.Element;
}

export const BreadcrumbEllipsis = forwardRef<HTMLButtonElement, BreadcrumbEllipsisProps>(
  ({ ariaLabel, itemRenderer, items }, ref) => {
    return (
      <DropdownMenu
        align={DropdownMenuAlign.Start}
        items={
          items &&
          React.Children.map(
            items,
            itemRenderer ??
              ((child) => (
                <DropdownMenu.ItemButton>{child as React.ReactNode}</DropdownMenu.ItemButton>
              )),
          )
        }
        ref={ref}>
        <BreadcrumbLink aria-label={ariaLabel} shouldPreventDefault to="">
          ...
        </BreadcrumbLink>
      </DropdownMenu>
    );
  },
);

BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';
