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
import { PropsWithChildren } from 'react';
import { DropdownMenu } from '../../src';
import { MenuButton } from './MenuButton';

const meta: Meta<typeof DropdownMenu.ItemButton> = {
  component: DropdownMenu.ItemButton,
  title: 'Echoes/DropdownMenuItems/ItemButton',
  parameters: {
    controls: { exclude: ['onClick'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.ItemButton>;

const defaultProps = {
  children: 'Item label',
  helpText: 'Help text',
  prefix: '🌷',
  suffix: '🌼',
};

export const Simple: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
    suffix: '',
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

export const WithHelpText: Story = {
  args: {
    ...defaultProps,
    prefix: '',
    suffix: '',
  },
  render,
};

export const WithPrefix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    suffix: '',
  },
  render,
};

export const WithSuffix: Story = {
  args: {
    ...defaultProps,
    helpText: '',
    prefix: '',
  },
  render,
};

export const Full: Story = {
  args: {
    ...defaultProps,
    ariaLabel: 'ARIA label',
  },
  render,
};

function render({ children, ...args }: PropsWithChildren<{}>) {
  return (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={<DropdownMenu.ItemButton {...args}>{children}</DropdownMenu.ItemButton>}>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  );
}

const BasicWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 0;
`;
