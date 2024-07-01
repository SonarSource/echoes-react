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
import { PropsWithChildren, forwardRef } from 'react';
import { DropdownMenu, IconChevronDown } from '../src';

const meta: Meta<typeof DropdownMenu.ItemButtonCheckable> = {
  component: DropdownMenu.ItemButton,
  title: 'DropdownMenu.ItemButtonCheckable',
  parameters: {
    controls: { exclude: ['onClick'] },
  },
};

export default meta;

type Story = StoryObj<typeof DropdownMenu.ItemButtonCheckable>;

const MenuButton = forwardRef<HTMLButtonElement, PropsWithChildren<{}>>(
  ({ children = 'Menu', ...radixProps }, ref) => (
    <button
      ref={ref}
      style={{
        alignItems: 'center',
        backgroundColor: 'blue',
        border: 'none',
        color: 'white',
        display: 'flex',
        gap: '4px',
        opacity: 0.6,
        padding: '4px 8px',
      }}
      type="button"
      {...radixProps}>
      {children} <IconChevronDown />
    </button>
  ),
);

MenuButton.displayName = 'MenuButton';

export const UncheckedSimple: Story = {
  args: {
    children: 'Item label',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedSimple: Story = {
  args: {
    children: 'Item label',
    isChecked: true,
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const UncheckedDisabled: Story = {
  args: {
    children: 'Item label',
    isDisabled: true,
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedDisabled: Story = {
  args: {
    children: 'Item label',
    isChecked: true,
    isDisabled: true,
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const UncheckedWithHelpText: Story = {
  args: {
    children: 'Item label',
    helpText: 'Help text',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedWithHelpText: Story = {
  args: {
    children: 'Item label',
    helpText: 'Help text',
    isChecked: true,
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const UncheckedWithPrefix: Story = {
  args: {
    children: 'Item label',
    prefix: '🌷',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedWithPrefix: Story = {
  args: {
    children: 'Item label',
    isChecked: true,
    prefix: '🌷',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const UncheckedWithSuffix: Story = {
  args: {
    children: 'Item label',
    suffix: '🌼',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedWithSuffix: Story = {
  args: {
    children: 'Item label',
    isChecked: true,
    suffix: '🌼',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const UncheckedFull: Story = {
  args: {
    ariaLabel: 'ARIA label',
    children: 'Item label',
    helpText: 'Help text',
    prefix: '🌷',
    suffix: '🌼',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
      </DropdownMenu.Root>
    </BasicWrapper>
  ),
};

export const CheckedFull: Story = {
  args: {
    ariaLabel: 'ARIA label',
    children: 'Item label',
    helpText: 'Help text',
    isChecked: true,
    prefix: '🌷',
    suffix: '🌼',
  },
  render: ({ children, ...args }) => (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={
          <DropdownMenu.ItemButtonCheckable {...args}>{children}</DropdownMenu.ItemButtonCheckable>
        }>
        <MenuButton />
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
