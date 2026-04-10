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

// Vitest-compatible override of @emotion/jest types.
// The package's own .d.ts has `/// <reference types="jest" />` which fails
// when @types/jest is not installed. We only use createSerializer here.
declare module '@emotion/jest' {
  import type { SnapshotSerializer } from 'vitest';

  interface CreateSerializerOptions {
    classNameReplacer?: (className: string, index: number) => string;
    DOMElements?: boolean;
    includeStyles?: boolean;
  }

  export function createSerializer(options?: CreateSerializerOptions): SnapshotSerializer;

  export const matchers: any;
}
