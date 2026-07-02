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
import { matchers } from '@emotion/jest';
import { LayoutSidebarContext, type LayoutSidebarContextShape } from '../../LayoutSidebarContext';
import { cssVar } from '~utils/design-tokens';
import { SidebarNavigation } from '../SidebarNavigation';

expect.extend(matchers);

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

it('should snap the undocked sidebar width open without a transition', () => {
  const { container } = setupSidebarNavigation();
  const sidebarNavigationContainer = container.querySelector("[data-sidebar-navigation='true']");

  expect(sidebarNavigationContainer).not.toBeNull();
  expect(sidebarNavigationContainer).toHaveStyleRule('transition', 'none', {
    target: "[data-sidebar-docked='false']",
  });
});

it('should widen the layout column when the sidebar is docked or opened in non-dockable mode', () => {
  const { container } = setupSidebarNavigation();
  const sidebarNavigationContainer = container.querySelector("[data-sidebar-navigation='true']");
  const dockedSidebarWidth = new RegExp(
    `calc\\(\\s*${escapeRegExp(cssVar('layout-sidebar-navigation-sizes-width-open'))}\\s*\\+\\s*${escapeRegExp(
      cssVar('border-width-default'),
    )}\\s*\\)`,
  );

  expect(sidebarNavigationContainer).not.toBeNull();
  expect(sidebarNavigationContainer).toHaveStyleRule('width', dockedSidebarWidth, {
    target: "[data-sidebar-docked='true']",
  });
  expect(sidebarNavigationContainer).toHaveStyleRule('width', dockedSidebarWidth, {
    target: "[data-sidebar-is-dockable='false'][data-sidebar-open='true']",
  });
  expect(sidebarNavigationContainer).not.toHaveStyleRule('width', dockedSidebarWidth, {
    target: "[data-sidebar-is-dockable='true'][data-sidebar-open='true']",
  });
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setupSidebarNavigation(contextOverrides: Partial<LayoutSidebarContextShape> = {}) {
  const defaultLayoutSidebarContext: LayoutSidebarContextShape = {
    closeSidebar: jest.fn(),
    handleSidebarInteractionBoundaryBlur: jest.fn(),
    handleSidebarInteractionBoundaryMouseLeave: jest.fn(),
    hasSidebar: false,
    isSidebarDockable: true,
    isSidebarDocked: false,
    isSidebarOpen: false,
    openSidebar: jest.fn(),
    setHasSidebar: jest.fn(),
    setIsSidebarDocked: jest.fn(),
  };

  return renderWithMemoryRouter(
    <LayoutSidebarContext.Provider value={{ ...defaultLayoutSidebarContext, ...contextOverrides }}>
      <SidebarNavigation />
    </LayoutSidebarContext.Provider>,
  );
}
