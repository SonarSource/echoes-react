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

import { LinkSubdued as LinkSubduedComp } from '@sonarsource/echoes-react';
import type { Meta, StoryObj } from '@storybook/react';
import { OpenNewTabIcon } from '../src/common/icons/OpenNewTabIcon';

const meta: Meta<typeof LinkSubduedComp> = {
  component: LinkSubduedComp,
  title: 'Link Subdued',
} satisfies Meta<typeof LinkSubduedComp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinkSubdued: Story = {
  args: {
    children: 'Link Subdued',
    to: '/projects/new',
  },
};

export const LinkSubduedWithIcon: Story = {
  args: {
    children: 'Link Subdued With Icon',
    to: '/projects/new',
    icon: <OpenNewTabIcon />,
  },
};

export const LinkSubduedInsideParagraphWithStyle: Story = {
  args: {
    children: 'Link Subdued',
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <p style={{ color: 'grey', fontSize: '1rem', fontWeight: '600' }}>
      This is a paragraph with grey color and a: <LinkSubduedComp {...args} /> inside
    </p>
  ),
};
