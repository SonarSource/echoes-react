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
import { createRef, type Ref } from 'react';
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { IconBranch, IconClock } from '../../../icons';

import {
  SidebarNavigationAccordionChildItem,
  SidebarNavigationAccordionChildItemProps,
} from '../SidebarNavigationAccordionChildItem';

expect.extend(matchers);

jest.mock('../utils', () => ({
  TOOLTIP_DELAY_IN_MS: 0,
}));

it('should handle onClick events', async () => {
  const handleClick = jest.fn();
  const { user } = setupSidebarNavigationAccordionChildItem({ onClick: handleClick });

  await user.click(screen.getByRole('link'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});

it('should render without an icon', () => {
  setupSidebarNavigationAccordionChildItem();

  expect(screen.getByRole('link', { name: 'Test Item' })).toBeInTheDocument();
});

it('should use ariaLabel as the accessible name', () => {
  setupSidebarNavigationAccordionChildItem({ ariaLabel: 'Accordion child item label' });

  expect(screen.getByRole('link', { name: 'Accordion child item label' })).toBeInTheDocument();
});

it('should forward refs to the underlying link', () => {
  const ref = createRef<HTMLAnchorElement>();
  setupSidebarNavigationAccordionChildItem({}, ref);

  expect(ref.current).toBe(screen.getByRole('link', { name: 'Test Item' }));
});

describe('ellipsis behavior', () => {
  it('should show tooltip by default', async () => {
    const { user } = setupSidebarNavigationAccordionChildItem();

    await user.hover(screen.getByRole('link'));
    const tooltip = await screen.findByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Test Item');
  });

  it('should not show tooltip when disableTooltip prop is true', async () => {
    const { user } = setupSidebarNavigationAccordionChildItem({ disableTooltip: true });

    await user.hover(screen.getByRole('link'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('navigation behavior', () => {
  it('should navigate to the correct path', async () => {
    const { user } = setupSidebarNavigationAccordionChildItem();

    expect(screen.getByRole('link', { name: 'Test Item' })).toBeInTheDocument();

    await user.click(screen.getByRole('link', { name: 'Test Item' }));
    expect(screen.getByText('/second')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Test Item' })).not.toBeInTheDocument();
  });

  it('should navigate to the correct path with the keyboard', async () => {
    const { user } = setupSidebarNavigationAccordionChildItem();

    await user.tab();
    expect(screen.getByRole('link', { name: 'Test Item' })).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(screen.getByText('/second')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Test Item' })).not.toBeInTheDocument();
  });
});

describe('active state behavior', () => {
  it('should apply active class when isActive is true', () => {
    setupSidebarNavigationAccordionChildItem({
      isActive: true,
      disableIconWhenSidebarOpen: true,
    });

    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('should automatically apply active class for active link', () => {
    setupSidebarNavigationAccordionChildItem({ to: '/initial' });

    expect(screen.getByRole('link')).toHaveClass('active');
  });

  it('should not have active class when isActive is false', () => {
    setupSidebarNavigationAccordionChildItem({ isActive: false, to: '/initial' });

    expect(screen.getByRole('link')).not.toHaveClass('active');
  });

  it('should not have active class for non active link', () => {
    setupSidebarNavigationAccordionChildItem({ to: '/second' });

    expect(screen.getByRole('link')).not.toHaveClass('active');
  });
});

describe('CSS custom properties for accordion integration', () => {
  it('should use CSS custom properties for display, visibility and outline', () => {
    setupSidebarNavigationAccordionChildItem({ Icon: IconClock });

    const link = screen.getByRole('link');

    expect(link).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );

    expect(link).toHaveStyleRule(
      'visibility',
      'var(--sidebar-navigation-accordion-children-visibility, visible)',
    );

    expect(link).toHaveStyleRule('outline', 'var(--sidebar-navigation-accordion-children-outline)');
  });
});

it("shouldn't have any a11y violation", async () => {
  const { container } = setupSidebarNavigationAccordionChildItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();
});

it("shouldn't have any a11y violation without an icon", async () => {
  const { container } = setupSidebarNavigationAccordionChildItem();
  await expect(container).toHaveNoA11yViolations();
});

function setupSidebarNavigationAccordionChildItem(
  props: Partial<SidebarNavigationAccordionChildItemProps> = {},
  ref?: Ref<HTMLAnchorElement>,
) {
  return renderWithMemoryRouter(
    <ul>
      <SidebarNavigationAccordionChildItem ref={ref} to="/second" {...props}>
        Test Item
      </SidebarNavigationAccordionChildItem>
    </ul>,
  );
}
