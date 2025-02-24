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
import { forwardRef } from 'react';

export interface FooterExtraContentProps {
  className?: string;
  children: React.ReactNode;
}

export const FooterExtraContent = forwardRef<HTMLUListElement, Readonly<FooterExtraContentProps>>(
  (props, ref) => {
    const { children, ...rest } = props;

    return (
      <StyledFooterExtraContent ref={ref} {...rest}>
        {children}
      </StyledFooterExtraContent>
    );
  },
);

FooterExtraContent.displayName = 'FooterExtraContent';

const StyledFooterExtraContent = styled.ul`
  display: flex;
  align-items: center;
  list-style: none;
  gap: var(--echoes-dimension-space-100);
  flex-shrink: 0;

  font-size: var(--echoes-font-size-10);
  font-family: var(--echoes-font-family-mono);
  line-height: var(--echoes-line-height-10);
  letter-spacing: var(--echoes-letter-spacing-default);
`;
StyledFooterExtraContent.displayName = 'StyledFooterExtraContent';
