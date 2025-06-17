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
import { Divider, Heading, Text, TextSize } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Divider> = {
  component: Divider,
  title: 'Echoes/Divider',
  argTypes: {
    isVertical: {
      control: 'boolean',
      description: 'Whether the divider is vertical',
      defaultValue: false,
    },
    className: { control: 'text' },
    role: { control: 'text' },
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
  align-items: center;
  display: flex;
  height: 60px;
  justify-content: space-between;
`;

interface DynamicContainerProps {
  children: React.ReactNode;
  isVertical?: boolean;
}

function DynamicContainer({ children, isVertical = false }: Readonly<DynamicContainerProps>) {
  if (isVertical) {
    return <VerticalContainer>{children}</VerticalContainer>;
  }

  return <div>{children}</div>;
}

const StyledDivider = styled(Divider)<{ isVertical?: boolean }>`
  margin: ${({ isVertical }) => (isVertical ? '0 10px' : '10px 0')};
`;

export const Default: Story = {
  args: {},
  render: (args) => (
    <DynamicContainer isVertical={args.isVertical ?? false}>
      {args.isVertical ? (
        <>
          <span>Left content</span>
          <StyledDivider {...args} />
          <span>Right content</span>
        </>
      ) : (
        <>
          <Heading as="h5" hasMarginBottom>
            Is this a real issue?
          </Heading>
          <Text as="p">Probably</Text>
          <StyledDivider {...args} />
          <Heading as="h5" hasMarginBottom>
            What other things should we put here
          </Heading>
          <Text as="p">Super important text probably</Text>
        </>
      )}
    </DynamicContainer>
  ),
};

export const Vertical: Story = {
  args: {
    isVertical: true,
  },
  render: (args) => (
    <DynamicContainer isVertical>
      <span>Left content</span>
      <StyledDivider {...args} />
      <span>Right content</span>
    </DynamicContainer>
  ),
};

export const WithText: Story = {
  args: {
    text: (
      <Text isSubdued size={TextSize.Small}>
        OR
      </Text>
    ),
  },
  render: (args) => (
    <DynamicContainer>
      <p>You can sign in with your credentials</p>
      <StyledDivider {...args} />
      <p>Continue with social media</p>
    </DynamicContainer>
  ),
};

export const VerticalWithText: Story = {
  args: {
    isVertical: true,
    text: (
      <Text isSubdued size={TextSize.Small}>
        OR
      </Text>
    ),
  },
  render: (args) => (
    <DynamicContainer isVertical>
      <span>Left content</span>
      <StyledDivider {...args} />
      <span>Right content</span>
    </DynamicContainer>
  ),
};
