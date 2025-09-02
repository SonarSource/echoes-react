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
import { IconBranch, Layout } from '../../../src';
import { basicWrapperDecorator } from '../../helpers/BasicWrapper';

const meta: Meta = {
  title: 'Echoes/Layout/SidebarNavigation/AccordionItem',
  component: Layout.SidebarNavigation.AccordionItem,
  decorators: [
    (Story) => (
      <Layout.SidebarNavigation.Body>
        <Story />
      </Layout.SidebarNavigation.Body>
    ),
    basicWrapperDecorator,
  ],
};

export default meta;

type Story = StoryObj<typeof Layout.SidebarNavigation.AccordionItem>;

export const base: Story = {
  args: {
    Icon: IconBranch,
    children: (
      <>
        <Layout.SidebarNavigation.Item Icon={IconBranch} disableIconWhenSidebarOpen to="/1">
          Item 1
        </Layout.SidebarNavigation.Item>
        <Layout.SidebarNavigation.Item Icon={IconBranch} disableIconWhenSidebarOpen to="/2">
          Item 2
        </Layout.SidebarNavigation.Item>
      </>
    ),
    label: 'Accordion',
  },
};
