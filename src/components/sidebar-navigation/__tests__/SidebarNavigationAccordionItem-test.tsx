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

import { matchers } from '@emotion/jest';
import { screen } from '@testing-library/react';
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { IconBranch } from '../../icons';
import {
  SidebarNavigationAccordionItem,
  SidebarNavigationAccordionItemProps,
} from '../SidebarNavigationAccordionItem';
import { SidebarNavigationItem } from '../SidebarNavigationItem';

expect.extend(matchers);

// Mock the useIsOverflow hook
jest.mock('~common/helpers/useIsOverflow', () => ({
  useIsOverflow: jest.fn().mockReturnValue([false]),
}));

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

it('should render with an icon', () => {
  const { container } = setupSidebarNavigationAccordionItem({ Icon: IconBranch });
  expect(container).toMatchSnapshot();
});

it("shouldn't have any a11y violation", async () => {
  const { container, user } = setupSidebarNavigationAccordionItem({ Icon: IconBranch });
  await expect(container).toHaveNoA11yViolations();

  await user.click(screen.getByRole('button'));
  await expect(container).toHaveNoA11yViolations();
});

describe('integration with SidebarNavigationItem', () => {
  it('should have active class and rely on the css property passed set form the accordion', () => {
    setupSidebarNavigationAccordionItem({
      children: (
        <>
          <SidebarNavigationItem to="/initial">Sub Item 1</SidebarNavigationItem>
          <SidebarNavigationItem to="/sub-item-2">Sub Item 2</SidebarNavigationItem>
        </>
      ),
    });

    expect(screen.getByRole('link', { name: 'Sub Item 1' })).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );
    expect(screen.getByRole('link', { name: 'Sub Item 1' })).toHaveClass('active');

    expect(screen.queryByRole('link', { name: 'Sub Item 2' })).toHaveStyleRule(
      'display',
      'var(--sidebar-navigation-accordion-children-display, flex)',
    );
    expect(screen.getByRole('link', { name: 'Sub Item 2' })).not.toHaveClass('active');
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
    <SidebarNavigationAccordionItem label="Accordion Item" {...props}>
      {props.children ?? (
        <>
          <SidebarNavigationItem isActive to="/sub-item-1">
            Sub Item 1
          </SidebarNavigationItem>
          <SidebarNavigationItem to="/sub-item-2">Sub Item 2</SidebarNavigationItem>
        </>
      )}
    </SidebarNavigationAccordionItem>,
  );
}
