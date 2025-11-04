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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { ComponentProps, PropsWithChildren } from 'react';
import { DropdownMenu } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { MenuButton } from '../helpers/MenuButton';

const meta: Meta<typeof DropdownMenu.ItemLinkDownload> = {
  component: DropdownMenu.ItemLinkDownload,
  decorators: [basicWrapperDecorator],
  title: 'Echoes/DropdownMenuItems/ItemLinkDownload',
  parameters: {
    controls: { exclude: ['onClick'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.ItemLinkDownload>;

const defaultProps = {
  children: 'Download favicon',
  download: 'favicon.svg',
  helpText: 'Help text',
  to: '/favicon.svg',
};

export const Simple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
  },
  render,
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isDisabled: true,
  },
  render,
};

export const WithHelpText: Story = {
  args: {
    ...defaultProps,
  },
  render,
};

function render({
  children,
  ...args
}: PropsWithChildren<ComponentProps<typeof DropdownMenu.ItemLinkDownload>>) {
  return (
    <DropdownMenu
      isOpen
      items={<DropdownMenu.ItemLinkDownload {...args}>{children}</DropdownMenu.ItemLinkDownload>}>
      <MenuButton />
    </DropdownMenu>
  );
}
