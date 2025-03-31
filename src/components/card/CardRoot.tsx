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

import React, { createContext } from 'react';
import { CardSize, CardStyled } from './CardStyles';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  size?: CardSize;
}

const CardContext = createContext<CardSize>(CardSize.Medium);

export function useCardSize() {
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
