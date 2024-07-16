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
import styled from '@emotion/styled';
import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonSize, ButtonVariety, IconCalendar, IconChevronDown } from '../src';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Echoes/Button',
  argTypes: {
    size: { control: { type: 'select' }, options: Object.values(ButtonSize) },
    variety: { control: { type: 'select' }, options: Object.values(ButtonVariety) },
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'My Button',
    onClick: () => console.log('Button clicked'),
  },
};

export const WithPrefix: Story = {
  args: {
    children: 'My Button',
    prefix: <IconCalendar />,
    onClick: () => console.log('Button clicked'),
  },
};

export const WithSuffix: Story = {
  args: {
    children: 'My Button',
    suffix: <IconChevronDown />,
    onClick: () => console.log('Button clicked'),
  },
};

export const AllVarieties: Story = {
  args: {
    onClick: () => console.log('Button clicked'),
  },
  render: (args) => (
    <VarietiesWrapper>
      {Object.values(ButtonVariety).map((variety) => (
        <Button key={variety} {...args} variety={variety}>
          {variety}
        </Button>
      ))}
    </VarietiesWrapper>
  ),
};

const VarietiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
`;
