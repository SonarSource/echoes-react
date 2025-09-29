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

it('should render with active indicator', () => {
  setupWithContext(<GlobalNavigation.Item to="/">Take me home</GlobalNavigation.Item>);

  expect(screen.getByRole('link')).toHaveAttribute('data-active');
});

it('should render without active indicator', () => {
  setupWithContext(<GlobalNavigation.Item to="/elsewhere">Take me home</GlobalNavigation.Item>);

  expect(screen.getByRole('link')).not.toHaveAttribute('data-active');
});

it('should render with active indicator when forced', () => {
  setupWithContext(
    <GlobalNavigation.Item isActive to="/elsewhere">
      Take me home
    </GlobalNavigation.Item>,
  );

  expect(screen.getByRole('link')).toHaveAttribute('data-active');
});

it('should render without active indicator when forced', () => {
  setupWithContext(
    <GlobalNavigation.Item isActive={false} to="/">
      Take me home
    </GlobalNavigation.Item>,
  );

  expect(screen.getByRole('link')).not.toHaveAttribute('data-active');
});

const setupWithContext = (component: JSX.Element) => {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={['/']}>
      <Routes>
        <Route
          element={<GlobalNavigation.ItemsContainer>{component}</GlobalNavigation.ItemsContainer>}
          path="/"
        />
      </Routes>
    </MemoryRouter>,
  );
};
