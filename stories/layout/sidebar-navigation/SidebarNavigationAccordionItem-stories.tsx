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
import type { ComponentProps } from 'react';
import { useLocation } from 'react-router-dom';
import { useArgs } from 'storybook/preview-api';
import { Badge, IconBranch, Layout, Link } from '../../../src';
import { basicWrapperDecorator } from '../../helpers/BasicWrapper';

const baseAccordionChildren = (
  <>
    <Layout.SidebarNavigation.AccordionItem.Item to="/1">
      Item 1
    </Layout.SidebarNavigation.AccordionItem.Item>

    <Layout.SidebarNavigation.AccordionItem.Item to="/2">
      Item 2
    </Layout.SidebarNavigation.AccordionItem.Item>
  </>
);

const accordionChildrenWithIcon = (
  <>
    <Layout.SidebarNavigation.AccordionItem.Item to="/1">
      Item 1
    </Layout.SidebarNavigation.AccordionItem.Item>

    <Layout.SidebarNavigation.AccordionItem.Item Icon={IconBranch} to="/2">
      Item 2
    </Layout.SidebarNavigation.AccordionItem.Item>
  </>
);

function ControlledAccordionStory({
  isDefaultOpen: _isDefaultOpen,
  isOpen = false,
  onOpenChange,
  ...props
}: Readonly<ComponentProps<typeof Layout.SidebarNavigation.AccordionItem>>) {
  const [, updateArgs] = useArgs();

  function handleOpenChange(nextIsOpen: boolean) {
    updateArgs({ isOpen: nextIsOpen });
    onOpenChange?.(nextIsOpen);
  }

  return (
    <Layout.SidebarNavigation.AccordionItem
      {...props}
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
    />
  );
}

function AccordionStoryWithExternalNavigation(
  props: Readonly<ComponentProps<typeof Layout.SidebarNavigation.AccordionItem>>,
) {
  const { pathname } = useLocation();

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        <Link to="/">Go outside the accordion</Link>

        <Link to="/1">Go to Item 1</Link>

        <Link to="/2">Go to Item 2</Link>
      </div>

      <div>
        Current route: <code>{pathname}</code>
      </div>

      <Layout.SidebarNavigation.AccordionItem {...props} />
    </div>
  );
}

const meta: Meta<typeof Layout.SidebarNavigation.AccordionItem> = {
  title: 'Echoes Patterns/Layout/SidebarNavigation/AccordionItem',
  component: Layout.SidebarNavigation.AccordionItem,
  argTypes: {
    isDefaultOpen: {
      control: { type: 'boolean' },
    },
    isOpen: {
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
};

export default meta;

type Story = StoryObj<typeof Layout.SidebarNavigation.AccordionItem>;

export const base: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    isDefaultOpen: false,
    label: 'Accordion',
  },
};

export const suffixed: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    isDefaultOpen: false,
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
    isDefaultOpen: true,
    label: 'Accordion',
  },
};

export const autoOpensFromExternalNavigation: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    isDefaultOpen: false,
    label: 'Accordion',
  },
  render: AccordionStoryWithExternalNavigation,
};

export const withIcon: Story = {
  args: {
    Icon: IconBranch,
    children: accordionChildrenWithIcon,
    isDefaultOpen: true,
    label: 'Accordion',
  },
};

export const controlled: Story = {
  args: {
    Icon: IconBranch,
    children: baseAccordionChildren,
    isOpen: false,
    label: 'Controlled accordion',
  },
  render: ControlledAccordionStory,
};

const fourNavItems = Array.from({ length: 4 }, (_, i) => (
  <Layout.SidebarNavigation.Item Icon={IconBranch} key={i} to={`/item-${i}`}>
    Item {`${i + 1}`}
  </Layout.SidebarNavigation.Item>
));

const fourAccordionChildItems = Array.from({ length: 4 }, (_, i) => (
  <Layout.SidebarNavigation.AccordionItem.Item
    Icon={i === 3 ? IconBranch : undefined}
    key={i}
    to={`/item-${i}`}>
    Item {`${i + 1}`}
  </Layout.SidebarNavigation.AccordionItem.Item>
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
          {fourAccordionChildItems}
        </Layout.SidebarNavigation.AccordionItem>
      </Layout.SidebarNavigation.Body>
    </div>
  ),
};
