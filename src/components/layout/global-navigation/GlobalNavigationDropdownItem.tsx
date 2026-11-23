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
import { usePathname } from '~common/router/RouterContext';
import { isPathActive } from '~common/router/RouterUtils';
import { LinkTo } from '~types/RouterTypes';
import { Button } from '../../buttons';
import { DropdownMenu } from '../../dropdown-menu';
import { DropdownMenuProps } from '../../dropdown-menu/DropdownMenu';
import { IconChevronDown } from '../../icons';
import { globalNavigationItemStyle, StyledNavMenuItem } from './GlobalNavigationItemStyles';

export interface GlobalNavigationDropdownItemProps extends DropdownMenuProps {
  /** Class name applied to the dropdown trigger. */
  className?: string;
  /**
   * Disable active highlighting, including an explicit `isActive` override.
   * @defaultValue false
   */
  disableActiveHighlight?: boolean;
  /**
   * Override the dropdown's active state. When omitted, the dropdown is active when any
   * link is active, respecting each link's `isActive` and `isMatchingFullPath` props.
   * Links match their destination and descendant paths by default; use `isMatchingFullPath`
   * on a link to require an exact match. Only absolute destinations match automatically.
   */
  isActive?: boolean;
}

/**
 * A global navigation item that opens a dropdown menu.
 *
 * The trigger is highlighted when any link in `items` is active, including links inside
 * nested fragments. Links match their destination and descendant paths by default: a link
 * to `/profiles` also activates the dropdown on `/profiles/show`. Set `isMatchingFullPath`
 * on a `DropdownMenu.ItemLink` to require an exact path match. Only absolute destinations
 * are matched automatically; use `isActive` for relative or search-only destinations.
 *
 * Both the dropdown and its links accept `isActive` to override automatic matching,
 * including `isActive={false}` to force an inactive state. A dropdown override controls
 * only its trigger; it does not override the individual links. `disableActiveHighlight`
 * disables the trigger highlight even when `isActive` is `true`.
 *
 * @example
 * ```tsx
 * <Layout.GlobalNavigation.DropdownItem
 *   items={
 *     <>
 *       <DropdownMenu.ItemLink to="/profiles">Quality Profiles</DropdownMenu.ItemLink>
 *       <DropdownMenu.ItemLink isMatchingFullPath to="/coding_rules">
 *         Rules
 *       </DropdownMenu.ItemLink>
 *     </>
 *   }>
 *   Policies
 * </Layout.GlobalNavigation.DropdownItem>
 * ```
 */
export const GlobalNavigationDropdownItem = forwardRef<
  HTMLButtonElement,
  GlobalNavigationDropdownItemProps
>(
  (
    {
      className,
      children,
      disableActiveHighlight,
      isActive: isActiveOverride,
      ...dropdownMenuProps
    }: Readonly<GlobalNavigationDropdownItemProps>,
    ref,
  ) => {
    const pathname = usePathname();

    const active = useMemo(() => {
      return (
        !disableActiveHighlight && (isActiveOverride ?? isActive(pathname, dropdownMenuProps.items))
      );
    }, [disableActiveHighlight, isActiveOverride, pathname, dropdownMenuProps.items]);

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

/** @internal */
export function isActive(pathname: string, items: ReactNode): boolean {
  return Children.toArray(items).some((item) => {
    if (
      !isValidElement<{
        children?: ReactNode;
        isActive?: boolean;
        isMatchingFullPath?: boolean;
        to?: LinkTo;
      }>(item)
    ) {
      return false;
    }

    const { children, isActive: isActiveOverride, isMatchingFullPath = false, to } = item.props;

    if (isDefined(to)) {
      return isActiveOverride ?? isPathActive(pathname, to, { end: isMatchingFullPath });
    }

    return isActive(pathname, children);
  });
}
