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
import { forwardRef, PropsWithChildren } from 'react';

import { cssVar } from '~utils/design-tokens';

export interface DisplayProps {
  as?: 'p' | 'span' | 'div';
  className?: string;
}

export const Display = forwardRef<HTMLSpanElement, PropsWithChildren<DisplayProps>>(
  (props, ref) => {
    const { children, ...restAndRadixProps } = props;

    return (
      <StyledDisplay ref={ref} {...restAndRadixProps}>
        {children}
      </StyledDisplay>
    );
  },
);
Display.displayName = 'Display';

const StyledDisplay = styled.span`
  font: ${cssVar('typography-display-default')};
  letter-spacing: ${cssVar('letter-spacing-decreased')};
  color: ${cssVar('color-text-strong')};
`;
StyledDisplay.displayName = 'StyledDisplay';
