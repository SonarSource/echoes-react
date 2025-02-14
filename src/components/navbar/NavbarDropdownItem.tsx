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

import { Children, forwardRef, isValidElement, ReactNode, useMemo } from 'react';
import { matchPath, useLocation } from 'react-router-dom';
import { isDefined } from '~common/helpers/types';
import { Button } from '../buttons';
import { DropdownMenu } from '../dropdown-menu';
import { DropdownMenuProps } from '../dropdown-menu/DropdownMenu';
import { IconChevronDown } from '../icons';
import { navbarItemStyle, StyledWrapper } from './NavbarItemStyles';

export interface NavbarDropdownItemProps extends DropdownMenuProps {
  className?: string;
}

// exported for tests
export function isActive(pathname: string, item: ReactNode) {
  if (isValidElement(item)) {
    if (isDefined(item.props?.to) && matchPath(item.props.to, pathname) !== null) {
      return true;
    }

    const targets: Array<string | undefined> = Children.map(item.props.children, (child) => {
      return child?.props?.to;
    });

    for (const target of targets) {
      if (isDefined(target) && matchPath(target, pathname) !== null) {
        return true;
      }
    }
  }

  return false;
}

export const NavbarDropdownItem = forwardRef<HTMLButtonElement, NavbarDropdownItemProps>(
  ({ className, children, ...dropdownMenuProps }: Readonly<NavbarDropdownItemProps>, ref) => {
    const { pathname } = useLocation();

    const active = useMemo(() => {
      return isActive(pathname, dropdownMenuProps.items);
    }, [pathname, dropdownMenuProps.items]);

    return (
      <DropdownMenu {...dropdownMenuProps}>
        <WrappedTrigger active={active} className={className} ref={ref}>
          {children}
        </WrappedTrigger>
      </DropdownMenu>
    );
  },
);
NavbarDropdownItem.displayName = 'NavbarDropdownItem';

type TriggerProps = Pick<NavbarDropdownItemProps, 'className' | 'children'> & { active: boolean };

const WrappedTrigger = forwardRef<HTMLButtonElement, TriggerProps>((props, ref) => {
  const { active, className, children, ...rest } = props;

  return (
    <StyledWrapper data-selected={active}>
      <Button
        className={className}
        css={navbarItemStyle}
        ref={ref}
        suffix={<IconChevronDown />}
        variety="default-ghost"
        {...rest}>
        {children}
      </Button>
    </StyledWrapper>
  );
});
WrappedTrigger.displayName = 'Wrapper';
