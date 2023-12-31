/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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

import { Link } from '@sonarsource/echoes-react';
import type { Meta, StoryObj } from '@storybook/react';
import { OpenNewTabIcon } from '../src/common/icons/OpenNewTabIcon';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'Links',
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkDefault: Story = {
  args: {
    children: 'Link Default',
    to: '/path',
  },
};

export const LinkDefaultWithIcon: Story = {
  args: {
    children: 'Link Default with Icon',
    to: '/path',
    icon: <OpenNewTabIcon />,
  },
};

export const LinkExternal: Story = {
  args: {
    children: 'Link External',
    to: 'https://abc.com/path/new',
  },
};

export const LinkInsideParagraphWithStyle: Story = {
  args: {
    children: 'Link External',
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <p style={{ color: 'grey', fontSize: '1rem', fontStyle: 'italic', fontWeight: '300' }}>
      This is a paragraph with italic style and: <Link {...args} /> inside
    </p>
  ),
};

export const LinkInsideList: Story = {
  args: {
    children: 'Link External inside list',
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <ul>
      <li>List 1</li>
      <li>List 2</li>
      <li>
        List 3 with <Link {...args} />
      </li>
    </ul>
  ),
};

export const LinkInsideDivWithFlexAndStyle: Story = {
  args: {
    children: 'Link External inside div',
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '12px' }}>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
      <Link {...args} />
      <span>Span 1</span>
    </div>
  ),
};
