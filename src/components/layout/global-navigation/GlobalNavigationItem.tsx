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

import * as radixNavigationMenu from '@radix-ui/react-navigation-menu';
import { forwardRef, ReactNode } from 'react';
import { LinkProps as RouterLinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { isDefined } from '~common/helpers/types';
import { LinkBaseStyled } from '../../links/LinkBaseStyled';
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
   * By default this behavior uses react-router-dom's URL matching utility.
   * Overriding this is only needed for complex scenarios.
   */
  isActive?: boolean;
  to: RouterLinkProps['to'];
}

export const GlobalNavigationItem = forwardRef<HTMLAnchorElement, GlobalNavigationItemProps>(
  (
    { children, className, isActive, to, ...otherProps }: Readonly<GlobalNavigationItemProps>,
    ref,
  ) => {
    const resolved = useResolvedPath(to);
    const match = useMatch(`${resolved.pathname}/*`);
    const active = isActive ?? isDefined(match);

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
