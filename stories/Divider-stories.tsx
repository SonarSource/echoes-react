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
import type { Meta, StoryObj } from '@storybook/react';
import styled from '@emotion/styled';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { Divider, DividerOrientation } from '../src';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Echoes/Divider',
  argTypes: {
    orientation: {
      control: 'select',
      options: Object.values(DividerOrientation),
      description: 'The orientation of the divider',
    },
    className: { control: 'text' },
    role: { control: 'text' },
    'data-testid': { control: 'text' },
  },
  decorators: [basicWrapperDecorator],
  parameters: {
    docs: {
      description: {
        component: 'A divider is a thin line that groups content in lists and layouts.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Divider>;

const VerticalContainer = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
`;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div
      style={{
        padding: '8px',
      }}>
      <p>The divider component creates visual separation between content sections.</p>
      <Divider {...args} />
      <p>It helps organize content and improve readability.</p>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: DividerOrientation.VERTICAL,
  },
  render: (args) => (
    <div>
      <VerticalContainer>
        <span>Left content</span>
        <Divider {...args} />
        <span>Right content</span>
      </VerticalContainer>
    </div>
  ),
};

export const WithText: Story = {
  args: {
    text: 'OR',
  },
  render: (args) => (
    <div>
      <p>You can sign in with your credentials</p>
      <Divider {...args} />
      <p>Or continue with social media</p>
    </div>
  ),
};

export const VerticalWithText: Story = {
  args: {
    orientation: DividerOrientation.VERTICAL,
    text: 'OR',
  },
  render: (args) => (
    <div style={{ display: 'flex', alignItems: 'center', height: '100px' }}>
      <div>
        <p>Left side content</p>
      </div>
      <Divider {...args} />
      <div>
        <p>Right side content</p>
      </div>
    </div>
  ),
};
