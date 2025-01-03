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

import { renderHook } from '@testing-library/react';
import {
  SelectParsedOption,
  SelectParsedOptionGroup,
  useSelectOptionFilter,
} from '../useSelectOptionFilter';

const data: SelectParsedOption[] = [
  { value: '1', label: 'One' },
  { value: '2', label: 'Two' },
  { value: '3', label: 'Three' },
  { value: '4', label: 'Four' },
];

const dataWithGroup: SelectParsedOption[] = [
  {
    group: 'Odd numbers',
    items: [
      { value: '1', label: 'One' },
      { value: '3', label: 'Three' },
    ],
  },
  {
    group: 'Even numbers',
    items: [
      { value: '2', label: 'Two' },
      { value: '4', label: 'Four' },
    ],
  },
];

it('should correctly filter select data', () => {
  const {
    result: { current: selectOptionFilter },
  } = renderHook(() => useSelectOptionFilter());

  expect(selectOptionFilter({ options: data, search: 'ee', limit: 10 })).toHaveLength(1);
  expect(selectOptionFilter({ options: data, search: 'o', limit: 10 })).toHaveLength(3);
  expect(selectOptionFilter({ options: data, search: 'o', limit: 1 })).toHaveLength(1);
});

it('should correctly filter select data with grouping', () => {
  const {
    result: { current: selectOptionFilter },
  } = renderHook(() => useSelectOptionFilter());

  let filtered = selectOptionFilter({ options: dataWithGroup, search: 'ee', limit: 10 });
  expect(filtered).toHaveLength(1);
  expect(filtered[0].group).toBe('Odd numbers');
  expect((filtered[0] as SelectParsedOptionGroup).items).toHaveLength(1);

  filtered = selectOptionFilter({ options: dataWithGroup, search: 'o', limit: 10 });
  expect(filtered).toHaveLength(2);
  expect(filtered[0].group).toBe('Odd numbers');
  expect(filtered[1].group).toBe('Even numbers');
  expect((filtered[0] as SelectParsedOptionGroup).items).toHaveLength(1);
  expect((filtered[1] as SelectParsedOptionGroup).items).toHaveLength(2);

  filtered = selectOptionFilter({ options: dataWithGroup, search: 'e', limit: 1 });
  expect(filtered).toHaveLength(1);
  expect(filtered[0].group).toBe('Odd numbers');
  expect((filtered[0] as SelectParsedOptionGroup).items).toHaveLength(1);
});
