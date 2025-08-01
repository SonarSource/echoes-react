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

import type { Meta, StoryObj } from '@storybook/react-vite';
import { PropsWithChildren } from 'react';
import { To } from 'react-router-dom';
import { DropdownMenu } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import { MenuButton } from '../helpers/MenuButton';

const meta: Meta<typeof DropdownMenu.ItemLink> = {
  component: DropdownMenu.ItemLink,
  decorators: [basicWrapperDecorator],
  title: 'Echoes/DropdownMenuItems/ItemLink',
  parameters: {
    controls: { exclude: ['onClick'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.ItemLink>;

const defaultProps = {
  children: 'Link label',
  helpText: 'Help text',
  prefix: '🌷',
  suffix: '🌸',
  to: 'elsewhere',
};

export const InactiveSimple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    suffix: '',
  },
  render,
};

export const ActiveSimple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    suffix: '',
    to: '/',
  },
  render,
};

export const Disabled: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isDisabled: true,
    prefix: '',
    suffix: '',
  },
  render,
};

export const InactiveWithHelpText: Story = {
  args: {
    ...defaultProps,
    prefix: '',
    suffix: '',
  },
  render,
};

export const ActiveWithHelpText: Story = {
  args: {
    ...defaultProps,
    prefix: '',
    suffix: '',
    to: '/',
  },
  render,
};

export const InactiveWithPrefix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    suffix: '',
  },
  render,
};

export const ActiveWithPrefix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    suffix: '',
    to: '/',
  },
  render,
};

export const InactiveWithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
  },
  render,
};

export const ActiveWithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    to: '/',
  },
  render,
};

export const External: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    enableOpenInNewTab: true,
    suffix: '',
  },
  render,
};

export const ExternalWithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    enableOpenInNewTab: true,
  },
  render,
};

export const Full: Story = {
  args: {
    ...defaultProps,
    ariaLabel: 'ARIA label',
    enableOpenInNewTab: true,
    to: '/',
  },
  render,
};

function render({ children, ...args }: PropsWithChildren<{ to: To }>) {
  return (
    <DropdownMenu
      isOpen
      items={<DropdownMenu.ItemLink {...args}>{children}</DropdownMenu.ItemLink>}>
      <MenuButton />
    </DropdownMenu>
  );
}
