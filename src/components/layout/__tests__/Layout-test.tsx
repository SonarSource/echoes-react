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

import { act, screen } from '@testing-library/react';
import { useContext, useEffect } from 'react';
import { Layout } from '..';
import { render } from '../../../common/helpers/test-utils';
import { LayoutContext } from '../LayoutContext';

const mediaQueryListMock = {
  matches: true,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
};

// Mock window.matchMedia globally
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockReturnValue(mediaQueryListMock),
});

beforeEach(() => {
  jest.clearAllMocks();
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
        <TestContextConsumer />
      </Layout>,
    );

    // Initially should be docked (wide screen initializes isSidebarDocked to true)
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'true');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-is-dockable', 'true');
    expect(screen.getByText('isSidebarDocked:true')).toBeInTheDocument();

    // Simulate media query change to narrow screen
    act(() => {
      const changeHandler = mediaQueryListMock.addEventListener.mock.calls[0][1];
      changeHandler({ matches: false });
    });

    // Context should be re-rendered, so we need to check current state
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-docked', 'false');
    expect(screen.getByTestId('layout')).toHaveAttribute('data-sidebar-is-dockable', 'false');

    // Context should remember last user choice
    expect(screen.getByText('isSidebarDocked:true')).toBeInTheDocument();
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
    expect(onSidebarDockedChange).toHaveBeenLastCalledWith(true);

    await user.click(screen.getByRole('button', { name: 'Unset Docked' }));
    expect(screen.getByText('isSidebarDocked:false')).toBeInTheDocument();
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
