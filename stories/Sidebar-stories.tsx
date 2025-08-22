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

import { useDebouncedCallback } from '@mantine/hooks';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { PropsWithChildren, useState } from 'react';
import {
  ButtonIcon,
  cssVar,
  IconBell,
  IconBranch,
  IconCalendar,
  IconExpand,
  IconGear,
  IconOverview,
  IconSparkleInShieldError,
} from '../src';
import { SidebarNavigation } from '../src/components/sidebar-navigation/SidebarNavigation';
import { SidebarNavigationAccordionItem } from '../src/components/sidebar-navigation/SidebarNavigationAccordionItem';
import { SidebarNavigationGroup } from '../src/components/sidebar-navigation/SidebarNavigationGroup';
import { SidebarNavigationHeader } from '../src/components/sidebar-navigation/SidebarNavigationHeader';
import { SidebarNavigationItem } from '../src/components/sidebar-navigation/SidebarNavigationItem';
import {
  SidebarNavigationBody,
  SidebarNavigationFooter,
} from '../src/components/sidebar-navigation/SidebarNavigationItemStyles';

const meta: Meta<typeof SidebarNavigationItem> = {
  component: SidebarNavigationItem,
  title: 'Echoes/Sidebar',
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationItem>;

export const NavigationAccordionItem: Story = {
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
          <SidebarNavigationItem to="/1">Sub Item 1</SidebarNavigationItem>
          <SidebarNavigationItem to="/2">Sub Item 2</SidebarNavigationItem>
          <SidebarNavigationItem to="/3">Sub Item 3</SidebarNavigationItem>
        </>
      </SidebarNavigationAccordionItem>
      <SidebarNavigationItem to="/4">Item Label 2</SidebarNavigationItem>
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

const items = Array.from(Array(10));

export const Full: Story = {
  parameters: {
    exclude: ['children', 'Icon', 'to'],
  },
  render: () => (
    <CollapseStateManager>
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
        {items.map((_, i) => {
          return (
            <SidebarNavigationItem key={i} to={`/place-${i}`}>
              Menu Item {i.toString()}
            </SidebarNavigationItem>
          );
        })}
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
    </CollapseStateManager>
  ),
};

function CollapseStateManager({ children }: PropsWithChildren) {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);

  const debounceOpen = useDebouncedCallback((v: boolean) => {
    setOpen(v);
  }, 300);

  return (
    <div>
      <div
        onMouseEnter={() => debounceOpen(true)}
        onMouseLeave={() => debounceOpen(false)}
        style={{
          boxShadow: open && collapsed ? '4px 0 4px 0 black' : 'none',
          display: 'inline-block',
          height: 'calc(100vh - 140px)',
        }}>
        <SidebarNavigation isCollapsed={collapsed && !open}>{children}</SidebarNavigation>
      </div>
      <br />
      <ButtonIcon
        Icon={IconExpand}
        ariaLabel="toggle"
        onClick={() => {
          setCollapsed((s) => !s);
        }}
        size="medium"
        style={{ marginTop: '32px' }}
        variety="danger"
      />
    </div>
  );
}
