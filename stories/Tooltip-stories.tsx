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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, TooltipAlignment, TooltipPlacement, TooltipProvider } from '../src';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
  parameters: {
    controls: { exclude: ['children'] },
  },
  decorators: [
    (Story) => {
      return (
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      );
    },
  ],
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    content:
      'hello world, with a super long text to test max width, I do hope this is enough because it is becoming tedious',
    side: TooltipPlacement.Bottom,
    align: TooltipAlignment.Center,
    open: undefined,
  },
  render: (args) => (
    <div>
      <Tooltip {...args}>
        <button>Hover this button to display the tooltip</button>
      </Tooltip>
    </div>
  ),
};

export const OverflowHidden: Story = {
  args: {
    content: 'hello world',
  },
  render: (args) => (
    <div style={{ display: 'flex', height: '4054px' }}>
      <Pane>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ padding: '2px 4px' }}>
            <Tooltip content={args.content} side={TooltipPlacement.Right}>
              <a
                href="#"
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                link1
              </a>
            </Tooltip>
          </li>
          <li style={{ padding: '2px 4px' }}>
            <Tooltip content={args.content} side={TooltipPlacement.Right}>
              <a
                href="#"
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                link2
              </a>
            </Tooltip>
          </li>
          <li style={{ padding: '2px 4px' }}>
            <Tooltip content={args.content} side={TooltipPlacement.Right}>
              <a
                href="#"
                style={{
                  display: 'block',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}>
                link with a long name that should trigger the overflow
              </a>
            </Tooltip>
          </li>
        </ul>
      </Pane>
      <Pane>asdsad</Pane>
    </div>
  ),
};

const Pane = styled.div`
  height: 300px;
  width: 100px;
  background: grey;
  overflow: hidden;
  border: 1px solid black;
`;
