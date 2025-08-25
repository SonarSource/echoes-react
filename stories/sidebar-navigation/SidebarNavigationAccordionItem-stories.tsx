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

import { cssVar, IconBranch } from '../../src';
import { SidebarNavigationAccordionItem } from '../../src/components/sidebar-navigation/SidebarNavigationAccordionItem';
import { SidebarNavigationItem } from '../../src/components/sidebar-navigation/SidebarNavigationItem';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta = {
  title: 'Echoes/Sidebar/AccordionItem',
  component: SidebarNavigationAccordionItem,
  decorators: [
    (Story) => (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: cssVar('sidebar-navigation-sizes-width-expanded'),
        }}>
        <Story />
      </div>
    ),
    basicWrapperDecorator,
  ],
  argTypes: {
    Icon: {
      control: { type: 'select' },
      mapping: {
        default: IconBranch,
        none: undefined,
      },
      options: ['default', 'none'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof SidebarNavigationAccordionItem>;

export const base: Story = {
  args: {
    children: (
      <>
        <SidebarNavigationItem to="/1">Item 1</SidebarNavigationItem>
        <SidebarNavigationItem to="/2">Item 2</SidebarNavigationItem>
      </>
    ),
    label: 'Accordion',
  },
};
