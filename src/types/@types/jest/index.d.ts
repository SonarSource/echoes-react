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

// Minimal jest namespace stub to satisfy @emotion/jest's
// `/// <reference types="jest" />` without installing @types/jest
// (which would conflict with vitest/globals).
declare namespace jest {
  // Used by @emotion/jest's SnapshotSerializerPlugin extraction
  interface SnapshotSerializerPlugin {
    serialize: (...args: any[]) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
  // Used by @emotion/jest's EmotionMatchers extends
  interface ExpectExtendMap {
    [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  }
}
