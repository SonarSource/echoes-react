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

/**
 * Context for providing CSP nonce value to components that need it.
 * This is used internally by Echoes components to access the nonce
 * configured in the EchoesProvider.
 */
export const NonceContext = createContext<string | undefined>(undefined);

/**
 * Hook to access the CSP nonce from the EchoesProvider.
 * Components that need to apply nonces to inline styles for CSP compliance
 * can use this hook to retrieve the globally configured nonce value.
 *
 * @returns The nonce string if configured, undefined otherwise
 */
export function useNonce(): string | undefined {
  return useContext(NonceContext);
}
