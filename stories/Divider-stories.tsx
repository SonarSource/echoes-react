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
import { Divider, DividerOrientation, Heading, Text, TextSize } from '../src';

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
  justify-content: space-between;
  height: 60px;
  width: 100%;
`;

const DynamicContainer = styled.div<{ orientation: DividerOrientation }>`
  ${({ orientation }) =>
    orientation === DividerOrientation.Vertical
      ? `
        display: flex;
        align-items: center;
        height: 60px;
        width: 100%;
      `
      : `
        display: block;
        width: 100%;
      `}
`;

export const Default: Story = {
  args: {},
  render: (args) => (
    <div>
      <DynamicContainer orientation={args.orientation || DividerOrientation.Horizontal}>
        {args.orientation === DividerOrientation.Vertical ? (
          <>
            <span>Left content</span>
            <Divider {...args} />
            <span>Right content</span>
          </>
        ) : (
          <>
            <Heading as="h5" hasMarginBottom>
              Is this a real issue?
            </Heading>
            <Text as="p">Probably</Text>
            <Divider {...args} />
            <Heading as="h5" hasMarginBottom>
              What other things should we put here
            </Heading>
            <Text as="p">Super important text probably</Text>
          </>
        )}
      </DynamicContainer>
    </div>
  ),
};

export const Vertical: Story = {
  args: {
    orientation: DividerOrientation.Vertical,
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
      <p>Continue with social media</p>
    </div>
  ),
};

export const VerticalWithText: Story = {
  args: {
    orientation: DividerOrientation.Vertical,
    text: (
      <Text isSubdued size={TextSize.Small}>
        OR
      </Text>
    ),
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
