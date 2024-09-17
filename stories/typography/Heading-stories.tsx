/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps } from 'react';
import { Heading, HeadingSize } from '../../src/components/typography/Heading';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof Heading> = {
  component: Heading,
  title: 'Echoes/Typography/Heading',
  argTypes: {
    size: { control: { type: 'select' }, options: [...Object.values(HeadingSize), undefined] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Heading>;

const render = (args: ComponentProps<typeof Heading>) => (
  <div>
    <Heading {...args} />
    <span>Some other text below the heading to show the spacing</span>
  </div>
);

export const Default: Story = {
  args: {
    as: 'h1',
    children: 'The text of the heading',
    hasMarginBottom: false,
  },
  render,
};
