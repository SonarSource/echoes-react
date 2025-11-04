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
import { ComponentProps } from 'react';
import { render } from '~common/helpers/test-utils';
import { Popover } from '..';

it('appears when trigger is clicked and disappears when "esc" is hit', async () => {
  const { user } = setupPopover();

  expect(screen.queryByText('Header')).not.toBeInTheDocument();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('Header')).toBeInTheDocument();

  await user.keyboard('[escape]');

  expect(screen.queryByText('Header')).not.toBeInTheDocument();
});

it('displays all additional parts', async () => {
  const { user } = setupPopover({
    description: 'description',
    extraContent: 'extra content',
    footer: 'footer',
  });

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('description')).toBeInTheDocument();
  expect(screen.getByText('extra content')).toBeInTheDocument();
  expect(screen.getByText('footer')).toBeInTheDocument();
});

function setupPopover(props: Partial<ComponentProps<typeof Popover>> = {}) {
  return render(
    <Popover title="Header" {...props}>
      <button type="button">Trigger</button>
    </Popover>,
  );
}
