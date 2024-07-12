/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { render } from '~common/helpers/test-utils';
import { IconBell, IconCalendar } from '../../icons';
import { DropdownMenu } from '../DropdownMenu';

const items = <DropdownMenu.ItemButton>An item</DropdownMenu.ItemButton>;
const trigger = <button type="button">Trigger</button>;

it('should render without items', async () => {
  const { container } = setupWithMemoryRouter(
    <DropdownMenu.Root items={undefined}>{trigger}</DropdownMenu.Root>,
  );

  await expect(container).toHaveNoA11yViolations();

  expect(screen.getByText('Trigger')).toBeVisible();
});

it('should render with items when isOpen', () => {
  setupWithMemoryRouter(
    <DropdownMenu.Root
      align="start"
      className="testClassName"
      header={{ helpText: 'Header help text', label: 'Header label' }}
      isOpen
      items={items}>
      {trigger}
    </DropdownMenu.Root>,
  );

  expect(screen.getByText('Header label')).toBeVisible();
  expect(screen.getByText('Header help text')).toBeVisible();
  expect(screen.getByText('An item')).toBeVisible();
});

it('should render with items when isOpenOnMount', () => {
  setupWithMemoryRouter(
    <DropdownMenu.Root align="start" className="testClassName" isOpenOnMount items={items}>
      {trigger}
    </DropdownMenu.Root>,
  );

  expect(screen.getByText('An item')).toBeVisible();
});

