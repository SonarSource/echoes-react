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
import { forwardRef, useState } from 'react';
import {
  type CheckboxGroupProps,
  CheckboxGroup,
} from '../src/components/checkbox-group/CheckboxGroup';
import { toTextControlArgTypes } from './helpers/arg-types';

type CheckboxGroup = typeof CheckboxGroup;

const meta: Meta<CheckboxGroup> = {
  component: CheckboxGroup,
  title: 'Echoes/CheckboxGroup',
  argTypes: {
    ...toTextControlArgTypes('label', 'messageInvalid', 'messageValid'),
  },
  parameters: {
    docs: {
      toc: true,
    },
  },
  render: (props) => <CheckboxGroupState {...props} />,
};

export default meta;

type Story = StoryObj<CheckboxGroup>;

export const Default: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    label: 'Interests',
    onChange: undefined,
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
};

const CheckboxGroupState = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ onChange, value, ...props }, ref) => {
    const [localValue, setLocalValue] = useState([]);

    return (
      <CheckboxGroup
        onChange={onChange ?? setLocalValue}
        ref={ref}
        value={value ?? localValue}
        {...props}
      />
    );
  },
);

CheckboxGroupState.displayName = 'CheckboxGroupState';
