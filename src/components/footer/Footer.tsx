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

export interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
}

export const FooterRoot = forwardRef<HTMLElement, Readonly<FooterProps>>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <FooterContainer ref={ref} {...rest}>
      {children}
    </FooterContainer>
  );
});

FooterRoot.displayName = 'Footer';

const FooterContainer = styled.footer`
  height: 42px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  padding: var(--echoes-dimension-space-150) var(--echoes-dimension-space-300);

  border-top: var(--echoes-border-width-default) solid var(--echoes-color-border-weak);
  min-width: 1280px;
`;
FooterContainer.displayName = 'FooterContainer';
