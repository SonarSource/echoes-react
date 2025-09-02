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
import { render } from '~common/helpers/test-utils';
import { LayoutContext } from '../../LayoutContext';
import { GlobalNavigationPrimary } from '../GlobalNavigationPrimary';

it('should render correctly', () => {
  render(
    <GlobalNavigationPrimary>
      <div>Test</div>
    </GlobalNavigationPrimary>,
  );

  expect(screen.getByText('Test')).toBeInTheDocument();
});

it('should display the sidebar dock button when the sidebar is dockable', async () => {
  const setIsSidebarDocked = jest.fn();
  const { user } = render(
    <LayoutContext.Provider
      value={{
        hasSidebar: true,
        isSidebarDocked: false,
        setHasSidebar: jest.fn(),
        setIsSidebarDocked,
      }}>
      <div data-sidebar-exist="true" data-sidebar-is-dockable="true">
        <GlobalNavigationPrimary>
          <div>Test</div>
        </GlobalNavigationPrimary>
      </div>
    </LayoutContext.Provider>,
  );

  expect(screen.getByRole('button', { name: 'Dock sidebar' })).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Dock sidebar' }));

  expect(setIsSidebarDocked).toHaveBeenCalled();
});

it('should not have the sidebar dock button when the sidebar does not exist', () => {
  render(
    <GlobalNavigationPrimary>
      <div>Test</div>
    </GlobalNavigationPrimary>,
  );

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

it('should not have the sidebar dock button when the sidebar exist but is not dockable', () => {
  render(
    <div data-sidebar-exist="true" data-sidebar-is-dockable="false">
      <GlobalNavigationPrimary>
        <div>Test</div>
      </GlobalNavigationPrimary>
    </div>,
  );

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});
