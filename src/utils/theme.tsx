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

import { Slot } from '@radix-ui/react-slot';
import { PropsWithChildren, createContext } from 'react';
import { Theme } from '~generated/themes';

export const THEME_DATA_ATTRIBUTE = 'data-echoes-theme';

export function setTheme(theme: `${Theme}`) {
  document.documentElement.setAttribute(THEME_DATA_ATTRIBUTE, theme);
}

export interface ThemeProviderProps {
  asChild?: boolean;
  theme: `${Theme}`;
}

export function ThemeProvider({ asChild, theme, ...props }: PropsWithChildren<ThemeProviderProps>) {
  const Comp = asChild ? Slot : 'div';
  return (
    <ThemeContext.Provider value={theme}>
      <Comp {...{ [THEME_DATA_ATTRIBUTE]: theme }} {...props} />
    </ThemeContext.Provider>
  );
}
ThemeProvider.displayName = 'ThemeProvider';

export const ThemeContext = createContext<`${Theme}` | undefined>(undefined);
