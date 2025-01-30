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
import { forwardRef, useEffect, useRef, useState } from 'react';
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
    helpText: 'Select all topics that interest you', // NOSONAR
    label: 'Interests',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
};

export const Horizontal: Story = {
  args: {
    alignment: 'horizontal',
    helpText: 'Select all topics that interest you',
    label: 'Interests',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
};

export const Disabled: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    isDisabled: true,
    label: 'Interests',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
};

export const Required: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    isRequired: true,
    label: 'Interests',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
};

export const Invalid: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    label: 'Interests',
    messageInvalid: 'Your interests are invalid',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
    validation: 'invalid',
  },
};

export const Valid: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    label: 'Interests',
    messageValid: 'Your interests are valid',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
    validation: 'valid',
  },
};

export const HTMLFormData: Story = {
  args: {
    helpText: 'Select all topics that interest you',
    label: 'Interests',
    name: 'interests',
    options: [{ label: 'Travel' }, { label: 'Music' }, { label: 'Sports' }],
  },
  parameters: {
    docs: {
      description: {
        story: `This example shows how to integrate a \`CheckboxGroup\`
        component with an HTML form, such that the value  of the \`CheckboxGroup\`
        is included in the form data. \n\n Note that using form data **is not**
        type-safe. In addition, holding state in HTML means your component is
        not a function of state (\`UI = function(state)\`). \n\n Furthermore,
        the value must be serialized to string, since HTML is a text based format.
        For these reasons, using HTML form data is not recommended.
        `,
      },
    },
  },
  render: (props) => <Form {...props} />,
};

const CheckboxGroupState = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ onChange: _onChange, value: initialValue = [], ...props }, ref) => {
    const [value, setValue] = useState(initialValue);
    return <CheckboxGroup onChange={setValue} ref={ref} value={value} {...props} />;
  },
);

CheckboxGroupState.displayName = 'CheckboxGroupState';

const Form = forwardRef<HTMLDivElement, CheckboxGroupProps>(
  ({ onChange: _onChange, value: initialValue = [], ...props }, ref) => {
    const [value, setValue] = useState(initialValue);
    const formRef = useRef<HTMLFormElement>(null);
    const [formData, setFormData] = useState<string | null>(null);

    useEffect(() => {
      if (!formRef.current) {
        setFormData(null);
        return;
      }

      const data = Object.fromEntries(new FormData(formRef.current).entries());
      setFormData(JSON.stringify(data, null, 2));
    }, [value]);

    return (
      <>
        <form ref={formRef}>
          <CheckboxGroup onChange={setValue} ref={ref} value={value} {...props} />
        </form>
        {formData && (
          <pre>
            <b>Form Data:</b> {formData}
          </pre>
        )}
      </>
    );
  },
);

Form.displayName = 'Form';
