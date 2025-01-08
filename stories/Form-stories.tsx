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

import {
  FormField,
  FormFieldMessage,
  WithProps as FormFieldWithProps,
} from '../src/components/form';
import { FormFieldLabel } from '../src/components/form/FormFieldLabel';
import { TextInput } from '../src/components/text-input';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof FormField> = {
  component: FormField,
  title: 'Echoes/FormField',
  argTypes: {},
  decorators: [basicWrapperDecorator],
};

// eslint-disable-next-line import/no-default-export
export default meta;

type Story = StoryObj<typeof FormField>;

// Option 1 using component composition
export const Default: Story = {
  args: {},
  render: (args) => (
    <FormField {...args}>
      <FormFieldLabel htmlFor="" isRequired>
        This is a label
      </FormFieldLabel>
      <TextInput />
      <FormFieldMessage>This is a message</FormFieldMessage>
    </FormField>
  ),
};

export const ErrorState: Story = {
  args: {},
  render: (args) => (
    <FormField state="error" {...args}>
      <FormFieldLabel htmlFor="">This is a label</FormFieldLabel>
      <TextInput />
      <FormFieldMessage>This is an error message</FormFieldMessage>
    </FormField>
  ),
};

// Option 2 using component props
export const WithProps: Story = {
  args: {},
  render: (args) => (
    <FormFieldWithProps
      label={<FormFieldLabel htmlFor="">This is a label</FormFieldLabel>}
      message={<FormFieldMessage>This is a message</FormFieldMessage>}
      {...args}>
      <TextInput key={1} />
    </FormFieldWithProps>
  ),
};
