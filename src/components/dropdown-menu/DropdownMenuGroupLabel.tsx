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
import * as radixDropdownMenu from '@radix-ui/react-dropdown-menu';

import { cssVar } from '~utils/design-tokens';

export const DropdownMenuGroupLabel = styled(radixDropdownMenu.Label)`
  color: ${cssVar('color-text-default')};
  font: ${cssVar('typography-text-small-semi-bold')};
  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}
    ${cssVar('dimension-space-50')};
`;

DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';
