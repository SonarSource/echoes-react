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

import { Children, forwardRef, isValidElement, ReactNode, useMemo } from 'react';
import { isDefined } from '~common/helpers/types';
import { useEchoesRouter } from '../../echoes-router/EchoesRouterContext';
import { type EchoesTo } from '../../echoes-router/EchoesRouterTypes';
import { Button } from '../../buttons';
import { DropdownMenu } from '../../dropdown-menu';
import { DropdownMenuProps } from '../../dropdown-menu/DropdownMenu';
import { IconChevronDown } from '../../icons';
import { globalNavigationItemStyle, StyledNavMenuItem } from './GlobalNavigationItemStyles';

export interface GlobalNavigationDropdownItemProps extends DropdownMenuProps {
  className?: string;
  disableActiveHighlight?: boolean;
}

export const GlobalNavigationDropdownItem = forwardRef<
  HTMLButtonElement,
  GlobalNavigationDropdownItemProps
>(
  (
    {
      className,
      children,
      disableActiveHighlight,
      ...dropdownMenuProps
    }: Readonly<GlobalNavigationDropdownItemProps>,
    ref,
  ) => {
    const { matchPattern, usePathname } = useEchoesRouter();
    const pathname = usePathname();

    const active = useMemo(() => {
      return !disableActiveHighlight && isActive(pathname, dropdownMenuProps.items, matchPattern);
    }, [disableActiveHighlight, matchPattern, pathname, dropdownMenuProps.items]);

    return (
      <StyledNavMenuItem data-selected={active}>
        <DropdownMenu {...dropdownMenuProps}>
          <Button
            className={className}
            css={globalNavigationItemStyle}
            ref={ref}
            suffix={<IconChevronDown />}
            variety="default-ghost">
            {children}
          </Button>
        </DropdownMenu>
      </StyledNavMenuItem>
    );
  },
);
GlobalNavigationDropdownItem.displayName = 'GlobalNavigationDropdownItem';

// exported for tests
export function isActive(
  pathname: string,
  item: ReactNode,
  matchPattern: (to: string, pathname: string) => boolean,
) {
  if (isValidElement<{ children?: ReactNode; to?: EchoesTo }>(item)) {
    const itemPattern = patternFromTo(item.props?.to);

    if (isDefined(itemPattern) && matchPattern(itemPattern, pathname)) {
      return true;
    }

    const targets: Array<string | undefined> =
      Children.map(item.props.children, (child) => {
        return isValidElement<{ to?: EchoesTo }>(child)
          ? patternFromTo(child.props?.to)
          : undefined;
      }) ?? [];

    for (const target of targets) {
      if (isDefined(target) && matchPattern(target, pathname)) {
        return true;
      }
    }
  }

  return false;
}

function patternFromTo(to: EchoesTo | undefined) {
  if (!isDefined(to)) {
    return undefined;
  }

  if (typeof to === 'string') {
    return to;
  }

  return to.pathname;
}
