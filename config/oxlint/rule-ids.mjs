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

// Maps Oxlint diagnostic codes, including JS plugin aliases, to the previous ESLint rule IDs.
// SonarQube imports those IDs from the lint report; retaining them avoids treating existing
// findings as new rules after the migration, including React Hooks and TypeScript extension rules.

const ESLINT_PLUGIN_BY_OXLINT_PLUGIN = {
  eslint: '',
  'eslint-js': '',
  'import-js': 'import/',
  'jest-js': 'jest/',
  'jsx-a11y-js': 'jsx-a11y/',
  node: '',
  'promise-js': 'promise/',
  'react-js': 'react/',
  typescript: '@typescript-eslint/',
};

const REACT_HOOKS_RULES = new Set(['rules-of-hooks', 'exhaustive-deps']);

export function toEslintRuleId(code) {
  const ruleStart = code?.indexOf('(') ?? -1;
  if (ruleStart <= 0 || !code.endsWith(')')) {
    return null;
  }

  const plugin = code.slice(0, ruleStart);
  const rule = code.slice(ruleStart + 1, -1);

  if (plugin === 'eslint' && rule === 'no-useless-constructor') {
    return '@typescript-eslint/no-useless-constructor';
  }

  if (plugin === 'react' && REACT_HOOKS_RULES.has(rule)) {
    return `react-hooks/${rule}`;
  }

  return (ESLINT_PLUGIN_BY_OXLINT_PLUGIN[plugin] ?? plugin + '/') + rule;
}
