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
import { Link as LinkComp, LinkHighlight } from '../../src';

const meta: Meta<typeof LinkComp> = {
  component: LinkComp,
  title: 'Echoes/Link/Link',
  argTypes: {
    highlight: {
      control: {
        type: 'select',
      },
      options: Object.values(LinkHighlight),
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkComp>;

export const Link: Story = {
  args: {
    children: 'My Link',
    highlight: LinkHighlight.Accent,
    to: '/path',
  },
};

export const LinkExternal: Story = {
  args: {
    children: 'External link',
    highlight: LinkHighlight.Subdued,
    shouldOpenInNewTab: true,
    to: 'https://abc.com/path/new',
  },
};

export const LinkInsideParagraphWithStyle: Story = {
  args: {
    children: 'an external link',
    highlight: LinkHighlight.CurrentColor,
    shouldOpenInNewTab: true,
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <p style={{ color: 'grey', fontSize: '1rem', fontStyle: 'italic', fontWeight: '300' }}>
      This is a paragraph with italic style and: <LinkComp {...args} /> inside
    </p>
  ),
};

export const LinkInsideList: Story = {
  args: {
    children: 'External link inside a list',
    highlight: LinkHighlight.Default,
    shouldOpenInNewTab: true,
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <ul>
      <li>List 1</li>
      <li>List 2</li>
      <li>
        List 3 with <LinkComp {...args} />
      </li>
    </ul>
  ),
};

export const LinkInsideDivWithFlexAndStyle: Story = {
  args: {
    children: 'External link inside a div',
    highlight: LinkHighlight.CurrentColor,
    shouldOpenInNewTab: true,
    to: 'https://abc.com/path/new',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'start', gap: '12px' }}>
      <p>Paragraph 1</p>
      <p>Paragraph 2</p>
      <LinkComp {...args} />
      <span>Span 1</span>
    </div>
  ),
};
