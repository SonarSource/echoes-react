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
import { ReactNode, forwardRef } from 'react';
import { LinkProps as RouterLinkProps, useMatch, useResolvedPath } from 'react-router-dom';
import { isDefined } from '~common/helpers/types';
import { LinkBaseStyled } from '../links/LinkBaseStyled';

export interface NavbarItemProps extends RouterLinkProps {
  children: ReactNode;
  className?: string;
}

export const NavbarItem = forwardRef<HTMLAnchorElement, NavbarItemProps>(
  ({ children, ...linkProps }: Readonly<NavbarItemProps>, ref) => {
    const resolved = useResolvedPath(linkProps.to);
    const match = useMatch(resolved.pathname);
    const active = isDefined(match);

    return (
      <radixNavigationMenu.Link active={active} asChild>
        <WrappedLink active={active} ref={ref} {...linkProps}>
          {children}
        </WrappedLink>
      </radixNavigationMenu.Link>
    );
  },
);
NavbarItem.displayName = 'NavbarItem';

const WrappedLink = forwardRef<HTMLAnchorElement, NavbarItemProps & { active: boolean }>(
  (props, ref) => {
    const { children, active, ...rest } = props;

    return (
      <StyledWrapper css={active && { borderBottomColor: 'var(--echoes-color-border-accent);' }}>
        <StyledLink highlight="default" ref={ref} {...rest}>
          {children}
        </StyledLink>
      </StyledWrapper>
    );
  },
);
WrappedLink.displayName = 'Wrapper';

const StyledWrapper = styled.div`
  padding: var(--echoes-dimension-space-150) 0
    calc(var(--echoes-dimension-space-150) - var(--echoes-focus-border-width-default));

  border-bottom: var(--echoes-focus-border-width-default) solid transparent;
`;

const StyledLink = styled(LinkBaseStyled)`
  --hover: var(--echoes-color-text-default);

  display: block;

  padding: var(--echoes-dimension-space-75);
  border-radius: var(--echoes-border-radius-200);

  font: var(--echoes-typography-text-default-semi-bold);
  text-decoration-line: var(--echoes-text-decoration-none);

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

  &:active {
    background-color: var(--echoes-color-background-default-active);
  }
`;
