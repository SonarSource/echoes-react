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
import { ComponentProps } from 'react';
import { Text, TextSize } from '../../src/components/typography/Text';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'Echoes/Typography/Text',
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    as: 'span',
    children: 'I am a Text!',
    isHighlighted: false,
    isSubdued: false,
    size: TextSize.Default,
  },
  parameters: {
    controls: { exclude: ['children', 'colorOverride'] },
  },
};

export const OverrideColor: Story = {
  args: {
    children: 'I am a Text!',
  },
  parameters: {
    controls: { exclude: ['children', 'as', 'isSubdued'] },
  },
  render: (args: ComponentProps<typeof Text>) => (
    <>
      <p>This shows how you may override the color if necessary</p>
      <br />
      <br />
      <Text {...args} />
    </>
  ),
};

export const RichContent: Story = {
  parameters: {
    controls: { exclude: ['children', 'as', 'isSubdued'] },
  },
  render: (args: ComponentProps<typeof Text>) => (
    <>
      <p>This shows how HTML formatting tags are handled</p>
      <br />
      <br />
      <Text {...args}>
        <strong>Important things</strong>
        <br />
        <br />
        Here is the list of things I <em>need</em> to buy:
        <ul>
          <li>Cheese</li>
          <li>More Cheese</li>
          <li>
            Moar Cheese!<sub> moar moar moar</sub>
          </li>
        </ul>
        <br />
        And my <i>favorite</i> cheeses<sup>1</sup> are:
        <ol>
          <li>
            <b>Pepperjack</b>
          </li>
          <li>Rubber</li>
          <li>American</li>
        </ol>
        <br />
        <small>1. Not really cheese</small>
      </Text>
    </>
  ),
};
