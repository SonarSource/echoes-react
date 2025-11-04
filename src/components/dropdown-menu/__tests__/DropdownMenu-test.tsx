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
import { renderWithMemoryRouter } from '~common/helpers/test-utils';
import { Theme } from '~generated/themes';
import { ThemeProvider } from '~utils/theme';
import { DropdownMenu, DropdownMenuAlign } from '..';
import { Button } from '../../buttons';
import { IconBell, IconCalendar } from '../../icons';

const items = <DropdownMenu.ItemButton>An item</DropdownMenu.ItemButton>;
const trigger = <Button>Trigger</Button>;

it('should render without items', async () => {
  const { container } = renderWithMemoryRouter(
    <DropdownMenu items={undefined}>{trigger}</DropdownMenu>,
  );

  await expect(container).toHaveNoA11yViolations();

  expect(screen.getByText('Trigger')).toBeVisible();
});

it('should render with items when isOpen', () => {
  renderWithMemoryRouter(
    <DropdownMenu
      className="testClassName"
      header={{
        helpText: 'Header help text',
        label: 'Header label',
        suffix: <button type="button">test</button>,
      }}
      isOpen
      items={items}>
      {trigger}
    </DropdownMenu>,
  );

  expect(screen.getByText('Header label')).toBeVisible();
  expect(screen.getByText('Header help text')).toBeVisible();
  expect(screen.getByText('An item')).toBeVisible();
  expect(screen.getByRole('button', { name: 'test' })).toBeVisible();
});

it('should render with items when isOpenOnMount', () => {
  renderWithMemoryRouter(
    <DropdownMenu className="testClassName" isOpenOnMount items={items}>
      {trigger}
    </DropdownMenu>,
  );

  expect(screen.getByText('An item')).toBeVisible();
});

it('should render with items when clicked', async () => {
  const { user } = renderWithMemoryRouter(
    <DropdownMenu items={items}>
      <a href="/">Trigger</a>
    </DropdownMenu>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();

  await user.click(screen.getByText('An item'));

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
});

it('should handle onOpen', async () => {
  const onOpen = jest.fn();

  const { user } = renderWithMemoryRouter(
    <DropdownMenu align={DropdownMenuAlign.Start} items={items} onOpen={onOpen}>
      <a href="/">Trigger</a>
    </DropdownMenu>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
  expect(onOpen).not.toHaveBeenCalled();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();
  expect(onOpen).toHaveBeenCalled();
});

it('should handle onClose', async () => {
  const onClose = jest.fn();

  const { user } = renderWithMemoryRouter(
    <DropdownMenu align={DropdownMenuAlign.Center} items={items} onClose={onClose}>
      <a href="/">Trigger</a>
    </DropdownMenu>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
  expect(onClose).not.toHaveBeenCalled();

  await user.click(screen.getByText('Trigger'));

  expect(screen.getByText('An item')).toBeVisible();

  await user.click(screen.getByText('An item'));

  expect(onClose).toHaveBeenCalled();
  expect(screen.queryByText('An item')).not.toBeInTheDocument();
});

it('should not be able to click the trigger if isDisabled', () => {
  renderWithMemoryRouter(
    <DropdownMenu align={DropdownMenuAlign.Center} items={items}>
      <Button isDisabled>Trigger</Button>
    </DropdownMenu>,
  );

  expect(screen.queryByText('An item')).not.toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Trigger' })).toBeDisabled();
});

it('should render many different items', async () => {
  const buttonClickHandler = jest.fn();
  const linkClickHandler = jest.fn();

  const { user } = renderWithMemoryRouter(
    <DropdownMenu
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
          <DropdownMenu.ItemLink enableOpenInNewTab to={{ pathname: 'elsewhere 2' }}>
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
            enableOpenInNewTab
            suffix={<IconBell color="echoes-color-icon-warning" />}
            to="elsewhere 8">
            Itemlink with suffix and external icon
          </DropdownMenu.ItemLink>
        </>
      }>
      {trigger}
    </DropdownMenu>,
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

it('should properly handle theme overrides', () => {
  renderWithMemoryRouter(
    <ThemeProvider theme={Theme.dark}>
      <DropdownMenu className="testClassName" isOpenOnMount items={items}>
        {trigger}
      </DropdownMenu>
    </ThemeProvider>,
  );

  expect(screen.getByRole('menu')).toHaveAttribute('data-echoes-theme', Theme.dark);
});

it('should render with a sub-menu', () => {
  renderWithMemoryRouter(
    <DropdownMenu
      className="testClassName"
      header={{ helpText: 'Header help text', label: 'Header label' }}
      isOpen
      items={
        <DropdownMenu.SubMenu isOpen items={items}>
          {trigger}
        </DropdownMenu.SubMenu>
      }>
      {trigger}
    </DropdownMenu>,
  );

  expect(screen.getByText('An item')).toBeVisible();
});
