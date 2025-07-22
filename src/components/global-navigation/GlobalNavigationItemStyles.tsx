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
import * as radixNavigationMenu from '@radix-ui/react-navigation-menu';

import { cssVar } from '~utils/design-tokens';

export const StyledNavMenuItem = styled(radixNavigationMenu.Item)<{ 'data-selected': boolean }>`
  padding: ${cssVar('dimension-space-150')} 0
    calc(${cssVar('dimension-space-150')} - ${cssVar('focus-border-width-default')});

  border-bottom: ${cssVar('focus-border-width-default')} solid transparent;

  &[data-selected='true'] {
    border-bottom-color: ${cssVar('color-border-accent-default')};
  }
`;
StyledNavMenuItem.displayName = 'StyledNavMenuItem';

export const globalNavigationItemStyle = css`
  --hover: ${cssVar('color-text-default')};

  display: block;

  padding: ${cssVar('dimension-space-75')};
  border-radius: ${cssVar('border-radius-200')};

  font: ${cssVar('typography-text-default-semi-bold')};
  text-decoration-line: ${cssVar('text-decoration-none')};

  /* Fixed height to avoid alignment issues */
  height: ${cssVar('dimension-height-500')};
  min-height: ${cssVar('dimension-height-500')};
  box-sizing: content-box;

  &:hover {
    background-color: ${cssVar('color-surface-hover')};
  }

  &:active {
    background-color: ${cssVar('color-surface-active')};
  }
`;
