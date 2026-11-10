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

// Exposes ESLint core rules as an Oxlint JS plugin under the `eslint-js` alias.
// This preserves checks that have no native Oxlint equivalent without running the ESLint engine.
// Oxlint's plugin loader requires the default export.
import { builtinRules } from 'eslint/use-at-your-own-risk';

const eslintJs = { rules: Object.fromEntries(builtinRules) };
export { eslintJs as default };
