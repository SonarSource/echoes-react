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
import { screen, waitFor } from '@testing-library/react';
import { IconBranch, IconGitBranch } from '../../../icons';
import { SidebarNavigationAccordionChildItem } from '../SidebarNavigationAccordionChildItem';

import {
  checkAccordionAccessibility,
  checkAccordionPanelVisibility,
  getExplicitlyActiveSidebarNavigationAccordionChildren,
  setupControlledSidebarNavigationAccordionItem,
  setupSidebarNavigationAccordionItem,
  setupSidebarNavigationAccordionItemWithExplicitActiveChild,
  setupSidebarNavigationAccordionItemWithTransientInitialActiveChild,
  setupSidebarNavigationAccordionItemWithRouter,
} from '../test-utils/SidebarNavigationAccordionItemTestUtils';

expect.extend(matchers);

jest.mock('../utils', () => ({
  TOOLTIP_DELAY_IN_MS: 0,
}));

it('should expand hidden elements when clicked', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onOpenChange = jest.fn();

  const { user } = setupSidebarNavigationAccordionItem({ onClose, onOpen, onOpenChange });

  const accordionButton = screen.getByRole('button', { name: 'Accordion Item' });
  expect(accordionButton).toBeInTheDocument();
  checkAccordionPanelVisibility(false);

  await user.click(accordionButton);

  expect(onOpen).toHaveBeenCalledTimes(1);
  expect(onClose).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenNthCalledWith(1, true);

  checkAccordionPanelVisibility(true);
  expect(screen.getAllByRole('link')).toHaveLength(2);

  await user.click(accordionButton);

  checkAccordionPanelVisibility(false);

  expect(onOpen).toHaveBeenCalledTimes(1);
  expect(onClose).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledTimes(2);
  expect(onOpenChange).toHaveBeenNthCalledWith(2, false);
});

it('should render uncontrolled and closed by default', () => {
  setupSidebarNavigationAccordionItem();

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );

  checkAccordionAccessibility(false);
});

it('should render the accordion open when defaultOpen is true', () => {
  setupSidebarNavigationAccordionItem({ isDefaultOpen: true });

  checkAccordionPanelVisibility(true);
  expect(screen.getAllByRole('link')).toHaveLength(2);
  checkAccordionAccessibility(true);
});

it('should render the accordion open when a child route is active', () => {
  setupSidebarNavigationAccordionItemWithRouter({}, ['/sub-item-1']);

  expect(screen.getAllByRole('link')).toHaveLength(2);
  checkAccordionAccessibility(true);
});

it('should call open callbacks on initial auto-open from an active child route', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onOpenChange = jest.fn();

  setupSidebarNavigationAccordionItemWithRouter({ onClose, onOpen, onOpenChange }, ['/sub-item-1']);

  await waitFor(() => expect(onOpen).toHaveBeenCalledTimes(1));

  expect(onClose).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(true);
  checkAccordionAccessibility(true);
});

it('should stay open when an initially active child becomes inactive', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onOpenChange = jest.fn();

  setupSidebarNavigationAccordionItemWithTransientInitialActiveChild({
    onClose,
    onOpen,
    onOpenChange,
  });

  await waitFor(() => {
    checkAccordionAccessibility(true);
  });

  expect(onOpen).toHaveBeenCalledTimes(1);
  expect(onClose).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(true);
});

it('should render the accordion open when a child is explicitly active', () => {
  setupSidebarNavigationAccordionItem({
    children: getExplicitlyActiveSidebarNavigationAccordionChildren(),
  });

  expect(screen.getAllByRole('link')).toHaveLength(2);
  checkAccordionAccessibility(true);
});

it.each([true, false])('should respect the controlled open state %s', (isOpen) => {
  setupSidebarNavigationAccordionItem({ isOpen });

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    isOpen.toString(),
  );

  checkAccordionAccessibility(isOpen);
});

it('should not auto-open a controlled closed accordion when a child route is active', () => {
  setupSidebarNavigationAccordionItemWithRouter({ isOpen: false }, ['/sub-item-1']);

  expect(screen.getByRole('link', { name: 'Sub Item 1' })).toHaveClass('active');
  checkAccordionAccessibility(false);
});

it('should reflect controlled prop updates after mount', async () => {
  const { user } = setupControlledSidebarNavigationAccordionItem();

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );

  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Open accordion externally' }));

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );

  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Close accordion externally' }));
  checkAccordionAccessibility(false);
});

it('should call onOpenChange without changing a controlled state', async () => {
  const onOpenChange = jest.fn();
  const { user } = setupSidebarNavigationAccordionItem({ isOpen: false, onOpenChange });

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));

  expect(onOpenChange).toHaveBeenCalledWith(true);
  checkAccordionAccessibility(false);
});

it('should call callbacks when a child route becomes active after navigation', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onOpenChange = jest.fn();

  const { user } = setupSidebarNavigationAccordionItemWithRouter({ onClose, onOpen, onOpenChange });

  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Navigate to first child route' }));

  expect(onOpen).toHaveBeenCalledTimes(1);
  expect(onClose).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(true);
  checkAccordionAccessibility(true);
});

