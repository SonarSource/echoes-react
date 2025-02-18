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

export const StyledWrapper = styled.div`
  padding: var(--echoes-dimension-space-150) 0
    calc(var(--echoes-dimension-space-150) - var(--echoes-focus-border-width-default));

  border-bottom: var(--echoes-focus-border-width-default) solid transparent;

  &[data-selected='true'] {
    border-bottom-color: var(--echoes-color-border-accent);
  }
`;
StyledWrapper.displayName = 'StyledWrapper';

export const globalNavigationItemStyle = css`
  --hover: var(--echoes-color-text-default);

  display: block;

  padding: var(--echoes-dimension-space-75);
  border-radius: var(--echoes-border-radius-200);

  font: var(--echoes-typography-text-default-semi-bold);
  text-decoration-line: var(--echoes-text-decoration-none);

  /* Fixed height to avoid alignment issues */
  height: var(--echoes-dimension-height-500);
  min-height: var(--echoes-dimension-height-500);
  box-sizing: content-box;

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

  &:active {
    background-color: var(--echoes-color-background-default-active);
  }
`;
