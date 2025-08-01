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

import { cssVar } from '~utils/design-tokens';

export const styleDropdownMenuOverlay = styled.div`
  background-color: ${cssVar('color-surface-default')};
  border: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  border-radius: ${cssVar('dimension-space-100')};
  box-shadow: ${cssVar('box-shadow-medium')};
  box-sizing: border-box;
  margin: ${cssVar('dimension-space-50')} 0;
  max-height: var(--radix-dropdown-menu-content-available-height);
  max-width: ${cssVar('sizes-overlays-max-width-default')};
  min-width: ${cssVar('sizes-overlays-min-width-default')};
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${cssVar('dimension-space-50')} ${cssVar('dimension-space-0')};
`.withComponent;