it('should stay open when an auto-opened child route becomes inactive', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const onOpenChange = jest.fn();

  const { user } = setupSidebarNavigationAccordionItemWithRouter({ onClose, onOpen, onOpenChange });

  await user.click(screen.getByRole('button', { name: 'Navigate to first child route' }));

  await user.click(screen.getByRole('button', { name: 'Navigate elsewhere' }));

  expect(onOpen).toHaveBeenCalledTimes(1);
  expect(onClose).not.toHaveBeenCalled();
  expect(onOpenChange).toHaveBeenCalledTimes(1);
  expect(onOpenChange).toHaveBeenCalledWith(true);
  checkAccordionAccessibility(true);
});

it('should keep a manually opened accordion open after navigating elsewhere', async () => {
  const { user } = setupSidebarNavigationAccordionItemWithRouter();

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));
  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Navigate elsewhere' }));

  expect(screen.getAllByRole('link')).toHaveLength(2);
  checkAccordionAccessibility(true);
});

it('should stay manually closed when an explicitly active child remains active during navigation', async () => {
  const { user } = setupSidebarNavigationAccordionItemWithRouter({
    children: getExplicitlyActiveSidebarNavigationAccordionChildren(),
  });

  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));
  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Navigate elsewhere' }));

  expect(screen.getByRole('link', { name: 'Sub Item 1' })).toHaveClass('active');
  checkAccordionAccessibility(false);
});

it('should stay manually closed while the same route stays active', async () => {
  const { user } = setupSidebarNavigationAccordionItemWithRouter({}, ['/sub-item-1']);

  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));

  checkAccordionAccessibility(false);

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'false',
  );
});

it('should reopen when the same child route becomes active again after being manually closed', async () => {
  const { user } = setupSidebarNavigationAccordionItemWithRouter({}, ['/sub-item-1']);

  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));
  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Navigate elsewhere' }));
  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Navigate to first child route' }));

  checkAccordionAccessibility(true);

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

it('should reopen when an explicitly active child becomes active again without navigation', async () => {
  const { user } = setupSidebarNavigationAccordionItemWithExplicitActiveChild();

  checkAccordionAccessibility(true);

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));
  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Toggle first child active state' }));
  checkAccordionAccessibility(false);

  await user.click(screen.getByRole('button', { name: 'Toggle first child active state' }));

  checkAccordionAccessibility(true);

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute(
    'aria-expanded',
    'true',
  );
});

it("shouldn't have any a11y violation", async () => {
  const { container, user } = setupSidebarNavigationAccordionItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();

  await user.click(screen.getByRole('button'));
  await expect(container).toHaveNoA11yViolations();
});

it('should use ariaLabel as the accessible name', () => {
  setupSidebarNavigationAccordionItem({ ariaLabel: 'Accordion button label' });

  expect(screen.getByRole('button', { name: 'Accordion button label' })).toBeInTheDocument();
});

it('should render a button trigger that does not submit surrounding forms', () => {
  setupSidebarNavigationAccordionItem();

  expect(screen.getByRole('button', { name: 'Accordion Item' })).toHaveAttribute('type', 'button');
});

describe('ellipsis behavior', () => {
  it('should show tooltip by default', async () => {
    const { user } = setupSidebarNavigationAccordionItem();

    await user.hover(screen.getByRole('button'));
    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 2000 });
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Accordion Item');
  });

  it('should not show tooltip when disableTooltip prop is true', async () => {
    const { user } = setupSidebarNavigationAccordionItem({ disableTooltip: true });

    await user.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

it('should scroll the last child into view when opened with scrollLastChildIntoViewOnOpen', async () => {
  const scrollIntoView = jest.fn();
  globalThis.HTMLElement.prototype.scrollIntoView = scrollIntoView;

  const { user } = setupSidebarNavigationAccordionItem({ scrollLastChildIntoViewOnOpen: true });

  await user.click(screen.getByRole('button', { name: 'Accordion Item' }));

  expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'end' });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  globalThis.HTMLElement.prototype.scrollIntoView = () => {};
});

describe('integration with SidebarNavigationAccordionChildItem', () => {
  it('should set accordion child display CSS custom property and active class on children', () => {
    setupSidebarNavigationAccordionItem({
      children: (
        <>
          <SidebarNavigationAccordionChildItem Icon={IconGitBranch} to="/initial">
            Sub Item 1
          </SidebarNavigationAccordionChildItem>

          <SidebarNavigationAccordionChildItem Icon={IconGitBranch} to="/sub-item-2">
            Sub Item 2
          </SidebarNavigationAccordionChildItem>
        </>
      ),
    });

    const subItem1 = screen.getByRole('link', { name: 'Sub Item 1' });
    const subItem2 = screen.getByRole('link', { name: 'Sub Item 2' });

    // Check active class
    expect(subItem1).toHaveClass('active');
    expect(subItem2).not.toHaveClass('active');

    // Check that display CSS custom property is set
    expect(subItem1).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );

    expect(subItem2).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );
  });

  it('should render child items with and without icons', () => {
    setupSidebarNavigationAccordionItem({
      children: (
        <>
          <SidebarNavigationAccordionChildItem isActive to="/initial">
            Sub Item 1
          </SidebarNavigationAccordionChildItem>

          <SidebarNavigationAccordionChildItem Icon={IconGitBranch} to="/sub-item-2">
            Sub Item 2
          </SidebarNavigationAccordionChildItem>
        </>
      ),
    });

    expect(screen.getByRole('link', { name: 'Sub Item 1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Sub Item 2' })).toBeInTheDocument();
  });
});
