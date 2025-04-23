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

import designTokensThemed from '~generated/design-tokens-themed.json';

export type DesignTokens = keyof typeof designTokensThemed;

export type DesignTokensColors = {
  [K in DesignTokens]: K extends `echoes-color-${string}` ? K : never;
}[DesignTokens];

export type DesignTokensColorsIcons = {
  [K in DesignTokens]: K extends
    | `echoes-color-icon-${string}`
    | `echoes-severity-badge-colors-foreground-${string}-icon-${string}`
    ? K
    : never;
}[DesignTokens];

export type DesignTokensColorsText = {
  [K in DesignTokens]: K extends `echoes-color-text-${string}` ? K : never;
}[DesignTokens];
