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

import { act, fireEvent, screen } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import { Layout } from '..';
import { render } from '../../../common/helpers/test-utils';
import { LayoutContext } from '../LayoutContext';

const mediaQueryListMock = {
  matches: true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock matchMedia globally
Object.defineProperty(globalThis, 'matchMedia', {
  writable: true,
  value: jest.fn().mockReturnValue(mediaQueryListMock),
});

beforeEach(() => {
  jest.clearAllMocks();
  mediaQueryListMock.matches = true;
});

it('should render correctly', () => {
  const { container } = render(<Layout>content</Layout>);

  expect(container.childNodes[0]).toHaveStyle({ height: '100vh', width: '100vw' });
  expect(screen.getByText('content')).toHaveStyle({ display: 'grid' });
});

describe('Layout Sidebar docking behavior', () => {
  it('should add and remove media query event listener', () => {
    const { unmount } = render(
      <Layout>
        <div>Test</div>
      </Layout>,
    );

    expect(mediaQueryListMock.addEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );

    unmount();

    expect(mediaQueryListMock.removeEventListener).toHaveBeenCalledWith(
      'change',
      expect.any(Function),
    );
  });

  it('should handle media query changes and update dockable state', () => {
    render(
      <Layout data-testid="layout">
        <TestContextConsumer hasSidebarDefault />
      </Layout>,
    );

    // Initially should be docked (wide screen initializes isSidebarDocked to true)
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-is-dockable', 'true');
    expect(screen.getByText('isSidebarDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isSidebarOpen:true')).toBeInTheDocument();

    // Simulate media query change to narrow screen
    act(() => {
      const changeHandler = mediaQueryListMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: false });
    });

    // Context should be re-rendered, so we need to check current state
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'false');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-is-dockable', 'false');

    // Context should remember last user choice
    expect(screen.getByText('isSidebarDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isSidebarOpen:false')).toBeInTheDocument();
  });
});

