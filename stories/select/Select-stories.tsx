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
import { ComponentProps, useState } from 'react';
import { FormFieldWidth, IconBell, IconBug, IconMegaphone, Select } from '../../src';
import {
  formFieldsArgTypes,
  iconsElementsArgType,
  toDisabledControlArgType,
} from '../helpers/arg-types';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'Echoes/Select/Select',
  argTypes: {
    ...formFieldsArgTypes,
    valueIcon: iconsElementsArgType,
    ...toDisabledControlArgType('onChange', 'onOpen'),
  },
};

export default meta;

type Story = StoryObj<typeof Select>;

const data = [
  {
    group: 'good',
    items: [
      { value: '1', label: 'cheese', suffix: <IconBell /> },
      { value: '2', label: 'bread', prefix: <IconBug />, helpText: 'boooh' },
    ],
  },
  {
    group: 'bad',
    items: [
      { value: '3', label: 'salad', helpText: 'this is a helper text' },
      {
        value: '4',
        label: 'no',
        disabled: true,
        helpText: 'I help express loudly that NO!',
        suffix: <IconMegaphone />,
      },
      { value: '5', label: 'tomatoes' },
      { value: '6', label: 'carrots' },
      { value: '7', label: 'carrots with a super long name' },
    ],
  },
];

export const Default: Story = {
  args: {
    label: 'my label',
    messageInvalid: '0o0o0o0o0psies',
    helpText: 'input help',
    data,
    valueIcon: <IconBell />,
    isSearchable: true,
    optionComponent: Custom,
  },
  render: (args) => <SelectContainer {...args} />,
};

export const CustomFiltering: Story = {
  args: {
    label: 'my label',
    messageInvalid: '0o0o0o0o0psies',
    labelNotFound: 'no results',
    helpText: 'this is a helper text',
    data,
    valueIcon: <IconBell />,
    filter: ({ option, search }) =>
      option.label.includes(search) ||
      (typeof option.helpText === 'string' && option.helpText.includes(search)),
    isSearchable: true,
    optionComponent: Custom,
  },
  render: (args) => <SelectContainer {...args} />,
};

export const Plain: Story = {
  args: {
    label: 'Select one',
    data,
    isRequired: true,
    width: FormFieldWidth.Medium,
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
