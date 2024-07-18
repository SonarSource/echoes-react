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

import type { Meta, StoryObj } from '@storybook/react';
import { PropsWithChildren } from 'react';
import { DropdownMenu } from '../../src';
import { BasicWrapper } from '../helpers/BasicWrapper';
import { MenuButton } from '../helpers/MenuButton';

const meta: Meta<typeof DropdownMenu.ItemButtonCheckable> = {
  component: DropdownMenu.ItemButtonCheckable,
  title: 'Echoes/DropdownMenuItems/ItemButtonCheckable',
  parameters: {
    controls: { exclude: ['onClick'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.ItemButtonCheckable>;

const defaultProps = {
  children: 'Item label',
  helpText: 'Help text',
  prefix: '🌷',
  suffix: '🌼',
};

export const UncheckedSimple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    suffix: '',
  },
  render,
};

export const CheckedSimple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isChecked: true,
    prefix: '',
    suffix: '',
  },
  render,
};

export const UncheckedDisabled: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isDisabled: true,
    prefix: '',
    suffix: '',
  },
  render,
};

export const CheckedDisabled: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isChecked: true,
    isDisabled: true,
    prefix: '',
    suffix: '',
  },
  render,
};

export const UncheckedWithHelpText: Story = {
  args: {
    ...defaultProps,
    prefix: '',
    suffix: '',
  },
  render,
};

export const CheckedWithHelpText: Story = {
  args: {
    ...defaultProps,
    isChecked: true,
    prefix: '',
    suffix: '',
  },
  render,
};

export const UncheckedWithPrefix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    suffix: '',
  },
  render,
};

export const CheckedWithPrefix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isChecked: true,
    suffix: '',
  },
  render,
};

export const UncheckedWithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
  },
  render,
};

export const CheckedWithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    isChecked: true,
    prefix: '',
  },
  render,
};

export const UncheckedFull: Story = {
  args: {
    ...defaultProps,
    ariaLabel: 'ARIA label',
  },
  render,
};

export const CheckedFull: Story = {
  args: {
    ...defaultProps,
    ariaLabel: 'ARIA label',
    isChecked: true,
  },
  render,
};

function render({ children, ...args }: PropsWithChildren<{}>) {
  return (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  );
}
