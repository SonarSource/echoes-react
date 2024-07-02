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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { MenuButton } from '../.storybook/MenuButton';
import { DropdownMenu, IconBug, IconGear, LinkStandalone } from '../src';

const meta: Meta<typeof DropdownMenu.Root> = {
  component: DropdownMenu.Root,
  title: 'DropdownMenu',
  parameters: {
    controls: { exclude: ['children'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.Root>;

const StyledBadge = styled.span`
  background-color: var(--echoes-color-background-default-active);
  border-radius: 4px;
  color: var(--echoes-color-text-default);
  font: var(--echoes-typography-paragraph-small-semi-bold);
  margin-left: 1rem;
  padding: 0px 8px;
  text-transform: uppercase;
  vertical-align: middle;
`;

const items = (
  <>
    <DropdownMenu.ItemButton>Your account</DropdownMenu.ItemButton>

    <DropdownMenu.ItemButton>Your organization</DropdownMenu.ItemButton>

    <DropdownMenu.Separator />

    <DropdownMenu.GroupLabel>Enterprises</DropdownMenu.GroupLabel>

    <DropdownMenu.ItemButton
      prefix={<IconGear color="echoes-color-icon-danger" />}
      suffix={<StyledBadge>Public</StyledBadge>}>
      SonarCloud
    </DropdownMenu.ItemButton>

    <DropdownMenu.ItemButton
      helpText={
        <>
          You can only analyze your public/
          <br />
          open source project
        </>
      }
      prefix={<IconBug color="echoes-color-icon-accent" />}>
      SonarQube
    </DropdownMenu.ItemButton>

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
      label: 'John Doe',
      helpText: 'john.doe@sonarsource.com',
    },
  },
  render: (args) => (
    <BasicWrapper>
      <DropdownMenu.Root {...args} className="it__test" items={items}>
        <MenuButton />
      </DropdownMenu.Root>

      <br />

      <DropdownMenu.Root {...args} align="start" id="secondDropdown" items={items}>
        <LinkStandalone to="#">Menu link</LinkStandalone>
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

const BasicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;
