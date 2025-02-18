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

import { screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '~common/helpers/test-utils';
import { GlobalNavigation } from '..';
import { DropdownMenu } from '../../dropdown-menu';

it('should display links when dropdown is opened', async () => {
  const { user } = setupWithContext(
    <GlobalNavigation.DropdownItem
      items={
        <>
          <DropdownMenu.ItemLink to="/1">link 1</DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink to="/2">link 2</DropdownMenu.ItemLink>
        </>
      }>
      Moar!
    </GlobalNavigation.DropdownItem>,
  );

  expect(screen.queryAllByRole('menuitem')).toHaveLength(0);

  await user.click(screen.getByRole('button'));

  expect(screen.getAllByRole('menuitem')).toHaveLength(2);
});

const setupWithContext = (component: JSX.Element) => {
  return render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          element={<GlobalNavigation.ItemsContainer>{component}</GlobalNavigation.ItemsContainer>}
          path="/"
        />
      </Routes>
    </MemoryRouter>,
  );
};
