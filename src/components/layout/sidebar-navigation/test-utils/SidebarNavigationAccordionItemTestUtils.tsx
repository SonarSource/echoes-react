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

import '@testing-library/jest-dom';
import { screen } from '@testing-library/react';
import { useEffect, useState } from 'react';
import { MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { render, renderWithMemoryRouter } from '~common/helpers/test-utils';
import { IconBranch, IconExpand } from '../../../icons';
import { SidebarNavigationAccordionChildItem } from '../SidebarNavigationAccordionChildItem';

import {
  SidebarNavigationAccordionItem,
  SidebarNavigationAccordionItemProps,
} from '../SidebarNavigationAccordionItem';

type SetupResult = ReturnType<typeof render>;

export function checkAccordionAccessibility(isOpen: boolean): void {
  const button = screen.getByRole('button', { name: 'Accordion Item' });
  const region = screen.getByRole('region', { name: 'Accordion Item' });

  expect(button).toHaveAttribute('aria-expanded', isOpen.toString());
  expect(button).toHaveAttribute('aria-controls', region.id);
  expect(region).toHaveAttribute('aria-labelledby', button.id);
  checkAccordionPanelVisibility(isOpen);
}

export function checkAccordionPanelVisibility(isOpen: boolean): void {
  const region = screen.getByRole('region', { name: 'Accordion Item' });
  expect(region).toHaveAttribute('data-accordion-open', isOpen.toString());
}

export function setupControlledSidebarNavigationAccordionItem(): SetupResult {
  function ControlledExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button onClick={() => setIsOpen(true)} type="button">
          Open accordion externally
        </button>

        <button onClick={() => setIsOpen(false)} type="button">
          Close accordion externally
        </button>

        <ul>
          <SidebarNavigationAccordionItem Icon={IconExpand} isOpen={isOpen} label="Accordion Item">
            <SidebarNavigationAccordionChildItem to="/sub-item-1">
              Sub Item 1
            </SidebarNavigationAccordionChildItem>
          </SidebarNavigationAccordionItem>
        </ul>
      </>
    );
  }

  return renderWithMemoryRouter(<ControlledExample />);
}

export function setupSidebarNavigationAccordionItem(
  props: Partial<SidebarNavigationAccordionItemProps> = {},
): SetupResult {
  return renderWithMemoryRouter(createSidebarNavigationAccordionItem(props));
}

export function setupSidebarNavigationAccordionItemWithRouter(
  props: Partial<SidebarNavigationAccordionItemProps> = {},
  initialEntries = ['/initial'],
): SetupResult {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={initialEntries}>
      <Routes>
        <Route
          element={<SidebarNavigationAccordionItemRouterHarness accordionProps={props} />}
          path="*"
        />
      </Routes>
    </MemoryRouter>,
  );
}

export function setupSidebarNavigationAccordionItemWithExplicitActiveChild(): SetupResult {
  function SidebarNavigationAccordionItemExplicitActiveChildHarness() {
    const [isFirstChildActive, setIsFirstChildActive] = useState(true);

    return (
      <>
        <button onClick={() => setIsFirstChildActive((current) => !current)} type="button">
          Toggle first child active state
        </button>

        {createSidebarNavigationAccordionItem({
          children: getExplicitlyActiveSidebarNavigationAccordionChildren({ isFirstChildActive }),
        })}
      </>
    );
  }

  return renderWithMemoryRouter(<SidebarNavigationAccordionItemExplicitActiveChildHarness />);
}

export function setupSidebarNavigationAccordionItemWithTransientInitialActiveChild(
  props: Partial<SidebarNavigationAccordionItemProps> = {},
): SetupResult {
  function SidebarNavigationAccordionItemTransientInitialActiveChildHarness() {
    const [isFirstChildActive, setIsFirstChildActive] = useState(true);

    useEffect(() => {
      setIsFirstChildActive(false);
    }, []);

    return createSidebarNavigationAccordionItem({
      ...props,
      children: getExplicitlyActiveSidebarNavigationAccordionChildren({ isFirstChildActive }),
    });
  }

  return renderWithMemoryRouter(
    <SidebarNavigationAccordionItemTransientInitialActiveChildHarness />,
  );
}

interface SidebarNavigationAccordionItemRouterHarnessProps {
  accordionProps: Partial<SidebarNavigationAccordionItemProps>;
}

function SidebarNavigationAccordionItemRouterHarness({
  accordionProps,
}: Readonly<SidebarNavigationAccordionItemRouterHarnessProps>) {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate('/sub-item-1')} type="button">
        Navigate to first child route
      </button>

      <button onClick={() => navigate('/elsewhere')} type="button">
        Navigate elsewhere
      </button>

      {createSidebarNavigationAccordionItem(accordionProps)}
    </>
  );
}

function createSidebarNavigationAccordionItem(
  props: Partial<SidebarNavigationAccordionItemProps> = {},
) {
  return (
    <ul>
      <SidebarNavigationAccordionItem Icon={IconExpand} label="Accordion Item" {...props}>
        {props.children ?? getDefaultSidebarNavigationAccordionChildren()}
      </SidebarNavigationAccordionItem>
    </ul>
  );
}

interface ExplicitlyActiveSidebarNavigationAccordionChildrenProps {
  isFirstChildActive?: boolean;
}

export function getExplicitlyActiveSidebarNavigationAccordionChildren({
  isFirstChildActive = true,
}: Readonly<ExplicitlyActiveSidebarNavigationAccordionChildrenProps> = {}) {
  return (
    <>
      <SidebarNavigationAccordionChildItem
        Icon={IconBranch}
        isActive={isFirstChildActive}
        to="/sub-item-1">
        Sub Item 1
      </SidebarNavigationAccordionChildItem>

      <SidebarNavigationAccordionChildItem Icon={IconBranch} to="/sub-item-2">
        Sub Item 2
      </SidebarNavigationAccordionChildItem>
    </>
  );
}

function getDefaultSidebarNavigationAccordionChildren() {
  return (
    <>
      <SidebarNavigationAccordionChildItem Icon={IconBranch} to="/sub-item-1">
        Sub Item 1
      </SidebarNavigationAccordionChildItem>

      <SidebarNavigationAccordionChildItem Icon={IconBranch} to="/sub-item-2">
        Sub Item 2
      </SidebarNavigationAccordionChildItem>
    </>
  );
}
