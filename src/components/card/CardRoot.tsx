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
import React, { createContext } from 'react';

export enum CardSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  size?: CardSize;
}

const CardContext = createContext<CardSize>(CardSize.Medium);

export function useCardContext() {
  return React.useContext(CardContext);
}

export const CardRoot = React.forwardRef<HTMLDivElement, Readonly<CardProps>>(
  ({ children, className, size = CardSize.Medium }, ref) => (
    <CardContext.Provider value={size}>
      <CardStyled className={className} ref={ref}>
        {children}
      </CardStyled>
    </CardContext.Provider>
  ),
);

CardRoot.displayName = 'CardRoot';

const CardStyled = styled.div`
  border: 1px solid var(--echoes-color-border-weak);
  border-radius: var(--echoes-border-radius-400);
  box-shadow: var(--echoes-box-shadow-xsmall);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  height: 100%;
  min-width: 470px;
  width: 100%;
`;
