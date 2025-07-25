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
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { FormField, FormFieldValidation, FormFieldWidth } from '../src/components/form/FormField';
import { toTextControlArgTypes } from './helpers/arg-types';

import { cssVar } from '~utils/design-tokens';

type FormField = typeof FormField;

const meta: Meta<FormField> = {
  component: FormField,
  title: 'Internal/FormField',
  argTypes: {
    helpToggletipProps: {
      mapping: {
        'with-help-toggletip': {
          description: 'This toggletip will be displayed next to the help text.',
        },
        none: undefined,
      },
      options: ['with-help-toggletip', 'none'],
    },
    validation: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: FormFieldValidation.None },
      },
    },
    width: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: FormFieldWidth.Full },
      },
    },
    ...toTextControlArgTypes('label', 'helpText', 'messageInvalid', 'messageValid'),
  },
  parameters: {
    docs: {
      toc: true,
    },
  },
};

export default meta;

type Story = StoryObj<FormField>;

export const Default: Story = {
  args: {
    controlId: 'input-1',
    helpText: 'Your password must contain at least 8 characters',
    isDisabled: false,
    isRequired: false,
    label: 'Password',
    messageInvalid: 'This is an inline error message',
    messageValid: 'This is an inline success message',
  },
  render: ({ isDisabled, ...args }) => (
    <FormField isDisabled={isDisabled} {...args}>
      <TextInput disabled={isDisabled} id="input-1" />
    </FormField>
  ),
};

export const Disabled: Story = {
  args: {
    controlId: 'input-2',
    isDisabled: true,
    label: 'Password',
  },
  render: ({ isDisabled, ...args }) => (
    <FormField isDisabled={isDisabled} {...args}>
      <TextInput disabled={isDisabled} id="input-2" />
    </FormField>
  ),
};

export const Required: Story = {
  args: {
    controlId: 'input-3',
    isRequired: true,
    label: 'Password',
  },
  render: ({ isRequired, ...args }) => (
    <FormField isRequired={isRequired} {...args}>
      <TextInput id="input-3" required={isRequired} />
    </FormField>
  ),
};

export const Invalid: Story = {
  args: {
    controlId: 'input-4',
    isRequired: true,
    label: 'Password',
    messageInvalid: 'Your password is required',
    validation: FormFieldValidation.Invalid,
  },
  render: ({ ...args }) => (
    <FormField {...args}>
      <TextInput id="input-4" />
    </FormField>
  ),
};

export const Valid: Story = {
  args: {
    controlId: 'input-5',
    label: 'Password',
    messageValid: 'Your password is valid!',
    validation: FormFieldValidation.Valid,
  },
  render: ({ ...args }) => (
    <FormField {...args}>
      <TextInput id="input-5" readOnly value="treadstone" />
    </FormField>
  ),
};

export const Medium: Story = {
  args: {
    controlId: 'input-6',
    helpText: 'Your password must contain at least 8 characters',
    label: 'Password',
    width: FormFieldWidth.Medium,
  },
  render: ({ ...args }) => (
    <FormField {...args}>
      <TextInput id="input-6" />
    </FormField>
  ),
};

export const Inline: Story = {
  render: (_args) => (
    <div style={{ display: 'flex', gap: cssVar('dimension-space-300') }}>
      <FormField controlId="foo" label="First name" width="medium">
        <TextInput id="input-7" />
      </FormField>
      <FormField controlId="bar" label="Last name" width="medium">
        <TextInput id="input-7" />
      </FormField>
    </div>
  ),
};

function TextInput({ style, ...props }: ComponentProps<'input'>) {
  return <input style={{ boxSizing: 'border-box', width: '100%', ...style }} {...props} />;
}
