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

import { matchers } from '@emotion/jest';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import { isDefined } from '~common/helpers/types';
import { Layout } from '..';
import { render, renderWithMemoryRouter } from '../../../common/helpers/test-utils';
import { LayoutSidebarContext } from '../LayoutSidebarContext';

expect.extend(matchers);

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
        <TestContextConsumer isSidebarInLayoutDefault />
      </Layout>,
    );

    // Initially should be docked (wide screen initializes isSidebarDocked to true)
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-is-dockable', 'true');
    expect(screen.getByText('isDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isOpen:true')).toBeInTheDocument();

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
    expect(screen.getByText('isDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isOpen:false')).toBeInTheDocument();
  });

  it('should absolutely position the top interaction zone so it does not size the sidebar column', () => {
    render(
      <Layout>
        <div>Test</div>
      </Layout>,
    );

    const topInteractionZone = screen.getByTestId('sidebar-top-interaction-zone');

    expect(topInteractionZone).toHaveStyleRule('position', 'absolute');
    expect(topInteractionZone).toHaveStyleRule('inset', '0');
  });
});

describe('LayoutSidebarContext', () => {
  it('should update LayoutSidebarContext state when it changes', async () => {
    const onSidebarDockedChange = jest.fn();

    const { user } = render(
      <Layout onSidebarDockedChange={onSidebarDockedChange}>
        <TestContextConsumer />
      </Layout>,
    );

    expect(screen.getByText('isInLayout:false')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Set Sidebar' }));
    expect(screen.getByText('isInLayout:true')).toBeInTheDocument();
    expect(screen.getByText('isDocked:true')).toBeInTheDocument();
    expect(screen.getByText('isOpen:true')).toBeInTheDocument();
    expect(onSidebarDockedChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole('button', { name: 'Unset Docked' }));
    expect(screen.getByText('isDocked:false')).toBeInTheDocument();
    expect(screen.getByText('isOpen:false')).toBeInTheDocument();
    expect(onSidebarDockedChange).toHaveBeenLastCalledWith(false);
  });

  it('should respect isSidebarInitiallyDocked prop when it is provided', () => {
    render(
      <Layout isSidebarInitiallyDocked={false}>
        <TestContextConsumer isSidebarInLayoutDefault />
      </Layout>,
    );

    expect(screen.getByText('isInLayout:true')).toBeInTheDocument();
    expect(screen.getByText('isDocked:false')).toBeInTheDocument();
    expect(screen.getByText('isOpen:false')).toBeInTheDocument();
  });

  it('should open the non-dockable sidebar from the trigger button', async () => {
    mediaQueryListMock.matches = false;

    const { user } = setupLayoutWithSidebar();

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');

    await user.click(screen.getByRole('button', { name: 'Open sidebar' }));

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
  });

  it('should close the non-dockable sidebar on focus exit after a pointer-open that does not focus the trigger', async () => {
    mediaQueryListMock.matches = false;

    setupLayoutWithSidebar();

    const trigger = screen.getByRole('button', { name: 'Open sidebar' });
    const homeLink = screen.getByRole('link', { name: 'Brand home' });
    const pageContentButton = screen.getByRole('button', { name: 'Page content action' });

    fireEvent.click(trigger, { detail: 1 });

    expect(trigger).not.toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    act(() => {
      homeLink.focus();
    });

    act(() => {
      pageContentButton.focus();
    });

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
    });
  });

  it('should close the non-dockable sidebar on pointer exit after opening it from the trigger button', async () => {
    mediaQueryListMock.matches = false;

    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Open sidebar' });

    await user.click(trigger);

    expect(trigger).not.toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.unhover(trigger);

    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
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

    const sidebarHeaderButton = getSidebarHeaderButton();

    act(() => {
      sidebarHeaderButton.focus();
    });

    expect(sidebarHeaderButton).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    act(() => {
      screen.getByRole('button', { name: 'Page content action' }).focus();
    });

    expect(screen.getByRole('button', { name: 'Page content action' })).toHaveFocus();

    await waitFor(() => {
      expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
    });
  });

  it('should keep the non-dockable sidebar open when opening it with the keyboard', async () => {
    mediaQueryListMock.matches = false;

    const { user } = setupLayoutWithSidebar();

    await user.tab();

    const trigger = screen.getByRole('button', { name: 'Open sidebar' });
    expect(trigger).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    await user.keyboard('{Enter}');

    expect(trigger).toHaveFocus();
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
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

  it('should keep the undocked sidebar open while moving from the trigger to the home area', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });
    const homeLink = screen.getByRole('link', { name: 'Brand home' });

    await user.click(trigger);

    fireEvent.mouseOver(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(trigger, { relatedTarget: homeLink });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(homeLink, { relatedTarget: null });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'false');
  });

  it('should keep the undocked sidebar open while moving from the trigger through the top interaction zone', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });
    const topInteractionZone = getSidebarTopInteractionZone();
    const sidebarHeaderButton = getSidebarHeaderButton();

    await user.click(trigger);

    fireEvent.mouseOver(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(trigger, { relatedTarget: topInteractionZone });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(topInteractionZone, { relatedTarget: sidebarHeaderButton });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
  });

  it('should keep the undocked sidebar open while moving slowly straight down from the trigger', async () => {
    const { user } = setupLayoutWithSidebar();
    const trigger = screen.getByRole('button', { name: 'Undock sidebar' });
    const topInteractionZone = getSidebarTopInteractionZone();
    const sidebarHeaderButton = getSidebarHeaderButton();

    await user.click(trigger);

    fireEvent.mouseOver(trigger);
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(trigger, { relatedTarget: topInteractionZone });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');

    fireEvent.mouseOut(topInteractionZone, { relatedTarget: sidebarHeaderButton });
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-open', 'true');
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

function TestContextConsumer({
  isSidebarInLayoutDefault,
}: Readonly<{ isSidebarInLayoutDefault?: boolean }>) {
  const context = useContext(LayoutSidebarContext);

  useEffect(() => {
    if (isDefined(isSidebarInLayoutDefault)) {
      context.setIsInLayout(isSidebarInLayoutDefault);
    }
  }, [context, isSidebarInLayoutDefault]);

  return (
    <div>
      <div>{`isInLayout:${context.isInLayout.toString()}`}</div>

      <div>{`isDocked:${context.isDocked.toString()}`}</div>

      <div>{`isOpen:${context.isOpen.toString()}`}</div>

      <button onClick={() => context.setIsInLayout(true)} type="button">
        Set Sidebar
      </button>

      <button onClick={() => context.setIsDocked(true)} type="button">
        Set Docked
      </button>

      <button onClick={() => context.setIsInLayout(false)} type="button">
        Unset Sidebar
      </button>

      <button onClick={() => context.setIsDocked(false)} type="button">
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
  return renderWithMemoryRouter(
    <Layout data-testid="layout" isSidebarInitiallyDocked={isSidebarInitiallyDocked}>
      <Layout.GlobalNavigation>
        <Layout.GlobalNavigation.Primary>
          <Layout.GlobalNavigation.Home ariaLabel="Brand home">
            <span>Brand</span>
          </Layout.GlobalNavigation.Home>
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

function getSidebarTopInteractionZone() {
  const topInteractionZone = screen.getByTestId('sidebar-top-interaction-zone');

  if (!(topInteractionZone instanceof HTMLElement)) {
    throw new TypeError('Missing sidebar top interaction zone');
  }

  return topInteractionZone;
}

function getSidebarHeaderButton() {
  const sidebarHeader = screen.getByRole('button', { name: 'Sidebar header' });

  if (!(sidebarHeader instanceof HTMLButtonElement)) {
    throw new TypeError('Missing sidebar header button');
  }

  return sidebarHeader;
}
