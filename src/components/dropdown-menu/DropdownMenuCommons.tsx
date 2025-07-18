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

export const styleDropdownMenuOverlay = styled.div`
  background-color: var(--echoes-color-surface-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-dimension-space-100);
  box-shadow: var(--echoes-box-shadow-medium);
  box-sizing: border-box;
  margin: var(--echoes-dimension-space-50) 0;
  max-height: var(--radix-dropdown-menu-content-available-height);
  max-width: var(--echoes-sizes-overlays-max-width-default);
  min-width: var(--echoes-sizes-overlays-min-width-default);
  overflow-x: hidden;
  overflow-y: auto;
  padding: var(--echoes-dimension-space-50) var(--echoes-dimension-space-0);
`.withComponent;
