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

import { createContext, useContext } from 'react';
import { EchoesActiveOptions, EchoesRouterContextValue, EchoesTo } from './EchoesRouterTypes';

export const EchoesRouterContext = createContext<EchoesRouterContextValue | undefined>(undefined);

EchoesRouterContext.displayName = 'EchoesRouterContext';

export function useEchoesRouter() {
  const router = useContext(EchoesRouterContext);

  if (!router) {
    throw new Error('Echoes router is missing. Wrap the tree in EchoesProvider.');
  }

  return router;
}

export function useIsActive(to: EchoesTo, options?: EchoesActiveOptions) {
  const { useIsActive: useIsActiveFromRouter } = useEchoesRouter();

  return useIsActiveFromRouter(to, options);
}
