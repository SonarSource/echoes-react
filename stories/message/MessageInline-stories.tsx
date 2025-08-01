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
import { MessageInline, MessageInlineSize, MessageVariety } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof MessageInline> = {
  component: MessageInline,
  title: 'Echoes/Messages/MessageInline',
  argTypes: {
    size: { control: { type: 'select' }, options: Object.values(MessageInlineSize) },
    variety: { control: { type: 'select' }, options: Object.values(MessageVariety) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof MessageInline>;

export const Default: Story = {
  args: {
    children: 'Hi there',
    variety: MessageVariety.Info,
  },
};

export const InAParagraph: Story = {
  args: {
    children: "Yes, that's me we're talking about! Look how beautifully I flow within this text.",
    variety: MessageVariety.Info,
  },
  render: ({ size, ...args }) => {
    return (
      <p>
        Hi, this is a paragraph of text to showcase the fact that the following{' '}
        <MessageInline {...args} /> should flow flawlessly!
      </p>
    );
  },
};
