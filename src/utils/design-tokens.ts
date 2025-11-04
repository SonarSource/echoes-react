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

import { isStringDefined } from '~common/helpers/types';
import designTokensBase from '~generated/design-tokens-base.json';
import { DesignTokens, DesignTokensBase, WithoutEchoesPrefix } from '~types/design-tokens';

export type EchoesDesignTokens = WithoutEchoesPrefix<DesignTokens>;
export type EchoesCSSVarString = `var(--echoes-${EchoesDesignTokens})`;
export type EchoesCSSVarStringWithFallback = `var(--echoes-${EchoesDesignTokens}, ${string})`;

/**
 * Type-safe helper function to create CSS variable references for echoes design tokens.
 *
 * @param token - Design token name without the 'echoes-' prefix
 * @param fallback - Optional fallback value
 * @returns CSS variable string in the format: var(--echoes-{token}) or var(--echoes-{token}, {fallback})
 *
 * @example
 * ```tsx
 * // Basic usage
 * cssVar('dimension-height-600') // returns 'var(--echoes-dimension-height-600)'
 *
 * // With fallback
 * cssVar('dimension-height-600', '1.5rem') // returns 'var(--echoes-dimension-height-600, 1.5rem)'
 *
 * // In styled components
 * const Wrapper = styled.div`
 *   height: ${cssVar('dimension-height-600')};
 *   background: ${cssVar('color-background-accent-default')};
 * `;
 *
 * // In styled components with object syntax
 * const Wrapper = styled.div({
 *   height: cssVar('dimension-height-600'),
 *   background: cssVar('color-background-accent-default'),
 * });
 * ```
 */
export function cssVar(token: EchoesDesignTokens): EchoesCSSVarString;
export function cssVar(token: EchoesDesignTokens, fallback: string): EchoesCSSVarStringWithFallback;
export function cssVar(
  token: EchoesDesignTokens,
  fallback?: string,
): EchoesCSSVarString | EchoesCSSVarStringWithFallback {
  const variableName = `--echoes-${token}` as const;
  return isStringDefined(fallback) ? `var(${variableName}, ${fallback})` : `var(${variableName})`;
}

export type EchoesBaseDesignTokens = WithoutEchoesPrefix<DesignTokensBase>;

/**
 * Get the string value of a base Echoes design token.
 *
 * @param token - The design token to retrieve the value for.
 * @returns The value of the design token as a string.
 */
export function designToken(token: EchoesBaseDesignTokens): string {
  return designTokensBase[`echoes-${token}`].toString();
}
