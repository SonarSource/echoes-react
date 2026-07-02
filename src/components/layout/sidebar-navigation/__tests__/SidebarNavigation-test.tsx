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
import { fireEvent, screen } from '@testing-library/react';
import { LayoutSidebarContext, type LayoutSidebarContextShape } from '../../LayoutSidebarContext';
import { cssVar } from '~utils/design-tokens';
import { SidebarNavigation } from '../SidebarNavigation';

expect.extend(matchers);

it('should have no a11y issues', async () => {
  const { container } = setupSidebarNavigation({
    isDocked: true,
    isOpen: true,
    isInLayout: true,
  });

  await expect(container).toHaveNoA11yViolations();
});

it('should set the layout context correctly', () => {
  const setIsInLayout = jest.fn();

  const { unmount } = setupSidebarNavigation({
    isInLayout: true,
    setIsInLayout,
  });

  expect(setIsInLayout).toHaveBeenCalledWith(true);

  unmount();

  expect(setIsInLayout).toHaveBeenCalledWith(false);
});

it('should snap the undocked sidebar width open without a transition', () => {
  setupSidebarNavigation();
  const sidebarNavigationContainer = screen.getByTestId('sidebar-navigation-container');

  expect(sidebarNavigationContainer).toHaveStyleRule('transition', 'none', {
    target: "[data-sidebar-docked='false']",
  });
});

it('should widen the layout column when the sidebar is docked or opened in non-dockable mode', () => {
  setupSidebarNavigation();
  const sidebarNavigationContainer = screen.getByTestId('sidebar-navigation-container');

  const dockedSidebarWidth = new RegExp(
    `calc\\(\\s*${escapeRegExp(cssVar('layout-sidebar-navigation-sizes-width-open'))}\\s*\\+\\s*${escapeRegExp(
      cssVar('border-width-default'),
    )}\\s*\\)`,
  );

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

it('should not request opening the sidebar again when it is already docked and open', () => {
  const openSidebar = jest.fn();

  setupSidebarNavigation({
    isDockable: true,
    isDocked: true,
    isOpen: true,
    isInLayout: true,
    open: openSidebar,
  });

  fireEvent.mouseEnter(screen.getByTestId('sidebar-navigation-container'));
  fireEvent.focus(screen.getByTestId('sidebar-navigation-wrapper'));

  expect(openSidebar).not.toHaveBeenCalled();
});

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function setupSidebarNavigation(contextOverrides: Partial<LayoutSidebarContextShape> = {}) {
  const defaultLayoutSidebarContext: LayoutSidebarContextShape = {
    close: jest.fn(),
    handleInteractionZoneBlur: jest.fn(),
    handleInteractionZoneMouseLeave: jest.fn(),
    isDockable: true,
    isDocked: false,
    isInLayout: false,
    isOpen: false,
    open: jest.fn(),
    setIsDocked: jest.fn(),
    setIsInLayout: jest.fn(),
    ignoreNextInteractionZoneBlur: jest.fn(),
  };

  return renderWithMemoryRouter(
    <LayoutSidebarContext.Provider value={{ ...defaultLayoutSidebarContext, ...contextOverrides }}>
      <SidebarNavigation />
    </LayoutSidebarContext.Provider>,
  );
}
