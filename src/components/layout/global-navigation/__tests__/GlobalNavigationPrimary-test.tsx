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
import { render } from '~common/helpers/test-utils';
import { LayoutSidebarContext, type LayoutSidebarContextShape } from '../../LayoutSidebarContext';
import { SIDEBAR_HANDOFF_ATTRIBUTE } from '../../LayoutSidebarInteraction';
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
    closeSidebar,
    hasSidebar: true,
    isSidebarDockable: true,
    isSidebarDocked: false,
    isSidebarOpen: false,
    openSidebar,
    setIsSidebarDocked,
  });

  expect(screen.getByRole('button', { name: 'Dock sidebar' })).toBeVisible();

  await user.click(screen.getByRole('button', { name: 'Dock sidebar' }));

  expect(setIsSidebarDocked).toHaveBeenCalled();
});

it('should display the sidebar open button when the sidebar is not dockable', async () => {
  const openSidebar = jest.fn();

  const { user } = setupGlobalNavigationPrimary({
    hasSidebar: true,
    isSidebarDockable: false,
    isSidebarDocked: false,
    isSidebarOpen: false,
    openSidebar,
  });

  await user.click(screen.getByRole('button', { name: 'Open sidebar' }));

  expect(openSidebar).toHaveBeenCalled();
});

it('should open the undocked sidebar on trigger hover', async () => {
  const openSidebar = jest.fn();

  const { user } = setupGlobalNavigationPrimary({
    hasSidebar: true,
    isSidebarDockable: true,
    isSidebarDocked: false,
    isSidebarOpen: false,
    openSidebar,
  });

  await user.hover(screen.getByRole('button', { name: 'Dock sidebar' }));

  expect(openSidebar).toHaveBeenCalled();
});

it('should attach the sidebar handoff surfaces to the trigger boundary', () => {
  setupGlobalNavigationPrimary({
    hasSidebar: true,
    isSidebarDockable: true,
    isSidebarDocked: false,
  });

  const triggerArea = screen.getByRole('button', { name: 'Dock sidebar' }).parentElement;
  const handoffs = triggerArea?.querySelectorAll(`[${SIDEBAR_HANDOFF_ATTRIBUTE}='true']`);

  expect(handoffs).toHaveLength(2);
});

it('should not render the sidebar trigger button when the sidebar does not exist', () => {
  setupGlobalNavigationPrimary();

  expect(screen.queryByRole('button')).not.toBeInTheDocument();
});

function setupGlobalNavigationPrimary(contextOverrides: Partial<LayoutSidebarContextShape> = {}) {
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

  return render(
    <LayoutSidebarContext.Provider value={{ ...defaultLayoutSidebarContext, ...contextOverrides }}>
      <GlobalNavigationPrimary>
        <div>Test</div>
      </GlobalNavigationPrimary>
    </LayoutSidebarContext.Provider>,
  );
}
