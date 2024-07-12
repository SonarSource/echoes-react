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
import { To } from 'react-router-dom';
import { MenuButton } from '../.storybook/MenuButton';
import { DropdownMenu } from '../src';

const meta: Meta<typeof DropdownMenu.ItemLinkDownload> = {
  component: DropdownMenu.ItemLinkDownload,
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

function render({ children, ...args }: PropsWithChildren<{ download: string; to: To }>) {
  return (
    <BasicWrapper>
      <DropdownMenu.Root
        isOpen
        items={<DropdownMenu.ItemLinkDownload {...args}>{children}</DropdownMenu.ItemLinkDownload>}>
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
