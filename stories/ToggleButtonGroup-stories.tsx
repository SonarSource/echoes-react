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
import { IconBell, IconBug, IconCalendar, IconCheck, ToggleButtonGroup } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof ToggleButtonGroup> = {
  component: ToggleButtonGroup,
  title: 'Echoes/ToggleButtonGroup',

  parameters: {
    controls: { exclude: ['selected', 'options'] },
  },

  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof ToggleButtonGroup>;

export const Default: Story = {
  args: {
    selected: 'a',
    options: [
      { label: 'First option', value: 'a' },
      { label: 'Second option', value: 'b' },
      { label: 'Third option', value: 'c' },
      {
        label: '4 4 4',
        value: 'd',
      },
    ],
  },
  render: (args) => {
    return <Controller {...args} />;
  },
};

export const Fancy: Story = {
  args: {
    selected: 'b',
    options: [
      { label: 'Bugs', value: 'a', iconLeft: <IconBug /> },
      { label: 'With suffix', value: 'b', suffix: <IconBell color="echoes-color-icon-danger" /> },
      { label: '<= both =>', value: 'c', iconLeft: <IconCheck />, suffix: <IconCalendar /> },
      {
        label: '4 4 4',
        value: 'd',
      },
    ],
  },
  render: (args) => {
    return <Controller {...args} />;
  },
};

function Controller(args: ComponentProps<typeof ToggleButtonGroup>) {
  const [selected, setSelected] = useState(args.selected);

  return (
    <ToggleButtonGroup
      {...args}
      onChange={(selection) => {
        setSelected(selection);
      }}
      selected={selected}
    />
  );
}
