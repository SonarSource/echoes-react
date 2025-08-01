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

import * as radixTooltip from '@radix-ui/react-tooltip';
import { PropsWithChildren } from 'react';

export interface TooltipProviderProps {
  delayDuration?: number;
}

const DEFAULT_TOOLTIP_DELAY_DURATION = 500;

export function TooltipProvider({
  children,
  delayDuration,
}: PropsWithChildren<TooltipProviderProps>) {
  return (
    <radixTooltip.Provider delayDuration={delayDuration ?? DEFAULT_TOOLTIP_DELAY_DURATION}>
      {children}
    </radixTooltip.Provider>
  );
}

TooltipProvider.displayName = 'TooltipProvider';
