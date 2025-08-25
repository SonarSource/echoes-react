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
  IconGear,
  IconSparkleInShieldError,
} from '../../src';
import { SidebarNavigation } from '../../src/components/sidebar-navigation/SidebarNavigation';
import { SidebarNavigationAccordionItem } from '../../src/components/sidebar-navigation/SidebarNavigationAccordionItem';
import { SidebarNavigationGroup } from '../../src/components/sidebar-navigation/SidebarNavigationGroup';
import { SidebarNavigationHeader } from '../../src/components/sidebar-navigation/SidebarNavigationHeader';
import { SidebarNavigationItem } from '../../src/components/sidebar-navigation/SidebarNavigationItem';
import {
  SidebarNavigationBody,
  SidebarNavigationFooter,
} from '../../src/components/sidebar-navigation/SidebarNavigationItemStyles';

const meta: Meta<typeof SidebarNavigation> = {
  component: SidebarNavigation,
  title: 'Echoes/Sidebar',
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

const items = Array.from(Array(10)).map((_, i) => i + 1);

export const Full: Story = {
  parameters: {
    exclude: ['children'],
  },
  args: {
    isCollapsed: false,
  },
  render: (args) => (
    <div style={{ display: 'flex', height: 'calc(100vh - 32px)' }}>
      <SidebarNavigation {...args}>
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
        <SidebarNavigationBody>
          <SidebarNavigationItem enableTooltip to="/pouet">
            blablablba
          </SidebarNavigationItem>
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
          <SidebarNavigationGroup label="Repeated items">
            {items.map((v) => {
              return (
                <SidebarNavigationItem key={v} to={`/place-${v}`}>
                  Menu Item {v.toString()}
                </SidebarNavigationItem>
              );
            })}
          </SidebarNavigationGroup>

          <SidebarNavigationGroup label="Group with accordions">
            <SidebarNavigationAccordionItem label="a1">
              <SidebarNavigationItem enableTooltip to="/a1-1">
                asdf
              </SidebarNavigationItem>
              <SidebarNavigationItem enableTooltip to="/a1-2">
                zxcv
              </SidebarNavigationItem>
            </SidebarNavigationAccordionItem>
            <SidebarNavigationAccordionItem label="a2">
              <SidebarNavigationItem enableTooltip to="/a2-1">
                asdf
              </SidebarNavigationItem>
              <SidebarNavigationItem enableTooltip to="/a2-2">
                zxcv
              </SidebarNavigationItem>
            </SidebarNavigationAccordionItem>
          </SidebarNavigationGroup>
        </SidebarNavigationBody>
        <SidebarNavigationFooter>
          <SidebarNavigationAccordionItem Icon={IconGear} label="Settings">
            <SidebarNavigationItem enableTooltip to="/settings-1">
              Child settings 1
            </SidebarNavigationItem>
            <SidebarNavigationItem enableTooltip to="/settings-2">
              Child settings 2
            </SidebarNavigationItem>
            <SidebarNavigationItem enableTooltip to="/settings-3">
              Child settings 3
            </SidebarNavigationItem>
          </SidebarNavigationAccordionItem>
        </SidebarNavigationFooter>
      </SidebarNavigation>
    </div>
  ),
};
