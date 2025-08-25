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

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { truncate } from '~common/helpers/styles';
import { cssVar } from '~utils/design-tokens';

export const sidebarNavigationBaseItemStyles = css`
  all: unset;

  display: flex;
  align-items: center;
  gap: ${cssVar('dimension-space-100')};

  overflow: hidden;

  box-sizing: border-box;
  height: ${cssVar('dimension-height-800')};
  padding: ${cssVar('dimension-space-100')};
  border-radius: ${cssVar('border-radius-400')};

  flex-shrink: 0;

  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-default-regular')};

  cursor: pointer;

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &:focus-visible {
    outline: ${cssVar('color-focus-default')} solid ${cssVar('focus-border-width-default')};
    outline-offset: ${cssVar('focus-border-offset-default')};
    border-radius: ${cssVar('border-radius-400')};
  }
`;

export const SidebarNavigationItemLabel = styled.span`
  flex: 1 1 auto;

  ${truncate}
`;
SidebarNavigationItemLabel.displayName = 'SidebarNavigationItemLabel';

export const sidebarNavigationItemIconStyles = css`
  color: ${cssVar('color-icon-subtle')};
  font-size: ${cssVar('font-size-30')};
`;

export const sidebarNavigationContentStyles = css`
  display: flex;
  flex-direction: column;
  gap: ${cssVar('dimension-space-50')};

  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-100')};
`;

export const SidebarNavigationFooter = styled.div`
  ${sidebarNavigationContentStyles}
`;
SidebarNavigationFooter.displayName = 'SidebarNavigationFooter';

export const UnstyledListItem = styled.li`
  all: unset;
`;
UnstyledListItem.displayName = 'UnstyledListItem';

export const UnstyledUList = styled.ul`
  all: unset;
`;
UnstyledUList.displayName = 'UnstyledUList';
