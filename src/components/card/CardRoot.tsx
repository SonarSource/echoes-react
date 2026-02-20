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

import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { CardSize } from './CardSize';
import { CardStyled } from './CardStyles';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  isCollapsible?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  size?: `${CardSize}`;
}

interface CardContextValue {
  isCollapsible: boolean;
  isOpen: boolean;
  onToggle: () => void;
  size: `${CardSize}`;
}

const CardContext = createContext<CardContextValue>({
  isCollapsible: false,
  isOpen: true,
  onToggle: () => undefined,
  size: CardSize.Medium,
});

export function useCardContext() {
  return React.useContext(CardContext);
}

export const CardRoot = React.forwardRef<HTMLDivElement, Readonly<CardProps>>(
  (
    {
      children,
      className,
      isCollapsible = false,
      isOpen,
      onOpenChange,
      size = CardSize.Medium,
      ...rest
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(isOpen ?? true);

    useEffect(() => {
      if (isOpen !== undefined) {
        setInternalOpen(isOpen);
      }
    }, [isOpen]);

    const handleToggle = useCallback(() => {
      const newOpen = !internalOpen;

      setInternalOpen(newOpen);
      onOpenChange?.(newOpen);
    }, [internalOpen, onOpenChange]);

    const contextValue = useMemo(
      () => ({ isCollapsible, isOpen: internalOpen, onToggle: handleToggle, size }),
      [handleToggle, isCollapsible, internalOpen, size],
    );

    return (
      <CardContext.Provider value={contextValue}>
        <CardStyled className={className} ref={ref} {...rest}>
          {children}
        </CardStyled>
      </CardContext.Provider>
    );
  },
);

CardRoot.displayName = 'CardRoot';
