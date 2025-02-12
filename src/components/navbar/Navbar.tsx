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

import { forwardRef } from 'react';
import styled from '@emotion/styled';

const NavbarRoot = forwardRef<HTMLElement, React.PropsWithChildren>((props, ref) => {
  const { children } = props;

  return (
    <NavbarContainer aria-label="main navigation" ref={ref} {...props}>
      {children}
    </NavbarContainer>
  );
});

NavbarRoot.displayName = 'Navbar';

const NavbarContainer = styled.nav`
  height: 56px;
  display: flex;
  justify-content: space-between;
  min-width: 1280px; // needs to be replaced with a token?? will sync with Marcio
  align-items: center;

  padding: 0 var(--echoes-dimension-space-300) 0 var(--echoes-dimension-space-0);

  background-color: var(--echoes-color-background-default);
  border-bottom: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: var(--echoes-dimension-space-100);
`;
const NavbarRight = styled.div`
  display: flex;
  align-items: center;
  height: 100%;

  gap: var(--echoes-dimension-space-100);
`;

export const Navbar = Object.assign(NavbarRoot, {
  Left: NavbarLeft,
  Right: NavbarRight,
});
