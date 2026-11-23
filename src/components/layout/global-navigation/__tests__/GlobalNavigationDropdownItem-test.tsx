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

import { screen } from '@testing-library/react';
import { createRef } from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render } from '~common/helpers/test-utils';
import { GlobalNavigation } from '..';
import { DropdownMenu } from '../../../dropdown-menu';

it('should display links when dropdown is opened', async () => {
  const { user } = setupWithContext(
    <GlobalNavigation.DropdownItem
      items={
        <>
          <DropdownMenu.ItemLink to="/1">link 1</DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink to="/2">link 2</DropdownMenu.ItemLink>
        </>
      }>
      Moar!
    </GlobalNavigation.DropdownItem>,
  );

  // No link is active, so the item appears unselected
  expect(screen.getByRole('listitem')).toHaveAttribute('data-selected', 'false');

  expect(screen.queryAllByRole('menuitem')).toHaveLength(0);

  await user.click(screen.getByRole('button'));

  expect(screen.getAllByRole('menuitem')).toHaveLength(2);
});

it.each([
  ['enabled', false],
  ['disabled', true],
])('should skip active computation when disabled', (_, disableActiveHighlight) => {
  setupWithContext(
    <GlobalNavigation.DropdownItem
      disableActiveHighlight={disableActiveHighlight}
      items={
        <>
          <DropdownMenu.ItemLink to="/">home</DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink to="/2">other</DropdownMenu.ItemLink>
        </>
      }>
      Moar!
    </GlobalNavigation.DropdownItem>,
  );

  // data-selected should be the ooposite of disableActiveHighlight
  expect(screen.getByRole('listitem')).toHaveAttribute(
    'data-selected',
    `${!disableActiveHighlight}`,
  );
});

it.each([
  ['/profiles', '/profiles/show', undefined, undefined, true],
  ['/profiles', '/profiles/changelog', undefined, undefined, true],
  ['/quality_gates', '/quality_gates/show/123', undefined, undefined, true],
  ['/profiles', '/profiles/show', true, undefined, false],
  ['/profiles', '/profiles', true, undefined, true],
  ['/profiles', '/profiles-other', undefined, undefined, false],
  ['/profiles', '/unrelated', undefined, true, true],
  ['/profiles', '/profiles', undefined, false, false],
  [{ pathname: '/profiles', search: '?language=js' }, '/profiles/show', false, undefined, true],
  ['/', '/profiles', undefined, undefined, false],
  ['relative', '/profiles', undefined, undefined, false],
  ['relative', '/profiles', undefined, true, true],
])(
  'should highlight %j at %s with full-path matching %s and link override %s: %s',
  (to, pathname, isMatchingFullPath, isActive, expected) => {
    setupWithContext(
      <GlobalNavigation.DropdownItem
        items={
          <DropdownMenu.ItemLink
            isActive={isActive}
            isMatchingFullPath={isMatchingFullPath}
            to={to}>
            Profiles
          </DropdownMenu.ItemLink>
        }>
        Policies
      </GlobalNavigation.DropdownItem>,
      pathname,
    );

    expect(screen.getByRole('listitem')).toHaveAttribute('data-selected', String(expected));
  },
);

it.each([
  [true, false, '/unrelated', true],
  [false, false, '/profiles', false],
  [true, true, '/profiles', false],
  [undefined, true, '/profiles/show', false],
])(
  'should apply dropdown override %s and disableActiveHighlight %s at %s: %s',
  (isActive, disableActiveHighlight, pathname, expected) => {
    setupWithContext(
      <GlobalNavigation.DropdownItem
        disableActiveHighlight={disableActiveHighlight}
        isActive={isActive}
        items={<DropdownMenu.ItemLink to="/profiles">Profiles</DropdownMenu.ItemLink>}>
        Policies
      </GlobalNavigation.DropdownItem>,
      pathname,
    );

    expect(screen.getByRole('listitem')).toHaveAttribute('data-selected', String(expected));
  },
);

it('should highlight links nested in fragments', () => {
  setupWithContext(
    <GlobalNavigation.DropdownItem
      items={
        <>
          <>
            <DropdownMenu.ItemLink to="/other">Other</DropdownMenu.ItemLink>
            <>
              <DropdownMenu.ItemLink to="/profiles">Profiles</DropdownMenu.ItemLink>
            </>
          </>
        </>
      }>
      Policies
    </GlobalNavigation.DropdownItem>,
    '/profiles/show',
  );

  expect(screen.getByRole('listitem')).toHaveAttribute('data-selected', 'true');
});

it('should expose the trigger button through its ref', () => {
  const ref = createRef<HTMLButtonElement>();
  setupWithContext(
    <GlobalNavigation.DropdownItem
      items={<DropdownMenu.ItemLink to="/profiles">Profiles</DropdownMenu.ItemLink>}
      ref={ref}>
      Policies
    </GlobalNavigation.DropdownItem>,
  );

  expect(ref.current).toBe(screen.getByRole('button', { name: 'Policies' }));
  ref.current?.focus();
  expect(screen.getByRole('button', { name: 'Policies' })).toHaveFocus();
});

const setupWithContext = (component: JSX.Element, pathname = '/') => {
  return render(
    <MemoryRouter
      future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      initialEntries={[pathname]}>
      <Routes>
        <Route
          element={<GlobalNavigation.ItemsContainer>{component}</GlobalNavigation.ItemsContainer>}
          path="*"
        />
      </Routes>
    </MemoryRouter>,
  );
};
