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
import type { AxeResults, RunOptions } from 'axe-core';
import { axe } from 'vitest-axe';

// vitest-axe exports toHaveNoViolations as a value at runtime but only as a type in its .d.ts
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { toHaveNoViolations } = require('vitest-axe/matchers') as {
  toHaveNoViolations: (results: AxeResults) => { pass: boolean; message: () => string };
};

expect.extend({
  async toHaveNoViolations(received: Element, axeOptions?: RunOptions) {
    const result = await axe(received, axeOptions);
    return toHaveNoViolations(result);
  },
});
