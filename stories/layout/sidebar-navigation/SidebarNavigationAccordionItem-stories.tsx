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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, cssVar, IconBranch, Layout } from '../../../src';
import { basicWrapperDecorator } from '../../helpers/BasicWrapper';

const baseAccordionChildren = (
  <>
    <Layout.SidebarNavigation.Item Icon={IconBranch} to="/1">
      Item 1
    </Layout.SidebarNavigation.Item>

    <Layout.SidebarNavigation.Item Icon={IconBranch} to="/2">
      Item 2
    </Layout.SidebarNavigation.Item>
  </>
);

const dockedSidebarAccordionChildren = (
  <>
    <Layout.SidebarNavigation.Item Icon={IconBranch} disableIconWhenSidebarOpen to="/1">
      Icon hidden while sidebar is open
    </Layout.SidebarNavigation.Item>

    <Layout.SidebarNavigation.Item Icon={IconBranch} to="/2">
      Icon stays visible while sidebar is open
    </Layout.SidebarNavigation.Item>
  </>
);

const meta: Meta<typeof Layout.SidebarNavigation.AccordionItem> = {
  title: 'Echoes/Layout/SidebarNavigation/AccordionItem',
  component: Layout.SidebarNavigation.AccordionItem,
  argTypes: {
    defaultOpen: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <Layout.SidebarNavigation.Body>
        <Story />
      </Layout.SidebarNavigation.Body>
    ),
    basicWrapperDecorator,
  ],
  render: ({ defaultOpen = false, ...args }) => (
    <Layout.SidebarNavigation.AccordionItem
      defaultOpen={defaultOpen}
      key={`accordion-default-open-${defaultOpen.toString()}`}
      {...args}
    />
  ),
};

export default meta;

type Story = StoryObj<typeof Layout.SidebarNavigation.AccordionItem>;

export const base: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    defaultOpen: false,
    label: 'Accordion',
  },
};

export const suffixed: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    defaultOpen: false,
    label: 'Accordion',
    suffix: (
      <Badge isHighContrast variety="highlight">
        New
      </Badge>
    ),
  },
};

export const withDefaultOpen: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    defaultOpen: true,
    label: 'Accordion',
  },
  parameters: {
    controls: {
      include: ['defaultOpen'],
    },
  },
};

export const withDisableIconWhenSidebarOpen: Story = {
  args: {
    Icon: IconBranch,
    defaultOpen: true,
    label: 'Accordion',
  },
  parameters: {
    controls: {
      include: ['defaultOpen'],
    },
  },
  render: ({ defaultOpen = true, ...args }) => (
    <div
      data-sidebar-docked="true"
      style={{ width: cssVar('layout-sidebar-navigation-sizes-width-open') }}>
      <Layout.SidebarNavigation.AccordionItem
        defaultOpen={defaultOpen}
        key={`accordion-disable-icon-when-sidebar-open-${defaultOpen.toString()}`}
        {...args}>
        {dockedSidebarAccordionChildren}
      </Layout.SidebarNavigation.AccordionItem>
    </div>
  ),
};

const fourNavItems = Array.from({ length: 4 }, (_, i) => (
  <Layout.SidebarNavigation.Item Icon={IconBranch} key={i} to={`/item-${i}`}>
    Item {`${i + 1}`}
  </Layout.SidebarNavigation.Item>
));

export const scrollLastChildIntoView: Story = {
  decorators: [basicWrapperDecorator],
  args: {
    scrollLastChildIntoViewOnOpen: true,
  },
  render: ({ scrollLastChildIntoViewOnOpen }) => (
    <div style={{ border: '2px dashed #ccc', height: '200px', overflow: 'auto', width: '240px' }}>
      <Layout.SidebarNavigation.Body>
        {fourNavItems}

        <Layout.SidebarNavigation.AccordionItem
          Icon={IconBranch}
          label="Accordion"
          scrollLastChildIntoViewOnOpen={scrollLastChildIntoViewOnOpen}>
          {fourNavItems}
        </Layout.SidebarNavigation.AccordionItem>
      </Layout.SidebarNavigation.Body>
    </div>
  ),
};
