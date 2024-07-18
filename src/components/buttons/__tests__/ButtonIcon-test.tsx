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
import { IconClock, IconPeople } from '../../icons';
import { ButtonIcon } from '../ButtonIcon';

it('should render and handle click', async () => {
  const onClick = jest.fn();
  const { user } = render(<ButtonIcon Icon={IconClock} aria-label="click me" onClick={onClick} />);

  expect(screen.queryByText('Loading...')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'click me' }));

  expect(onClick).toHaveBeenCalled();
});

it("should show a loading state, it doesn't prevent clicking", () => {
  render(<ButtonIcon Icon={IconPeople} aria-label="click me" isLoading />);

  expect(screen.getByText('Loading...')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'click me' })).toBeEnabled();
});