it('should render with items when clicked', async () => {
  const { user } = setupWithMemoryRouter(
    <DropdownMenu.Root align="center" items={items}>
      <a href="/">Trigger</a>
    </DropdownMenu.Root>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();

  await user.click(screen.getByText('An item'));

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
});

it('should handle onOpen', async () => {
  const onOpen = jest.fn();

  const { user } = setupWithMemoryRouter(
    <DropdownMenu.Root align="center" items={items} onOpen={onOpen}>
      <a href="/">Trigger</a>
    </DropdownMenu.Root>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
  expect(onOpen).not.toHaveBeenCalled();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();
  expect(onOpen).toHaveBeenCalled();
});

it('should handle onClose', async () => {
  const onClose = jest.fn();

  const { user } = setupWithMemoryRouter(
    <DropdownMenu.Root align="center" items={items} onClose={onClose}>
      <a href="/">Trigger</a>
    </DropdownMenu.Root>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
  expect(onClose).not.toHaveBeenCalled();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();

  await user.click(screen.getByText('An item'));

  expect(onClose).toHaveBeenCalled();
  expect(screen.queryByText('An item')).not.toBeInTheDocument();
});

it('should not show items when clicked if isDisabled', async () => {
  const { user } = setupWithMemoryRouter(
    <DropdownMenu.Root align="end" isDisabled items={items}>
      {trigger}
    </DropdownMenu.Root>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();

  await user.click(screen.getByText('Trigger'));

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
});

it('should render many different items', async () => {
  const buttonClickHandler = jest.fn();
  const linkClickHandler = jest.fn();

  const { user } = setupWithMemoryRouter(
    <DropdownMenu.Root
      isOpen
      items={
        <>
          <DropdownMenu.GroupLabel>DropdownMenu.ItemButton variants</DropdownMenu.GroupLabel>
          <DropdownMenu.ItemButton>simple ItemButton</DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton ariaLabel="the aria-label">
            ItemButton with aria-label
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton className="test classname">
            ItemButton with className
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton helpText="the helpText">
            ItemButton with helpText
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton isDisabled onClick={buttonClickHandler}>
            ItemButton isDisabled with onClick
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton onClick={buttonClickHandler}>
            ItemButton with onClick
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton prefix={<IconBell color="echoes-color-icon-warning" />}>
            ItemButton with prefix
          </DropdownMenu.ItemButton>
          <DropdownMenu.ItemButton suffix={<IconCalendar />}>
            ItemButton with suffix
          </DropdownMenu.ItemButton>
          <DropdownMenu.Separator />
          <DropdownMenu.ItemButtonCheckable>
            ItemButtonCheckable unchecked
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable isChecked>
            ItemButtonCheckable checked
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable helpText="the helpText">
            ItemButtonCheckable unchecked with helpText
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable helpText="the helpText" isChecked>
            ItemButtonCheckable checked with helpText
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable isDisabled>
            ItemButtonCheckable unchecked isDisabled
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable isChecked isDisabled>
            ItemButtonCheckable isChecked isDisabled
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable prefix={<IconBell color="echoes-color-icon-warning" />}>
            ItemButtonCheckable unchecked with prefix
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable
            isChecked
            prefix={<IconBell color="echoes-color-icon-warning" />}>
            ItemButtonCheckable checked with prefix
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable suffix={<IconCalendar />}>
            ItemButtonCheckable unchecked with suffix
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.ItemButtonCheckable isChecked suffix={<IconCalendar />}>
            ItemButtonCheckable checked with suffix
          </DropdownMenu.ItemButtonCheckable>
          <DropdownMenu.Separator />
          <DropdownMenu.ItemButtonDestructive>
            simple ItemButtonDestructive
          </DropdownMenu.ItemButtonDestructive>
          <DropdownMenu.ItemButtonDestructive helpText="the helpText">
            ItemButtonDestructive with helpText
          </DropdownMenu.ItemButtonDestructive>
          <DropdownMenu.ItemButtonDestructive isDisabled>
            ItemButtonDestructive isDisabled
          </DropdownMenu.ItemButtonDestructive>
          <DropdownMenu.Separator />
          <DropdownMenu.ItemLink to="elsewhere">simple ItemLink</DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink to={{}}>always active ItemLink</DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink to="https://sonarcloud.io">
            detected external ItemLink
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink isExternal to={{ pathname: 'elsewhere 2' }}>
            forced external ItemLink
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink
            helpText="the helpText"
            to={{ pathname: 'somewhere', search: 'elsewhere 3' }}>
            ItemLink with helpText
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink isDisabled onClick={linkClickHandler} to={{ hash: 'elsewhere 4' }}>
            ItemLink isDisabled with onClick
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink onClick={linkClickHandler} to="/second">
            ItemLink with onClick
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink
            prefix={<IconBell color="echoes-color-icon-warning" />}
            to="elsewhere 6">
            ItemLink with prefix
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink
            suffix={<IconBell color="echoes-color-icon-warning" />}
            to="elsewhere 7">
            ItemLink with suffix
          </DropdownMenu.ItemLink>
          <DropdownMenu.ItemLink
            isExternal
            suffix={<IconBell color="echoes-color-icon-warning" />}
            to="elsewhere 8">
            Itemlink with suffix and external icon
          </DropdownMenu.ItemLink>
        </>
      }>
      {trigger}
    </DropdownMenu.Root>,
  );

  expect(buttonClickHandler).not.toHaveBeenCalled();
  expect(linkClickHandler).not.toHaveBeenCalled();

  await user.click(screen.getByText('ItemButton isDisabled with onClick'));
  expect(buttonClickHandler).not.toHaveBeenCalled();

  await user.click(screen.getByText('ItemButton with onClick'));
  expect(buttonClickHandler).toHaveBeenCalled();

  await user.click(screen.getByText('ItemLink isDisabled with onClick'));
  expect(linkClickHandler).not.toHaveBeenCalled();

  await user.click(screen.getByText('ItemLink with onClick'));
  expect(linkClickHandler).toHaveBeenCalled();

  expect(screen.getByText('/second')).toBeVisible();
});

function ShowPath() {
  const { pathname } = useLocation();
  return <pre>{pathname}</pre>;
}

const setupWithMemoryRouter = (component: JSX.Element, initialEntries = ['/initial']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <Routes>
        <Route
          element={
            <>
              {component}
              <ShowPath />
            </>
          }
          path="/initial"
        />
        <Route element={<ShowPath />} path="/second" />
      </Routes>
    </MemoryRouter>,
  );
};
