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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Button,
  ButtonSize,
  ButtonVariety,
  IconCalendar,
  IconChevronDown,
  IconRocket,
  Tooltip,
} from '../src';
import { ButtonAsButtonProps } from '../src/components/buttons/Button';
import { ButtonAsLinkVariety } from '../src/components/buttons/ButtonAsLink';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'Echoes/Button',
  argTypes: {
    size: { control: { type: 'select' }, options: Object.values(ButtonSize) },
    variety: { control: { type: 'select' }, options: Object.values(ButtonVariety) },
  },
  decorators: [basicWrapperDecorator],
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
    onClick: () => console.log('Button clicked'),
    prefix: <IconCalendar />,
  },
};

export const WithSuffix: Story = {
  args: {
    children: 'My Button',
    onClick: () => console.log('Button clicked'),
    suffix: <IconChevronDown />,
  },
};

export const WithLoading: Story = {
  args: {
    children: 'My Button',
    isLoading: true,
    onClick: () => console.log('Button clicked'),
    prefix: <IconRocket />,
  },
};

export const WithEllipsis: Story = {
  args: {
    children: 'My Super Long Button',
    onClick: () => console.log('Button clicked'),
    suffix: <IconChevronDown />,
    prefix: <IconRocket />,
  },
  render: (args) => (
    <div
      style={{
        display: 'flex',
        maxWidth: '180px',
        padding: '8px',
        border: '1px solid hotpink',
      }}>
      <Tooltip content="Tooltip content for a very long button">
        <Button {...args} />
      </Tooltip>
    </div>
  ),
};

export const AllVarieties: Story = {
  args: {
    onClick: () => console.log('Button clicked'),
  },
  render: (args: ButtonAsButtonProps) => (
    <>
      {Object.values(ButtonVariety).map((variety) => (
        <Button key={variety} {...args} variety={variety}>
          {variety}
        </Button>
      ))}
    </>
  ),
};

export const AsALink: Story = {
  args: {
    children: 'My Link Button',
    to: 'https://example.com',
    enableOpenInNewTab: true,
  },
  argTypes: {
    variety: { control: { type: 'select' }, options: Object.values(ButtonAsLinkVariety) },
  },
};
