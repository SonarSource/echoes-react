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
import { IconBranch, IconExpand, IconGitBranch } from '../../../icons';
import {
  SidebarNavigationAccordionItem,
  SidebarNavigationAccordionItemProps,
} from '../SidebarNavigationAccordionItem';
import { SidebarNavigationItem } from '../SidebarNavigationItem';

expect.extend(matchers);

it('should expand hidden elements when clicked', async () => {
  const onOpen = jest.fn();
  const onClose = jest.fn();
  const { user } = setupSidebarNavigationAccordionItem({ onOpen, onClose });

  const accordionButton = screen.getByRole('button', { name: 'Accordion Item' });
  expect(accordionButton).toBeInTheDocument();
  checkAccordionPanelVisibility(false);

  await user.click(accordionButton);
  expect(onOpen).toHaveBeenCalled();
  checkAccordionPanelVisibility(true);
  expect(screen.getAllByRole('link')).toHaveLength(2);

  await user.click(accordionButton);
  checkAccordionPanelVisibility(false);
  expect(onClose).toHaveBeenCalled();
});

it("shouldn't have any a11y violation", async () => {
  const { container, user } = setupSidebarNavigationAccordionItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();

  await user.click(screen.getByRole('button'));
  await expect(container).toHaveNoA11yViolations();
});

describe('ellipsis behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show tooltip when enableTooltip prop is true', async () => {
    const { user } = setupSidebarNavigationAccordionItem({ enableTooltip: true });

    await user.hover(screen.getByRole('button'));
    const tooltip = await screen.findByRole('tooltip', {}, { timeout: 2000 });
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveTextContent('Accordion Item');
  });

  it('should not show tooltip when enableTooltip prop is false', async () => {
    const { user } = setupSidebarNavigationAccordionItem();

    await user.hover(screen.getByRole('button'));
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});

describe('integration with SidebarNavigationItem', () => {
  it('should set CSS custom properties and active class on children', () => {
    setupSidebarNavigationAccordionItem({
      children: (
        <>
          <SidebarNavigationItem Icon={IconGitBranch} to="/initial">
            Sub Item 1
          </SidebarNavigationItem>
          <SidebarNavigationItem Icon={IconGitBranch} to="/sub-item-2">
            Sub Item 2
          </SidebarNavigationItem>
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

    // Check that visibility CSS custom property is set
    expect(subItem1).toHaveStyleRule(
      'visibility',
      'var(--sidebar-navigation-accordion-children-visibility, visible)',
    );
    expect(subItem2).toHaveStyleRule(
      'visibility',
      'var(--sidebar-navigation-accordion-children-visibility, visible)',
    );

    // Check that outline CSS custom property is set
    expect(subItem1).toHaveStyleRule(
      'outline',
      'var(--sidebar-navigation-accordion-children-outline)',
    );
    expect(subItem2).toHaveStyleRule(
      'outline',
      'var(--sidebar-navigation-accordion-children-outline)',
    );
  });
});

function checkAccordionPanelVisibility(isOpen: boolean) {
  const region = screen.getByRole('region', { name: 'Accordion Item' });
  expect(region).toHaveAttribute('data-accordion-open', isOpen.toString());
}

function setupSidebarNavigationAccordionItem(
  props: Partial<SidebarNavigationAccordionItemProps> = {},
) {
  return renderWithMemoryRouter(
    <ul>
      <SidebarNavigationAccordionItem Icon={IconExpand} label="Accordion Item" {...props}>
        {props.children ?? (
          <>
            <SidebarNavigationItem Icon={IconBranch} isActive to="/sub-item-1">
              Sub Item 1
            </SidebarNavigationItem>
            <SidebarNavigationItem Icon={IconBranch} to="/sub-item-2">
              Sub Item 2
            </SidebarNavigationItem>
          </>
        )}
      </SidebarNavigationAccordionItem>
    </ul>,
  );
}
