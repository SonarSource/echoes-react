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
import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { IconBranch, IconClock } from '../../../icons';
import { SidebarNavigationItem, SidebarNavigationItemProps } from '../SidebarNavigationItem';

expect.extend(matchers);

it('should handle onClick events', async () => {
  const handleClick = jest.fn();
  const { user } = setupSidebarNavigationItem({ onClick: handleClick });

  await user.click(screen.getByRole('link'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

describe('ellipsis behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show tooltip when enableTooltip prop is true', async () => {
    const { user } = setupSidebarNavigationItem({ enableTooltip: true });

    await user.hover(screen.getByRole('link'));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Test Item');
  });

  it('should not show tooltip when enableTooltip prop is false', async () => {
    const { user } = setupSidebarNavigationItem();

    await user.hover(screen.getByRole('link'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('navigation behavior', () => {
  it('should navigate to the correct path', async () => {
    const { user } = setupSidebarNavigationItem();

    expect(screen.getByRole('link', { name: 'Test Item' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Test Item' }));
    expect(screen.getByText('/second')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Test Item' })).not.toBeInTheDocument();
  });
});

describe('active state behavior', () => {
  it('should apply active class when isActive is true', () => {
    setupSidebarNavigationItem({ isActive: true, disableIconWhenSidebarOpen: true });

    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('should automatically apply active class for active link', () => {
    setupSidebarNavigationItem({ to: '/initial' });

    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('should not have active class when isActive is false', () => {
    setupSidebarNavigationItem({ isActive: false, to: '/initial' });

    expect(screen.getByRole('link')).not.toHaveClass('active');
  });

  it('should not have active class for non active link', () => {
    setupSidebarNavigationItem({ to: '/second' });

    expect(screen.getByRole('link')).not.toHaveClass('active');
  });
});

describe('CSS custom properties for accordion integration', () => {
  it('should use CSS custom properties for display, visibility and outline', () => {
    setupSidebarNavigationItem();

    const link = screen.getByRole('link');

    // Check that display CSS custom property is used with fallback
    expect(link).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );

    // Check that visibility CSS custom property is used with fallback
    expect(link).toHaveStyleRule(
      'visibility',
      'var(--sidebar-navigation-accordion-children-visibility, visible)',
    );

    // Check that outline CSS custom property is used (no fallback needed)
    expect(link).toHaveStyleRule('outline', 'var(--sidebar-navigation-accordion-children-outline)');
  });
});

it("shouldn't have any a11y violation", async () => {
  const { container } = setupSidebarNavigationItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();
});

function setupSidebarNavigationItem(props: Partial<SidebarNavigationItemProps> = {}) {
  return renderWithMemoryRouter(
    <ul>
      <SidebarNavigationItem Icon={IconClock} to="/second" {...props}>
        Test Item
      </SidebarNavigationItem>
    </ul>,
  );
}
