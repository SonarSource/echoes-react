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
import { Spinner } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Spinner> = {
  component: Spinner,
  title: 'Echoes/Spinner',
  parameters: {
    controls: { exclude: ['checked', 'onCheck'] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Spinner>;

export const Basic: Story = {
  args: {
    isLoading: true,
    children: <span>Loading complete!</span>,
  },
};

export const WithLabel: Story = {
  args: {
    isLoading: true,
    label: 'my loading in progress...',
  },
};

export const WithPlaceHolder: Story = {
  args: {
    isLoading: false,
    hasPlaceholder: true,
  },
  render: (args) => (
    <p>
      <span style={{ marginRight: '4px' }}>There is a Spinner placeholder here:</span>
      <Spinner {...args} />
      <span style={{ marginLeft: '4px' }}>and some text after</span>
    </p>
  ),
};

export const WithMargin: Story = {
  args: {
    isLoading: true,
    children: <span>Loading complete!</span>,
    label: `I've got a margin!`,
    wrapperClassName: 'margins',
  },
  render: (args) => (
    <WithMarginWrapper>
      <p>
        Spinners can get tailwind classes: <Spinner {...args} />
      </p>
    </WithMarginWrapper>
  ),
};

const WithMarginWrapper = styled.div`
  .margins {
    margin-left: 20px;
  }
`;

export const Display: Story = {
  args: {
    isLoading: true,
  },
  render: (args) => (
    <div>
      <p>
        We are processing the reports <Spinner {...args} /> 8/10
      </p>

      <div>
        <Spinner {...args}>
          <ul>
            <li>random</li>
            <li>content</li>
            <li>for</li>
            <li>nothing</li>
            <li>special</li>
          </ul>
        </Spinner>
      </div>
    </div>
  ),
};

export const InAGrid: Story = {
  args: {
    isLoading: true,
    label: 'hold on...',
  },
  render: (args) => (
    <>
      <p>
        This example shows that the Spinner behaves correctly when it needs to be a single node, for
        instance in a grid layout. Toggling its loading state does not break the layout.
        <br />
      </p>
      <Grid>
        <Spinner {...args}>
          <span>Loading complete</span>
        </Spinner>
        <div>Right column</div>
      </Grid>
    </>
  ),
};

const Grid = styled.div`
  display: grid;
  width: 300px;
  grid-template-columns: 1fr 2fr;
  height: 24px;
`;
