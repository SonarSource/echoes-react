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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Badge,
  DropdownMenu,
  DropdownMenuAlign,
  IconBug,
  IconGear,
  IconKey,
  LinkStandalone,
  Theme,
  ThemeProvider,
} from '../../src';
import { BasicWrapper } from '../helpers/BasicWrapper';
import { MenuButton } from '../helpers/MenuButton';

import { cssVar } from '~utils/design-tokens';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'Echoes/DropdownMenu',
  parameters: {
    controls: { exclude: ['children', 'id'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu>;

const items = (
  <>
    <DropdownMenu.ItemButton>Your account</DropdownMenu.ItemButton>

    <DropdownMenu.ItemLink to="/">Your organization</DropdownMenu.ItemLink>

    <DropdownMenu.Separator />

    <DropdownMenu.GroupLabel>Enterprises</DropdownMenu.GroupLabel>

    <DropdownMenu.ItemButton
      prefix={<IconGear color="echoes-color-icon-bold" />}
      suffix={<Badge variety="info">Public</Badge>}>
      SonarQube Cloud
    </DropdownMenu.ItemButton>

    <DropdownMenu.ItemButton
      helpText={
        <>
          You can only analyze your public/
          <br />
          open source project
        </>
      }
      prefix={<IconBug color="echoes-color-icon-default" />}>
      SonarQube Server
    </DropdownMenu.ItemButton>

    <DropdownMenu.Separator />

    <DropdownMenu.SubMenu
      items={
        <>
          <DropdownMenu.ItemButton>First sub-item</DropdownMenu.ItemButton>

          <DropdownMenu.ItemLink to="/two">Second sub-item</DropdownMenu.ItemLink>
        </>
      }>
      Sub-menu
    </DropdownMenu.SubMenu>

    <DropdownMenu.Separator />

    <DropdownMenu.GroupLabel>Theme</DropdownMenu.GroupLabel>

    <DropdownMenu.ItemButtonCheckable isChecked>Light Mode</DropdownMenu.ItemButtonCheckable>

    <DropdownMenu.ItemButtonCheckable>Dark Mode</DropdownMenu.ItemButtonCheckable>

    <DropdownMenu.Separator />

    <DropdownMenu.ItemButtonDestructive>Delete Account</DropdownMenu.ItemButtonDestructive>
  </>
);

export const MenuWithVariousItems: Story = {
  args: {
    header: {
      label: 'JohnDoeJohnDoeJohnDoe JohnDoeJohnDoeJohnDoe',
      helpText: 'john.doe@sonarsource.com',
      suffix: <IconKey color="echoes-color-icon-bold" />,
    },
  },
  render: (args) => (
    <BasicWrapper>
      <DropdownMenu {...args} className="it__test" items={items}>
        <MenuButton />
      </DropdownMenu>

      <br />

      <DropdownMenu {...args} align={DropdownMenuAlign.Start} id="secondDropdown" items={items}>
        <LinkStandalone to="#">Menu link</LinkStandalone>
      </DropdownMenu>
    </BasicWrapper>
  ),
};

export const MenuInADarkSideBar: Story = {
  render: () => (
    <ThemeProvider theme={Theme.dark}>
      <FakeDarkSideBar>
        <DropdownMenu align={DropdownMenuAlign.Start} items={items}>
          <MenuButton />
        </DropdownMenu>
      </FakeDarkSideBar>
    </ThemeProvider>
  ),
};

export const MenuWithADisabledButton: Story = {
  render: () => (
    <DropdownMenu align={DropdownMenuAlign.Start} items={items}>
      <MenuButton isDisabled variety="primary">
        Trigger
      </MenuButton>
    </DropdownMenu>
  ),
};

const FakeDarkSideBar = styled.div`
  background-color: ${cssVar('color-surface-default')};
  padding: 8px;
  height: 50vh;
  width: fit-content;
`;
