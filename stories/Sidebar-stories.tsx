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
import {
  cssVar,
  IconBell,
  IconBranch,
  IconCalendar,
  IconOverview,
  IconSparkleInShieldError,
} from '../src';
import { SidebarNavigation } from '../src/components/sidebar-navigation/SidebarNavigation';
import { SidebarNavigationAccordionItem } from '../src/components/sidebar-navigation/SidebarNavigationAccordionItem';
import { SidebarNavigationGroup } from '../src/components/sidebar-navigation/SidebarNavigationGroup';
import { SidebarNavigationHeader } from '../src/components/sidebar-navigation/SidebarNavigationHeader';
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

export const Full: Story = {
  parameters: {
    exclude: ['children', 'Icon', 'to'],
  },
  render: () => (
    <SidebarNavigation>
      <SidebarNavigationHeader
        avatar={
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
        }
        isInteractive
        name="Hello this is a bit long, I think!"
      />
      <SidebarNavigationGroup label="Group name">
        <SidebarNavigationItem Icon={IconBell} to="somwhereelse1">
          Thing 1
        </SidebarNavigationItem>
        <SidebarNavigationItem Icon={IconCalendar} enableTooltip to="somwhereelse2">
          Amazing project 2Amazing project 2Amazing project 2Amazing project 2Amazing project 2
        </SidebarNavigationItem>
        <SidebarNavigationItem Icon={IconSparkleInShieldError} to="somwhereelse3">
          Blabla 3
        </SidebarNavigationItem>
      </SidebarNavigationGroup>
      <SidebarNavigationAccordionItem Icon={IconBranch} label="Accordion item">
        <SidebarNavigationItem enableTooltip to="/1">
          child 1 with a long name hahahah
        </SidebarNavigationItem>
        <SidebarNavigationItem enableTooltip to="/2">
          child 2
        </SidebarNavigationItem>
        <SidebarNavigationItem enableTooltip to="/3">
          child 3
        </SidebarNavigationItem>
      </SidebarNavigationAccordionItem>
    </SidebarNavigation>
  ),
};
