/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import { forwardRef, ReactNode } from 'react';

import { cssVar } from '~utils/design-tokens';

export interface DropdownMenuGroupLabelProps extends radixDropdownMenu.DropdownMenuLabelProps {
  /**
   * Optional content to display at the end of the group label element.
   */
  suffix?: ReactNode;
}

export const DropdownMenuGroupLabel = forwardRef<HTMLDivElement, DropdownMenuGroupLabelProps>(
  (props, ref) => {
    const { children, suffix, ...rest } = props;

    return (
      <StyledDropdownMenuGroupLabel ref={ref} {...rest}>
        {children}

        {suffix}
      </StyledDropdownMenuGroupLabel>
    );
  },
);

DropdownMenuGroupLabel.displayName = 'DropdownMenuGroupLabel';

const StyledDropdownMenuGroupLabel = styled(radixDropdownMenu.Label)`
  align-items: center;
  color: ${cssVar('color-text-default')};
  display: flex;
  font: ${cssVar('typography-text-small-semi-bold')};
  justify-content: space-between;

  padding: ${cssVar('dimension-space-100')} ${cssVar('dimension-space-150')}
    ${cssVar('dimension-space-50')};
`;

StyledDropdownMenuGroupLabel.displayName = 'StyledDropdownMenuGroupLabel';
