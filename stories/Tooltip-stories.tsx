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

import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, Link, LinkStandalone, Tooltip, TooltipSide } from '../src';
import { BasicWrapper } from './helpers/BasicWrapper';

import { cssVar } from '~utils/design-tokens';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Echoes/Tooltip',
  parameters: {
    controls: { exclude: ['children'] },
  },
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Basic: Story = {
  args: {
    content:
      'This tooltip content is intentionaly very long to test the max width. It should have wrapped already.',
  },
  render: (args) => (
    <BasicWrapper>
      <Tooltip {...args}>
        <Button>Hover this button to display the tooltip</Button>
      </Tooltip>

      <br />

      <Tooltip {...args}>
        <LinkStandalone to="#">Hover this link to display the tooltip</LinkStandalone>
      </Tooltip>
    </BasicWrapper>
  ),
};

export const OverflowHidden: Story = {
  args: {
    content: 'hello world',
    side: TooltipSide.Right,
  },
  render: (args) => (
    <div>
      <p>
        This story&apos;s purpose is to check the behavior of tooltips in a pane that does not
        overflow
      </p>
      <Wrapper>
        <Pane>
          <List>
            <ListItem>
              <Tooltip {...args}>
                <ListLink to="#">link1</ListLink>
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip {...args}>
                <ListLink to="#">link2</ListLink>
              </Tooltip>
            </ListItem>
            <ListItem>
              <Tooltip {...args}>
                <ListLink to="#">link with a long name that should trigger the overflow</ListLink>
              </Tooltip>
            </ListItem>
          </List>
        </Pane>
        <Pane>Other pane</Pane>
      </Wrapper>
    </div>
  ),
};

const Wrapper = styled.div`
  display: flex;
  height: 2000px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  padding: 2px 4px;
`;

const ListLink = styled(Link)`
  display: block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Pane = styled.div`
  height: 300px;
  width: 100px;
  background: ${cssVar('color-background-neutral-subtle-default')};
  overflow: hidden;
  border: 1px solid black;
  margin: 1px;
`;
