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

import { RadioButtonGroup } from '@sonarsource/echoes-react';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  component: RadioButtonGroup,
  title: 'RadioButtonGroup',
  args: {
    id: 'radio',
    isRequired: false,
  },
} satisfies Meta<typeof RadioButtonGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    defaultValue: 'b',
    helpText: 'Help text',
    isRequired: true,
    label: 'Radio Button Group',
    options: [
      { label: 'First option - unselected by default', value: 'a' },
      { label: 'Second option - selected by default', value: 'b' },
      { label: 'Third option is disabled', value: 'c', isDisabled: true },
      {
        ariaLabel: 'Blabla',
        label: (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ marginRight: '4px' }}>✅</span>
            <p>This is a complicated Radio Option, that has a pragraph and some stuff</p> <br />
            <ul style={{ display: 'block', listStyle: 'inside' }}>
              <li style={{ display: 'list-item', marginLeft: '4px' }}>To verify</li>
              <li style={{ display: 'list-item', marginLeft: '4px' }}>How it behaves</li>
            </ul>
          </div>
        ),
        value: 'd',
      },
      { helpText: 'This is a help text', label: 'Fifth option with help text', value: 'e' },
      {
        isDisabled: true,
        helpText: 'This is another help text',
        label: 'Six option: disabled with help text',
        value: 'f',
      },
    ],
  },
};

export const InAForm: Story = {
  args: {
    isRequired: true,
    options: [
      { label: 'One', value: '1' },
      { label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => (
    <form>
      <RadioButtonGroup {...args} />
    </form>
  ),
};

export const DisabledGroup: Story = {
  args: {
    isDisabled: true,
    isRequired: true,
    options: [
      { label: 'One', value: '1' },
      { helpText: 'Help', label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => <RadioButtonGroup {...args} />,
};

export const ErroredGroup: Story = {
  args: {
    labelRadioGroupError: 'Error message',
    isRequired: true,
    options: [
      { label: 'One', value: '1' },
      { helpText: 'Help', label: 'Two', value: '2' },
      { label: 'Three', value: '3' },
    ],
  },
  render: (args) => <RadioButtonGroup {...args} />,
};
