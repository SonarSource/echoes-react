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

import * as radixNavigationMenu from '@radix-ui/react-navigation-menu';
import { forwardRef, ReactNode } from 'react';
import { LinkBaseStyled } from '../../links/LinkBaseStyled';
import { useIsPathActive } from '../../router/RouterContext';
import { LinkTo } from '../../router/RouterTypes';
import { globalNavigationItemStyle, StyledNavMenuItem } from './GlobalNavigationItemStyles';

export interface GlobalNavigationItemProps {
  /**
   * The label of the GlobalNavigationItem.
   * It can be a string or a JSX.Element, in the case of a JSX.Element it should not be wrapped in
   * a `<Text>` component, the GlobalNavigationItem already handles the typography styling for you.
   */
  children: ReactNode;
  className?: string;
  /**
   * Control whether the GlobalNavigationItem is active or not.
   * If true, the item will have a different style to indicate it is active.
   *
   * By default the item is active when the current pathname matches `to` or one of its
   * descendants. Only absolute destinations are matched automatically.
   * Overriding this is only needed for complex scenarios.
   */
  isActive?: boolean;
  to: LinkTo;
}

export const GlobalNavigationItem = forwardRef<HTMLAnchorElement, GlobalNavigationItemProps>(
  (
    { children, className, isActive, to, ...otherProps }: Readonly<GlobalNavigationItemProps>,
    ref,
  ) => {
    const isRouteActive = useIsPathActive(to);
    const active = isActive ?? isRouteActive;

    return (
      <StyledNavMenuItem data-selected={active}>
        <radixNavigationMenu.Link active={active} asChild>
          <LinkBaseStyled
            css={globalNavigationItemStyle}
            highlight="default"
            ref={ref}
            to={to}
            {...otherProps}>
            {children}
          </LinkBaseStyled>
        </radixNavigationMenu.Link>
      </StyledNavMenuItem>
    );
  },
);
GlobalNavigationItem.displayName = 'GlobalNavigationItem';
