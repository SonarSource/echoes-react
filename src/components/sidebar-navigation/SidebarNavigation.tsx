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
import { forwardRef, PropsWithChildren, useState } from 'react';
import { cssVar } from '~utils/design-tokens';
import { ButtonIcon } from '../buttons';
import { IconExpand } from '../icons';

interface SidebarNavigationProps {}

export const SidebarNavigation = forwardRef<
  HTMLDivElement,
  PropsWithChildren<SidebarNavigationProps>
>((props, ref) => {
  const { children } = props;
  const [collapsed, setCollapsed] = useState(false);

  return (
    <SidebarNavigationWrapper
      css={{
        '--sidebar-nav-width': collapsed ? '32px' : '224px',
      }}
      data-sidebar-collapsed={collapsed}
      ref={ref}>
      {children}
      <ButtonIcon
        Icon={IconExpand}
        ariaLabel="toggle"
        onClick={() => {
          setCollapsed((s) => !s);
        }}
      />
    </SidebarNavigationWrapper>
  );
});

SidebarNavigation.displayName = 'SidebarNavigation';

const SidebarNavigationWrapper = styled.div`
  width: var(--sidebar-nav-width);
  border: 1px solid black;
  overflow: hidden;
  padding: ${cssVar('dimension-space-100')};
  display: flex;
  flex-direction: column;

  transition: width 0.1s;
`;
