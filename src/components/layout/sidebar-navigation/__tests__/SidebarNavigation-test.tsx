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

import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { LayoutContext } from '../../LayoutContext';
import { SidebarNavigation } from '../SidebarNavigation';

it('should have no a11y issues', async () => {
  const { container } = renderWithMemoryRouter(<SidebarNavigation />);

  await expect(container).toHaveNoA11yViolations();
});

it('should set the layout context correctly', () => {
  const setHasSidebar = jest.fn();
  const { unmount } = renderWithMemoryRouter(
    <LayoutContext.Provider
      value={{
        hasSidebar: true,
        isSidebarDocked: false,
        setHasSidebar,
        setIsSidebarDocked: jest.fn(),
      }}>
      <SidebarNavigation />
    </LayoutContext.Provider>,
  );

  expect(setHasSidebar).toHaveBeenCalledWith(true);

  unmount();

  expect(setHasSidebar).toHaveBeenCalledWith(false);
});
