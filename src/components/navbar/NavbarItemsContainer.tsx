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
import * as radixNavigationMenu from '@radix-ui/react-navigation-menu';
import { Children, PropsWithChildren, forwardRef } from 'react';

export interface NavbarItemProps
  extends PropsWithChildren<radixNavigationMenu.NavigationMenuProps> {
  className?: string;
}

export const NavbarItemsContainer = forwardRef<HTMLDivElement, NavbarItemProps>(
  ({ children, className, ...radixProps }: Readonly<NavbarItemProps>, ref) => {
    /*
     * We need to wrap each child in a NavMenu Item to allow Radix to manage it
     */
    const wrappedChildren = Children.map(children, (child) => {
      return <StyledNavigationMenuItem>{child}</StyledNavigationMenuItem>;
    });

    return (
      <StyledNavigationMenuRoot ref={ref} {...radixProps}>
        {wrappedChildren}
      </StyledNavigationMenuRoot>
    );
  },
);
NavbarItemsContainer.displayName = 'NavbarItemsContainer';

const StyledNavigationMenuRoot = styled(radixNavigationMenu.Root)`
  display: flex;
  align-items: center;

  gap: var(--echoes-dimension-space-100);
`;

const StyledNavigationMenuItem = styled(radixNavigationMenu.Item)`
  list-style: none;
`;
