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

import { screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { Pagination } from '../Pagination';

it('should render correctly', async () => {
  const { container } = render(<Pagination onChange={jest.fn()} page={6} totalPages={13} />);

  // current page, 2 neighbors on each side, first, last, previous and next
  expect(screen.getAllByRole('button')).toHaveLength(9);

  expect(screen.getByRole('button', { name: 'page 6' })).toHaveAttribute('aria-current', 'page');
  expect(screen.getByRole('button', { name: 'page 4' })).not.toHaveAttribute('aria-current');

  await expect(container).toHaveNoA11yViolations();
});

it.each([
  ['page 3', { page: 2, totalPages: 5 }, 3],
  ['Previous page', { page: 5, totalPages: 7 }, 4],
  ['Next page', { page: 5, totalPages: 7 }, 6],
])('should call onChange when the "%s" button is clicked', async (buttonLabel, props, expected) => {
  const onChange = jest.fn();
  const { user } = render(<Pagination onChange={onChange} {...props} />);

  await user.click(screen.getByRole('button', { name: buttonLabel }));

  expect(onChange).toHaveBeenCalledWith(expected);
});

it('should not allow to go to previous or next page', () => {
  render(<Pagination onChange={jest.fn()} page={1} totalPages={1} />);

  expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
});

it('should handle being disabled', () => {
  render(<Pagination isDisabled onChange={jest.fn()} page={6} totalPages={13} />);

  screen.getAllByRole('button').forEach((button) => expect(button).toBeDisabled());
});
