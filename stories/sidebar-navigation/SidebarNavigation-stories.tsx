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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useContext } from 'react';
import {
  Button,
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
  SidebarNavigation,
} from '../../src';
import { LayoutContext } from '../../src/components/layout/LayoutContext';

const meta: Meta<typeof SidebarNavigation> = {
  component: SidebarNavigation,
  title: 'Echoes/SidebarNavigation',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigation>;

const items = Array.from(Array(10)).map((_, i) => i + 1);

export const Full: Story = {
  parameters: {
    exclude: ['children'],
  },
  render: (args) => (
    <Layout>
      <HeaderWrapper />
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
          <SidebarNavigation.Item Icon={IconProject} enableTooltip to="/pouet">
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
            <SidebarNavigation.Item Icon={IconBranch} disableIconWhenExpanded enableTooltip to="/1">
              child 1 with a long name hahahah
            </SidebarNavigation.Item>
            <SidebarNavigation.Item Icon={IconBranch} disableIconWhenExpanded enableTooltip to="/2">
              child 2
            </SidebarNavigation.Item>
            <SidebarNavigation.Item Icon={IconBranch} disableIconWhenExpanded enableTooltip to="/3">
              child 3
            </SidebarNavigation.Item>
          </SidebarNavigation.AccordionItem>
          <SidebarNavigation.Group label="Repeated items">
            {items.map((v) => {
              return (
                <SidebarNavigation.Item Icon={IconDirectory} key={v} to={`/place-${v}`}>
                  Menu Item {v.toString()}
                </SidebarNavigation.Item>
              );
            })}
          </SidebarNavigation.Group>

          <SidebarNavigation.Group label="Group with accordions">
            <SidebarNavigation.AccordionItem Icon={IconTarget} label="a1">
              <SidebarNavigation.Item
                Icon={IconTarget}
                disableIconWhenExpanded
                enableTooltip
                to="/a1-1">
                asdf
              </SidebarNavigation.Item>
              <SidebarNavigation.Item
                Icon={IconTarget}
                disableIconWhenExpanded
                enableTooltip
                to="/a1-2">
                zxcv
              </SidebarNavigation.Item>
            </SidebarNavigation.AccordionItem>
            <SidebarNavigation.AccordionItem Icon={IconPeople} label="a2">
              <SidebarNavigation.Item
                Icon={IconPeople}
                disableIconWhenExpanded
                enableTooltip
                to="/a2-1">
                asdf
              </SidebarNavigation.Item>
              <SidebarNavigation.Item
                Icon={IconPeople}
                disableIconWhenExpanded
                enableTooltip
                to="/a2-2">
                zxcv
              </SidebarNavigation.Item>
            </SidebarNavigation.AccordionItem>
          </SidebarNavigation.Group>
        </SidebarNavigation.Body>
        <SidebarNavigation.Footer>
          <SidebarNavigation.AccordionItem Icon={IconGear} label="Settings">
            <SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenExpanded
              enableTooltip
              to="/settings-1">
              Child settings 1
            </SidebarNavigation.Item>
            <SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenExpanded
              enableTooltip
              to="/settings-2">
              Child settings 2
            </SidebarNavigation.Item>
            <SidebarNavigation.Item
              Icon={IconGear}
              disableIconWhenExpanded
              enableTooltip
              to="/settings-3">
              Child settings 3
            </SidebarNavigation.Item>
          </SidebarNavigation.AccordionItem>
        </SidebarNavigation.Footer>
      </SidebarNavigation>
      <ToggleSidebarCollapse />
    </Layout>
  ),
};

function ToggleSidebarCollapse() {
  const { isSidebarCollapsed, setIsSidebarCollapsed } = useContext(LayoutContext);
  return (
    <ContentWrapper>
      <div>
        Page content that is long enough to be visible when the sidebar is open on small screen
      </div>
      <Button
        onClick={() => setIsSidebarCollapsed((isSidebarCollapsed) => !isSidebarCollapsed)}
        variety="primary">
        {isSidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      </Button>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  grid-area: content;
  padding: 2rem;
  background-color: ${cssVar('color-background-accent-weak-default')};

  [data-sidebar-is-dockable='false'] & button {
    display: none;
  }
`;

const HeaderWrapper = styled.div`
  grid-area: header;
  height: 42px;
  background-color: ${cssVar('color-background-success-weak-default')};
`;
HeaderWrapper.displayName = 'HeaderWrapper';
