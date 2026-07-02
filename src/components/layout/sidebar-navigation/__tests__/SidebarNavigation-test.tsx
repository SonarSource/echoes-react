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

import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { LayoutContext, type LayoutContextShape } from '../../LayoutContext';
import { SidebarNavigation } from '../SidebarNavigation';

it('should have no a11y issues', async () => {
  const { container } = setupSidebarNavigation({
    hasSidebar: true,
    isSidebarDocked: true,
    isSidebarOpen: true,
  });

  await expect(container).toHaveNoA11yViolations();
});

it('should set the layout context correctly', () => {
  const setHasSidebar = jest.fn();

  const { unmount } = setupSidebarNavigation({
    hasSidebar: true,
    setHasSidebar,
  });

  expect(setHasSidebar).toHaveBeenCalledWith(true);

  unmount();

  expect(setHasSidebar).toHaveBeenCalledWith(false);
});

function setupSidebarNavigation(contextOverrides: Partial<LayoutContextShape> = {}) {
  const defaultLayoutContext: LayoutContextShape = {
    closeSidebar: jest.fn(),
    enterSidebarInteractionBoundary: jest.fn(),
    handleSidebarInteractionBoundaryBlur: jest.fn(),
    handleSidebarInteractionBoundaryExit: jest.fn(),
    hasSidebar: false,
    isSidebarDockable: true,
    isSidebarDocked: false,
    isSidebarOpen: false,
    isSidebarPointerInside: false,
    leaveSidebarInteractionBoundary: jest.fn(),
    openSidebar: jest.fn(),
    setHasSidebar: jest.fn(),
    setIsSidebarDocked: jest.fn(),
    setSidebarInteractionSafeAreaElement: jest.fn(),
  };

  return renderWithMemoryRouter(
    <LayoutContext.Provider value={{ ...defaultLayoutContext, ...contextOverrides }}>
      <SidebarNavigation />
    </LayoutContext.Provider>,
  );
}
