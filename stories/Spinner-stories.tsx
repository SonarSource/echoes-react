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
import { Spinner } from '../src';

const meta = {
  component: Spinner,
  title: 'Spinner',
  parameters: {
    controls: { exclude: ['checked', 'onCheck'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;

type Story = StoryObj<typeof meta>;

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

export const Centered: Story = {
  args: {
    isLoading: true,
    children: <span>Loading complete!</span>,
    wrapperClassName: 'center-spinner',
  },
  render: (args) => (
    <CenterSpinner>
      <Spinner {...args} />
    </CenterSpinner>
  ),
};

const CenterSpinner = styled.div`
  .center-spinner {
    display: flex;
    justify-content: space-around;
    width: 100%;
  }
`;
