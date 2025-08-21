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
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { useIsOverflow } from '~common/helpers/useIsOverflow';
import { IconBranch } from '../../icons';
import { SidebarNavigationItem, SidebarNavigationItemProps } from '../SidebarNavigationItem';

// Mock the useIsOverflow hook
jest.mock('~common/helpers/useIsOverflow', () => ({
  useIsOverflow: jest.fn().mockReturnValue([false]),
}));

it('should render with an icon', () => {
  setupSidebarNavigationItem({ Icon: IconBranch });

  expect(screen.getByRole('link')).toMatchSnapshot();
});

it('should apply active class when isActive is true', () => {
  setupSidebarNavigationItem({ isActive: true });

  expect(screen.getByRole('link')).toHaveClass('active');
});

it('should handle onClick events', async () => {
  const handleClick = jest.fn();
  const { user } = setupSidebarNavigationItem({ onClick: handleClick });

  await user.click(screen.getByRole('link'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

describe('Ellipsis behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show tooltip when content is overflowing', async () => {
    jest.mocked(useIsOverflow).mockReturnValueOnce([true]);
    const { user } = setupSidebarNavigationItem();

    await user.hover(screen.getByRole('link'));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Test Item');
  });

  it('should not show tooltip when content is not overflowing', async () => {
    const { user } = setupSidebarNavigationItem();

    await user.hover(screen.getByRole('link'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('Navigation behavior', () => {
  it('should navigate to the correct path', async () => {
    const { user } = setupSidebarNavigationItem();

    expect(screen.getByRole('link', { name: 'Test Item' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Test Item' }));
    expect(screen.getByText('/second')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Test Item' })).not.toBeInTheDocument();
  });
});

it("shouldn't have any a11y violation", async () => {
  const { container } = setupSidebarNavigationItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();
});

function setupSidebarNavigationItem(props: Partial<SidebarNavigationItemProps> = {}) {
  return renderWithMemoryRouter(
    <SidebarNavigationItem to="/second" {...props}>
      Test Item
    </SidebarNavigationItem>,
  );
}
