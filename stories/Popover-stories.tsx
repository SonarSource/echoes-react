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
import { Button, LinkStandalone, Popover, Text } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Popover> = {
  component: Popover,
  title: 'Echoes/Popover',
  parameters: {
    controls: { exclude: ['children'] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Popover>;

export const Basic: Story = {
  args: {
    title: 'Explanation',
    description:
      'This is a more complete explanation to detail the concepts and practices that are required to understand said explanation. It is fairly easy to assess how this important text is made important by its self-sufficient importance.',
  },
  render: (args) => (
    <Popover {...args}>
      <Button>Click this button to display the Popover</Button>
    </Popover>
  ),
};

export const ExtraContent: Story = {
  args: {
    title: 'Details',
    description: 'Follow these instructions:',
  },
  render: (args) => (
    <Popover
      {...args}
      extraContent={
        <Text>
          <span>First, click on the thing, then the other thing.</span>
          <ul>
            <li>Field 1: put your name</li>
            <li>Field 2: put your favorite food item</li>
          </ul>
          <span>Finally, profit!</span>
        </Text>
      }
      footer={
        <>
          <LinkStandalone to="#">Go to the config page</LinkStandalone>
          {' - '}
          <LinkStandalone to="#">Go to the docs</LinkStandalone>
        </>
      }>
      <Button>Click this button to display the Popover</Button>
    </Popover>
  ),
};
