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

export const DropdownMenuSeparator = styled(radixDropdownMenu.Separator)`
  border-top: ${cssVar('border-width-default')} solid ${cssVar('color-border-weak')};
  box-sizing: border-box;
  margin: ${cssVar('dimension-space-25')} 0;
  width: 100%;
`;

DropdownMenuSeparator.displayName = 'DropdownMenu.Separator';
