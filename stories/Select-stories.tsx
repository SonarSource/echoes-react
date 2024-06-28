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

import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useState } from 'react';
import { IconBell, IconBug, IconMegaphone, Select } from '../src';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};

export default meta;

type Story = StoryObj<typeof Select>;

const data = [
  { value: '1', label: 'cheese', group: 'good', suffix: <IconBell /> },
  { value: '2', label: 'bread', group: 'good', prefix: <IconBug />, helpText: 'boooh' },
  { value: '3', label: 'salad', group: 'bad', helpText: 'this is a helper text' },
  {
    value: '4',
    label: 'no',
    group: 'bad',
    disabled: true,
    helpText: 'this is a helper text',
    suffix: <IconMegaphone />,
  },
  { value: '5', label: 'tomatoes', group: 'bad' },
  { value: '6', label: 'carrots', group: 'bad' },
];

export const Default: Story = {
  args: {
    label: 'my label',
    labelError: '0o0o0o0o0psies',
    helpText: 'this is a helper text',
    data,
    valueIcon: <IconBell />,
    isSearchable: true,
    optionComponent: Custom,
  },
  render: (args) => <SelectContainer {...args} />,
};

function Custom(props: any) {
  return (
    <span>
      {props.label} - {props.value}
    </span>
  );
}

function SelectContainer(args: ComponentProps<typeof Select>) {
  const [value, setValue] = useState(args.value);
  return <Select {...args} onChange={setValue} value={value} />;
}
