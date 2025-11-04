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

import { computePages } from '../utils';

describe('computePages', () => {
  it.each([
    [1, 1, ['1']],
    [3, 5, ['1', '2', '3', '4', '5']],
    [1, 6, ['1', '2', '3', 'ellipsis-high', '6']],
    [2, 6, ['1', '2', '3', '4', '5', '6']],
    [5, 6, ['1', '2', '3', '4', '5', '6']],
    [6, 6, ['1', 'ellipsis-low', '4', '5', '6']],
    [6, 6, ['1', 'ellipsis-low', '4', '5', '6']],
    [5, 11, ['1', '2', '3', '4', '5', '6', '7', 'ellipsis-high', '11']],
    [6, 11, ['1', 'ellipsis-low', '4', '5', '6', '7', '8', 'ellipsis-high', '11']],
    [7, 11, ['1', 'ellipsis-low', '5', '6', '7', '8', '9', '10', '11']],
  ])('should render correctly for page %s and total %s', (page, totalPages, expectation) => {
    expect(computePages({ page, totalPages })).toEqual(expectation);
  });
});
