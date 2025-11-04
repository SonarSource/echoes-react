/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import { PropsWithChildren } from 'react';
import {
  Badge,
  cssVar,
  IconBell,
  IconBranch,
  IconCalendar,
  IconDirectory,
  IconGear,
  IconPeople,
  IconProject,
  IconSparkleInShieldError,
  IconTarget,
  Layout,
  LogoSonarQubeServer,
  MessageCallout,
} from '../../../src';

const meta: Meta<typeof Layout.SidebarNavigation> = {
  component: Layout.SidebarNavigation,
  title: 'Echoes/Layout/SidebarNavigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof Layout.SidebarNavigation>;

const items = Array.from({ length: 10 }).map((_, i) => i + 1);

export const Full: Story = {
  parameters: {
    exclude: ['children'],
  },
  render: (args) => (
    <LayoutWithSidebarStateSaved>
      <Layout.GlobalNavigation>
        <Layout.GlobalNavigation.Primary>
          <Layout.GlobalNavigation.Home>
            <LogoSonarQubeServer hasText size="small" />
          </Layout.GlobalNavigation.Home>

          <Layout.GlobalNavigation.ItemsContainer>
            <Layout.GlobalNavigation.Item to="/">Home</Layout.GlobalNavigation.Item>
            <Layout.GlobalNavigation.Item to="/qp">Quality Profiles</Layout.GlobalNavigation.Item>
            <Layout.GlobalNavigation.Item to="/rules">Rules</Layout.GlobalNavigation.Item>
          </Layout.GlobalNavigation.ItemsContainer>
        </Layout.GlobalNavigation.Primary>
      </Layout.GlobalNavigation>
      <Layout.SidebarNavigation {...args}>
        <Layout.SidebarNavigation.Header
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
        <Layout.SidebarNavigation.Body>
          <Layout.SidebarNavigation.Item Icon={IconProject} enableTooltip to="/pouet">
            blablablba
          </Layout.SidebarNavigation.Item>
          <Layout.SidebarNavigation.Group label="Group name">
            <Layout.SidebarNavigation.Item Icon={IconBell} to="somwhereelse1">
              Thing 1
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item Icon={IconCalendar} enableTooltip to="somwhereelse2">
              Amazing project 2Amazing project 2Amazing project 2Amazing project 2Amazing project 2
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item
              Icon={IconSparkleInShieldError}
              suffix={<NewSuffix />}
              to="somwhereelse3">
              Blabla 3
            </Layout.SidebarNavigation.Item>
          </Layout.SidebarNavigation.Group>
          <Layout.SidebarNavigation.AccordionItem
            Icon={IconBranch}
            enableTooltip
            label="Accordion Item with a long name"
            suffix={<NewSuffix />}>
            <Layout.SidebarNavigation.Item
              Icon={IconBranch}
              disableIconWhenSidebarOpen
              enableTooltip
              suffix={<NewSuffix />}
              to="/1">
              child 1 with a long name hahahah
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item
              Icon={IconBranch}
              disableIconWhenSidebarOpen
              enableTooltip
              to="/2">
              child 2
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item
              Icon={IconBranch}
              disableIconWhenSidebarOpen
              enableTooltip
              to="/3">
              child 3
            </Layout.SidebarNavigation.Item>
          </Layout.SidebarNavigation.AccordionItem>
          <Layout.SidebarNavigation.Group label="Repeated items">
            {items.map((v) => {
              return (
                <Layout.SidebarNavigation.Item Icon={IconDirectory} key={v} to={`/place-${v}`}>
                  Menu Item {v.toString()}
                </Layout.SidebarNavigation.Item>
              );
            })}
          </Layout.SidebarNavigation.Group>

          <Layout.SidebarNavigation.Group label="Group with accordions">
            <Layout.SidebarNavigation.AccordionItem Icon={IconTarget} label="a1">
              <Layout.SidebarNavigation.Item
                Icon={IconTarget}
                disableIconWhenSidebarOpen
                enableTooltip
                to="/a1-1">
                asdf
              </Layout.SidebarNavigation.Item>
              <Layout.SidebarNavigation.Item
                Icon={IconTarget}
                disableIconWhenSidebarOpen
                enableTooltip
                to="/a1-2">
                zxcv
              </Layout.SidebarNavigation.Item>
            </Layout.SidebarNavigation.AccordionItem>
            <Layout.SidebarNavigation.AccordionItem Icon={IconPeople} label="a2">
              <Layout.SidebarNavigation.Item
                Icon={IconPeople}
                disableIconWhenSidebarOpen
                enableTooltip
                to="/a2-1">
                asdf
              </Layout.SidebarNavigation.Item>
              <Layout.SidebarNavigation.Item
                Icon={IconPeople}
                disableIconWhenSidebarOpen
                enableTooltip
                to="/a2-2">
                zxcv
              </Layout.SidebarNavigation.Item>
            </Layout.SidebarNavigation.AccordionItem>
          </Layout.SidebarNavigation.Group>
        </Layout.SidebarNavigation.Body>
        <Layout.SidebarNavigation.Footer>
          <Layout.SidebarNavigation.AccordionItem Icon={IconGear} label="Settings">
            <Layout.SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenSidebarOpen
              enableTooltip
              to="/settings-1">
              Child settings 1
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenSidebarOpen
              enableTooltip
              to="/settings-2">
              Child settings 2
            </Layout.SidebarNavigation.Item>
            <Layout.SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenSidebarOpen
              enableTooltip
              to="/settings-3">
              Child settings 3
            </Layout.SidebarNavigation.Item>
          </Layout.SidebarNavigation.AccordionItem>
        </Layout.SidebarNavigation.Footer>
      </Layout.SidebarNavigation>
      <Layout.ContentGrid>
        <Layout.PageGrid width="fluid">
          <Layout.PageContent>
            Page content that is long enough to be visible when the sidebar is open on a small
            screen.
            <br />
            <br />
            <MessageCallout variety="info">
              Your last choice for docking the sidebar is saved in the browser local storage.
            </MessageCallout>
          </Layout.PageContent>
        </Layout.PageGrid>
      </Layout.ContentGrid>
    </LayoutWithSidebarStateSaved>
  ),
};

function LayoutWithSidebarStateSaved({ children }: PropsWithChildren) {
  const isSidebarDocked = globalThis.localStorage.getItem('echoes-sidebar-docked');
  return (
    <Layout
      isSidebarInitiallyDocked={isSidebarDocked === null ? undefined : isSidebarDocked === 'true'}
      onSidebarDockedChange={(isDocked) => {
        globalThis.localStorage.setItem('echoes-sidebar-docked', isDocked.toString());
      }}>
      {children}
    </Layout>
  );
}

function NewSuffix() {
  return (
    <Badge isHighContrast variety="highlight">
      New!
    </Badge>
  );
}
