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

import { createContext, Dispatch, SetStateAction } from 'react';

export interface LayoutSidebarContextShape {
  close: VoidFunction;
  handleInteractionZoneBlur: (relatedTarget: EventTarget | null) => void;
  handleInteractionZoneMouseLeave: (relatedTarget: EventTarget | null) => void;
  ignoreNextInteractionZoneBlur: VoidFunction;
  isDockable: boolean;
  isDocked: boolean;
  isInLayout: boolean;
  isOpen: boolean;
  open: VoidFunction;
  setIsDocked: Dispatch<SetStateAction<boolean>>;
  setIsInLayout: Dispatch<SetStateAction<boolean>>;
}

export const LayoutSidebarContext = createContext<LayoutSidebarContextShape>({
  close: () => {},
  handleInteractionZoneBlur: () => {},
  handleInteractionZoneMouseLeave: () => {},
  ignoreNextInteractionZoneBlur: () => {},
  isDockable: false,
  isDocked: false,
  isInLayout: false,
  isOpen: false,
  open: () => {},
  setIsDocked: () => {},
  setIsInLayout: () => {},
});
