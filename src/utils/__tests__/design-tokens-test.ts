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

import { cssVar } from '../design-tokens';

describe('cssVar utility', () => {
  const SPACE_TOKEN = 'dimension-space-200';
  const FONT_TOKEN = 'font-family-sans';

  it('should generate CSS variable string without fallback', () => {
    expect(cssVar(SPACE_TOKEN)).toBe('var(--echoes-dimension-space-200)');
  });

  it('should generate CSS variable string with fallback', () => {
    expect(cssVar(SPACE_TOKEN, '1rem')).toBe('var(--echoes-dimension-space-200, 1rem)');
  });

  it('should handle different token types', () => {
    expect(cssVar('color-background-accent-default')).toBe(
      'var(--echoes-color-background-accent-default)',
    );
    expect(cssVar(FONT_TOKEN)).toBe('var(--echoes-font-family-sans)');
    expect(cssVar('border-radius-100')).toBe('var(--echoes-border-radius-100)');
  });

  it('should handle complex fallback values', () => {
    expect(cssVar(FONT_TOKEN, '"Inter", system-ui')).toBe(
      'var(--echoes-font-family-sans, "Inter", system-ui)',
    );
    expect(cssVar(SPACE_TOKEN, 'calc(1rem + 2px)')).toBe(
      'var(--echoes-dimension-space-200, calc(1rem + 2px))',
    );
    expect(cssVar('color-background-accent-default', 'rgb(0, 82, 204)')).toBe(
      'var(--echoes-color-background-accent-default, rgb(0, 82, 204))',
    );
  });

  it('should handle edge cases with fallback', () => {
    expect(cssVar('dimension-space-0', '')).toBe('var(--echoes-dimension-space-0)');
    expect(cssVar(SPACE_TOKEN, 'var(--custom-fallback)')).toBe(
      'var(--echoes-dimension-space-200, var(--custom-fallback))',
    );
  });

  it('should provide TypeScript type safety', () => {
    // @ts-expect-error : non-existent token
    cssVar('invalid-token-name');

    // @ts-expect-error : includes 'echoes-' prefix
    cssVar('echoes-dimension-space-200');

    // @ts-expect-error : typo in the token name
    cssVar('dimensio-height-600');

    // This test don't do anything during jest runtime but would break ts-check no ts error are
    // thrown in the previous examples
    expect(true).toBe(true);
  });
});
