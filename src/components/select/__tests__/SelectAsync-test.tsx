/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { SelectAsync } from '..';

const data = [
  { value: 'o-cheese', label: 'cheese' },
  { value: 'o-bread', label: 'bread' },
  { value: 'o-salad', label: 'salad' },
  { value: 'o-no', label: 'oh, no!' },
];

it('should behave as expected', async () => {
  const onChange = jest.fn();
  const onSearch = jest.fn();

  const { user, container } = render(
    <SelectAsync
      ariaLabel="select"
      data={data}
      onChange={onChange}
      onSearch={onSearch}
      value={undefined}
    />,
  );

  await user.click(screen.getByRole('combobox', { name: 'select' }));

  expect(screen.getByRole('listbox')).toBeInTheDocument();
  expect(screen.getAllByRole('option')).toHaveLength(4);

  await expect(container).toHaveNoA11yViolations();

  await user.type(screen.getByRole('combobox', { name: 'select' }), 'ad');

  expect(onSearch).toHaveBeenCalledTimes(3); // initial, 'a', and 'ad'
  expect(onSearch).toHaveBeenLastCalledWith('ad');

  onSearch.mockClear();

  await user.click(screen.getByRole('option', { name: 'salad' }));

  expect(onChange).toHaveBeenLastCalledWith('o-salad', data[2]);
  expect(onSearch).not.toHaveBeenCalled();
});
