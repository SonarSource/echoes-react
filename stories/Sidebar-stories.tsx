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
import { IconBranch, IconOverview } from '../src';
import { SidebarNavigationAccordionItem } from '../src/components/sidebar-navigation/SidebarNavigationAccordionItem';
import { SidebarNavigationGroup } from '../src/components/sidebar-navigation/SidebarNavigationGroup';
import { SidebarNavigationItem } from '../src/components/sidebar-navigation/SidebarNavigationItem';

const meta: Meta<typeof SidebarNavigationItem> = {
  component: SidebarNavigationItem,
  title: 'Echoes/Sidebar',
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationItem>;

export const NavigationItem: Story = {
  args: {
    Icon: IconOverview,
    to: '/overview',
    children: 'Item label',
  },
  render: (args) => (
    <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
      <SidebarNavigationItem {...args} />
      <SidebarNavigationAccordionItem Icon={IconBranch} label="Accordion item">
        <>
          <SidebarNavigationItem {...args} to="/1" />
          <SidebarNavigationItem {...args} to="/2" />
          <SidebarNavigationItem {...args} to="/3" />
        </>
      </SidebarNavigationAccordionItem>
      <SidebarNavigationItem {...args} to="/4" />
    </div>
  ),
};

export const NavigationGroup: Story = {
  parameters: {
    exclude: ['children', 'Icon', 'to'],
  },
  render: () => (
    <div style={{ width: '200px' }}>
      <SidebarNavigationGroup label="Group name">
        <SidebarNavigationItem to="somwhereelse1">Thing 1</SidebarNavigationItem>
        <SidebarNavigationItem to="somwhereelse2">Amazing project 2</SidebarNavigationItem>
        <SidebarNavigationItem to="somwhereelse3">Blabla 3</SidebarNavigationItem>
      </SidebarNavigationGroup>
    </div>
  ),
};
