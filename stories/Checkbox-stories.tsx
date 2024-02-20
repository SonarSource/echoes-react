/*
 * Echoes React
 * Copyright (C) 2023-2023 SonarSource SA
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

import { Checkbox } from '@sonarsource/echoes-react';
import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useEffect, useState } from 'react';

const meta = {
  component: Checkbox,
  title: 'Checkbox',
  parameters: {
    a11y: {
      config: {
        rules: [
          // False positive from Deque: the checkbox "button" tag does have an accessible name: the label with htmlFor
          { id: 'button-name', enabled: false },
        ],
      },
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSimpleLabel: Story = {
  args: {
    checked: false,
    label: "I'm a checkbox",
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

export const WithHelpText: Story = {
  args: {
    checked: false,
    isLoading: false,
    label: "I'm a checkbox",
    helpText: 'I have some help text',
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

export const WithError: Story = {
  args: {
    checked: false,
    hasError: true,
    label: "I'm a checkbox",
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

export const Disabled: Story = {
  args: {
    checked: true,
    isDisabled: true,
    label: "I'm a disabled checkbox",
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

export const IndeterminateState: Story = {
  args: {
    checked: 'indeterminate',
    label: "I'm an indeterminate checkbox",
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

export const LoadingState: Story = {
  args: {
    checked: false,
    isLoading: true,
    label: "I'm a loading checkbox",
    onCheck: () => {},
  },
  render: (args) => <CheckboxState initialValue={args.checked} {...args} />,
};

function CheckboxState({
  initialValue,
  ...checkboxProps
}: Partial<ComponentProps<typeof Checkbox>> & {
  initialValue: boolean | 'indeterminate';
}) {
  const [checked, setChecked] = useState(initialValue);
  useEffect(() => setChecked(initialValue), [initialValue]);
  return (
    <Checkbox
      ariaLabel="Enable option A"
      {...checkboxProps}
      checked={checked}
      onCheck={setChecked}
    />
  );
}