describe('LayoutContext', () => {
  it('should update LayoutContext state when it changes', async () => {
    const onSidebarDockedChange = jest.fn();

    const { user } = render(
      <Layout onSidebarDockedChange={onSidebarDockedChange}>
        <TestContextConsumer />
      </Layout>,
    );

    expect(screen.getByText('hasSidebar:false')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Set Sidebar' }));
    expect(screen.getByText('hasSidebar:true')).toBeInTheDocument();
    expect(screen.getByText('isSidebarDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isSidebarOpen:true')).toBeInTheDocument();
    expect(onSidebarDockedChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole('button', { name: 'Unset Docked' }));
    expect(screen.getByText('isSidebarDocked:false')).toBeInTheDocument();
    expect(screen.getByText('isSidebarOpen:false')).toBeInTheDocument();
    expect(onSidebarDockedChange).toHaveBeenLastCalledWith(false);
  });

  it('should respect isSidebarInitiallyDocked prop when its present', () => {
    render(
      <Layout isSidebarInitiallyDocked={false}>
        <TestContextConsumer hasSidebarDefault />
      </Layout>,
    );

    expect(screen.getByText('hasSidebar:true')).toBeInTheDocument();
    expect(screen.getByText('isSidebarDocked:false')).toBeInTheDocument();
    expect(screen.getByText('isSidebarOpen:false')).toBeInTheDocument();
  });

  it('should open the non-dockable sidebar from the trigger button', async () => {
    mediaQueryListMock.matches = false;

    const { user } = setupLayoutWithSidebar();

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');

    await user.click(screen.getByRole('button', { name: 'Open sidebar' }));

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
  });

  it('should open and close the non-dockable sidebar on trigger hover', async () => {
    mediaQueryListMock.matches = false;

    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Open sidebar' });

    await user.hover(trigger);

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.unhover(trigger);

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should keep the undocked sidebar open while focus remains inside', async () => {
    const { user } = setupLayoutWithSidebar({ isSidebarInitiallyDocked: false });

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');

    await user.tab();
    expect(screen.getByRole('button', { name: 'Dock sidebar' })).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.tab();
    expect(screen.getByRole('button', { name: 'Sidebar header' })).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.tab();
    expect(screen.getByRole('button', { name: 'Page content action' })).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should hide the sidebar when undocking it on dockable screens', async () => {
    const { user } = setupLayoutWithSidebar();

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.click(screen.getByRole('button', { name: 'Undock sidebar' }));

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'false');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should close the undocked sidebar on pointer exit after pointer undocking', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });

    await user.click(trigger);

    expect(trigger).not.toHaveFocus();

    await user.unhover(trigger);

    await user.hover(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.unhover(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should keep the undocked sidebar open while the pointer stays within the projected sidebar column', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });

    mockSidebarInteractionSafeArea();

    await user.click(trigger);

    fireEvent.mouseOver(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(trigger, { clientX: 120, relatedTarget: null });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseMove(globalThis.document, { clientX: 120 });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseMove(globalThis.document, { clientX: 260 });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should close the undocked sidebar once the pointer leaves beyond the projected sidebar column', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });

    mockSidebarInteractionSafeArea();

    await user.click(trigger);

    fireEvent.mouseOver(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(trigger, { clientX: 260, relatedTarget: null });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should keep the undocked sidebar open when undocking it with the keyboard', async () => {
    const { user } = setupLayoutWithSidebar();

    await user.tab();

    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });
    expect(trigger).toHaveFocus();

    await user.keyboard('{Enter}');

    expect(screen.getByRole('button', { name: 'Dock sidebar' })).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'false');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
  });

  it('should dock the sidebar when the trigger button is clicked on dockable screens', async () => {
    const { user } = setupLayoutWithSidebar({ isSidebarInitiallyDocked: false });

    await user.click(screen.getByRole('button', { name: 'Dock sidebar' }));

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
  });
});

function TestContextConsumer({ hasSidebarDefault }: { hasSidebarDefault?: boolean }) {
  const context = useContext(LayoutContext);

  useEffect(() => {
    if (hasSidebarDefault !== undefined) {
      context.setHasSidebar(hasSidebarDefault);
    }
  }, [context, hasSidebarDefault]);

  return (
    <div>
      <div>{`hasSidebar:${context.hasSidebar.toString()}`}</div>

      <div>{`isSidebarDocked:${context.isSidebarDocked.toString()}`}</div>

      <div>{`isSidebarOpen:${context.isSidebarOpen.toString()}`}</div>

      <button onClick={() => context.setHasSidebar(true)} type="button">
        Set Sidebar
      </button>

      <button onClick={() => context.setIsSidebarDocked(true)} type="button">
        Set Docked
      </button>

      <button onClick={() => context.setHasSidebar(false)} type="button">
        Unset Sidebar
      </button>

      <button onClick={() => context.setIsSidebarDocked(false)} type="button">
        Unset Docked
      </button>
    </div>
  );
}

function setupLayoutWithSidebar({
  isSidebarInitiallyDocked,
}: {
  isSidebarInitiallyDocked?: boolean;
} = {}) {
  return render(
    <Layout data-testid="layout" isSidebarInitiallyDocked={isSidebarInitiallyDocked}>
      <Layout.GlobalNavigation>
        <Layout.GlobalNavigation.Primary>
          <div>Brand</div>
        </Layout.GlobalNavigation.Primary>
      </Layout.GlobalNavigation>

      <Layout.SidebarNavigation>
        <Layout.SidebarNavigation.Header isInteractive name="Sidebar header" />
      </Layout.SidebarNavigation>

      <Layout.ContentGrid>
        <button type="button">Page content action</button>
      </Layout.ContentGrid>
    </Layout>,
  );
}

function mockSidebarInteractionSafeArea({
  left = 0,
  width = 240,
}: {
  left?: number;
  width?: number;
} = {}) {
  const sidebarNavigation = screen.getByRole('navigation', {
    hidden: true,
    name: 'Secondary navigation',
  });

  Object.defineProperty(sidebarNavigation, 'offsetWidth', {
    configurable: true,
    get: () => width,
  });

  jest.spyOn(sidebarNavigation, 'getBoundingClientRect').mockReturnValue({
    bottom: 0,
    height: 0,
    left,
    right: left + width,
    toJSON: () => '',
    top: 0,
    width,
    x: left,
    y: 0,
  });
}
