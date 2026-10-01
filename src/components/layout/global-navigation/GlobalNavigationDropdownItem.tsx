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
import { Button } from '../../buttons';
import { DropdownMenu } from '../../dropdown-menu';
import { DropdownMenuProps } from '../../dropdown-menu/DropdownMenu';
import { IconChevronDown } from '../../icons';
import { usePathname } from '../../router/RouterContext';
import { LinkTo } from '../../router/RouterTypes';
import { isPathActive } from '../../router/RouterUtils';
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
    const pathname = usePathname();

    const active = useMemo(() => {
      return !disableActiveHighlight && isActive(pathname, dropdownMenuProps.items);
    }, [disableActiveHighlight, pathname, dropdownMenuProps.items]);

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
export function isActive(pathname: string, item: ReactNode) {
  if (isValidElement<{ children?: ReactNode; to?: LinkTo }>(item)) {
    if (isDefined(item.props?.to) && isPathActive(pathname, item.props.to, { end: true })) {
      return true;
    }

    const targets: Array<LinkTo | undefined> =
      Children.map(item.props.children, (child) => {
        return isValidElement<{ to?: LinkTo }>(child) ? child?.props?.to : undefined;
      }) ?? [];

    for (const target of targets) {
      if (isDefined(target) && isPathActive(pathname, target, { end: true })) {
        return true;
      }
    }
  }

  return false;
}
