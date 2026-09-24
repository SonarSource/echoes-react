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

import { fireEvent, screen } from '@testing-library/react';
import { render } from '~common/helpers/test-utils';
import { LayoutSidebarContext, type LayoutSidebarContextShape } from '../../LayoutSidebarContext';
import { GlobalNavigationPrimary } from '../GlobalNavigationPrimary';

it('should render correctly', () => {
  setupGlobalNavigationPrimary();

  expect(screen.getByText('Test')).toBeInTheDocument();
});

it('should display the sidebar dock button when the sidebar is dockable', async () => {
  const closeSidebar = jest.fn();
  const openSidebar = jest.fn();
  const setIsSidebarDocked = jest.fn();

  const { user } = setupGlobalNavigationPrimary({
    close: closeSidebar,
    isDockable: true,
    isDocked: false,
    isOpen: false,
    isInLayout: true,
    open: openSidebar,
    setIsDocked: setIsSidebarDocked,
  });

  expect(screen.getByRole('button', { name: 'Dock sidebar' })).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Dock sidebar' }));

  expect(setIsSidebarDocked).toHaveBeenCalled();
});

it('should display the sidebar open button when the sidebar is not dockable', async () => {
  const openSidebar = jest.fn();

  const { user } = setupGlobalNavigationPrimary({
    isDockable: false,
    isDocked: false,
    isOpen: false,
    isInLayout: true,
    open: openSidebar,
  });

  await user.click(screen.getByRole('button', { name: 'Open sidebar' }));

  expect(openSidebar).toHaveBeenCalled();
});

it('should not display a tooltip for the sidebar open button when the sidebar is not dockable', async () => {
  const { user } = setupGlobalNavigationPrimary({
    isDockable: false,
    isDocked: false,
    isOpen: false,
    isInLayout: true,
  });

  await user.hover(screen.getByRole('button', { name: 'Open sidebar' }));

  expect(screen.queryByRole('tooltip', { name: 'Open sidebar' })).not.toBeInTheDocument();
});

it('should open the undocked sidebar on trigger hover', async () => {
  const openSidebar = jest.fn();

  const { user } = setupGlobalNavigationPrimary({
    isDockable: true,
    isDocked: false,
    isOpen: false,
    isInLayout: true,
    open: openSidebar,
  });

  await user.hover(screen.getByRole('button', { name: 'Dock sidebar' }));

  expect(openSidebar).toHaveBeenCalled();
});

it('should not open the undocked sidebar when hovering the trigger area outside the button', () => {
  const openSidebar = jest.fn();

  setupGlobalNavigationPrimary({
    isDockable: true,
    isDocked: false,
    isOpen: false,
    isInLayout: true,
    open: openSidebar,
  });

  fireEvent.mouseEnter(screen.getByTestId('global-navigation-sidebar-trigger-area'));

  expect(openSidebar).not.toHaveBeenCalled();
});

it('should not render the sidebar trigger button when the sidebar does not exist', () => {
  setupGlobalNavigationPrimary();

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

function setupGlobalNavigationPrimary(contextOverrides: Partial<LayoutSidebarContextShape> = {}) {
  const defaultLayoutSidebarContext: LayoutSidebarContextShape = {
    close: jest.fn(),
    handleInteractionZoneBlur: jest.fn(),
    handleInteractionZoneMouseLeave: jest.fn(),
    isDockable: true,
    isDocked: false,
    isOpen: false,
    isInLayout: false,
    open: jest.fn(),
    setIsDocked: jest.fn(),
    setIsInLayout: jest.fn(),
    ignoreNextInteractionZoneBlur: jest.fn(),
  };

  return render(
    <LayoutSidebarContext.Provider value={{ ...defaultLayoutSidebarContext, ...contextOverrides }}>
      <GlobalNavigationPrimary>
        <div>Test</div>
      </GlobalNavigationPrimary>
    </LayoutSidebarContext.Provider>,
  );
}
