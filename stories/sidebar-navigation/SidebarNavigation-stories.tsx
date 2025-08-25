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
  SidebarNavigation,
} from '../../src';

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
        <SidebarNavigation.Header
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
        <SidebarNavigation.Body>
          <SidebarNavigation.Item enableTooltip to="/pouet">
            blablablba
          </SidebarNavigation.Item>
          <SidebarNavigation.Group label="Group name">
            <SidebarNavigation.Item Icon={IconBell} to="somwhereelse1">
              Thing 1
            </SidebarNavigation.Item>
            <SidebarNavigation.Item Icon={IconCalendar} enableTooltip to="somwhereelse2">
              Amazing project 2Amazing project 2Amazing project 2Amazing project 2Amazing project 2
            </SidebarNavigation.Item>
            <SidebarNavigation.Item Icon={IconSparkleInShieldError} to="somwhereelse3">
              Blabla 3
            </SidebarNavigation.Item>
          </SidebarNavigation.Group>
          <SidebarNavigation.AccordionItem Icon={IconBranch} label="Accordion item">
            <SidebarNavigation.Item enableTooltip to="/1">
              child 1 with a long name hahahah
            </SidebarNavigation.Item>
            <SidebarNavigation.Item enableTooltip to="/2">
              child 2
            </SidebarNavigation.Item>
            <SidebarNavigation.Item enableTooltip to="/3">
              child 3
            </SidebarNavigation.Item>
          </SidebarNavigation.AccordionItem>
          <SidebarNavigation.Group label="Repeated items">
            {items.map((v) => {
              return (
                <SidebarNavigation.Item key={v} to={`/place-${v}`}>
                  Menu Item {v.toString()}
                </SidebarNavigation.Item>
              );
            })}
          </SidebarNavigation.Group>

          <SidebarNavigation.Group label="Group with accordions">
            <SidebarNavigation.AccordionItem label="a1">
              <SidebarNavigation.Item enableTooltip to="/a1-1">
                asdf
              </SidebarNavigation.Item>
              <SidebarNavigation.Item enableTooltip to="/a1-2">
                zxcv
              </SidebarNavigation.Item>
            </SidebarNavigation.AccordionItem>
            <SidebarNavigation.AccordionItem label="a2">
              <SidebarNavigation.Item enableTooltip to="/a2-1">
                asdf
              </SidebarNavigation.Item>
              <SidebarNavigation.Item enableTooltip to="/a2-2">
                zxcv
              </SidebarNavigation.Item>
            </SidebarNavigation.AccordionItem>
          </SidebarNavigation.Group>
        </SidebarNavigation.Body>
        <SidebarNavigation.Footer>
          <SidebarNavigation.AccordionItem Icon={IconGear} label="Settings">
            <SidebarNavigation.Item enableTooltip to="/settings-1">
              Child settings 1
            </SidebarNavigation.Item>
            <SidebarNavigation.Item enableTooltip to="/settings-2">
              Child settings 2
            </SidebarNavigation.Item>
            <SidebarNavigation.Item enableTooltip to="/settings-3">
              Child settings 3
            </SidebarNavigation.Item>
          </SidebarNavigation.AccordionItem>
        </SidebarNavigation.Footer>
      </SidebarNavigation>
    </div>
  ),
};
