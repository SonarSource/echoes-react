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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { cssVar, DropdownMenu, SidebarNavigation } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta = {
  title: 'Echoes/SidebarNavigation/Header',
  component: SidebarNavigation.Header,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: cssVar('sidebar-navigation-sizes-width-expanded'),
        }}>
        <Story />
      </div>
    ),
    basicWrapperDecorator,
  ],
  argTypes: {
    avatar: {
      control: { type: 'select' },
      mapping: {
        default: (
          <div
            style={{
              backgroundColor: cssVar('color-background-emphasis-active'),
              color: cssVar('color-text-on-color'),
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: cssVar('border-radius-400'),
            }}>
            S
          </div>
        ),
        none: undefined,
      },
      options: ['default', 'none'],
    },
    qualifier: { type: 'string' },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation.Header>;

export const base: Story = {
  args: {
    avatar: 'none',
    isInteractive: false,
    name: 'Administration',
  },
};

export const dropdown: Story = {
  args: {
    avatar: 'default',
    isInteractive: true,
    qualifier: 'Project',
    name: 'SonarQube Server - webapp',
  },
  render(args) {
    return (
      <DropdownMenu
        align="end"
        items={
          <>
            <DropdownMenu.ItemButton>Project 1</DropdownMenu.ItemButton>
            <DropdownMenu.ItemButton>Other project</DropdownMenu.ItemButton>
          </>
        }>
        <SidebarNavigation.Header {...args} />
      </DropdownMenu>
    );
  },
};
