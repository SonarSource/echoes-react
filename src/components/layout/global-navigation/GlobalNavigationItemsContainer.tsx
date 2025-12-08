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
import * as radixNavigationMenu from '@radix-ui/react-navigation-menu';
import { PropsWithChildren, forwardRef } from 'react';
import { cssVar } from '~utils/design-tokens';

export interface GlobalNavigationItemsContainerProps extends PropsWithChildren<radixNavigationMenu.NavigationMenuProps> {
  className?: string;
}

export const GlobalNavigationItemsContainer = forwardRef<
  HTMLUListElement,
  GlobalNavigationItemsContainerProps
>(({ children, className, ...radixProps }: Readonly<GlobalNavigationItemsContainerProps>, ref) => {
  return (
    <radixNavigationMenu.Root>
      <StyledNavigationMenuRoot ref={ref} {...radixProps}>
        {children}
      </StyledNavigationMenuRoot>
    </radixNavigationMenu.Root>
  );
});
GlobalNavigationItemsContainer.displayName = 'GlobalNavigationItemsContainer';

const StyledNavigationMenuRoot = styled(radixNavigationMenu.List)`
  display: flex;
  align-items: center;

  gap: ${cssVar('dimension-space-100')};

  list-style: none;
  padding: 0;
  margin: 0;
`;
StyledNavigationMenuRoot.displayName = 'StyledNavigationMenuRoot';
