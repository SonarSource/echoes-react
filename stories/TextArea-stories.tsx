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
import { ComponentProps, createRef, FormEvent, useCallback, useState } from 'react';
import { Button, ButtonVariety, FormFieldValidation, TextArea } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { formFieldsArgTypes } from './helpers/arg-types';

const meta: Meta<typeof TextArea> = {
  component: TextArea,
  title: 'Echoes/TextArea',
  argTypes: formFieldsArgTypes,
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof TextArea>;

export const Basic: Story = {
  args: {
    ariaLabel: 'This is an aria label',
    placeholder: 'I am a placeholder',
    width: 'medium',
  },
};

export const AsFormField: Story = {
  args: {
    helpText: `I'm a text to help you fill me correctly!`,
    isRequired: true,
    label: `I'm a label`,
    placeholder: 'I am a placeholder',
    isResizable: true,
    width: 'medium',
    rows: 5,
  },
};

export const WithValidation: Story = {
  args: {
    helpText: `You must enter an address on at least two lines`,
    isRequired: true,
    label: `Address`,
    messageValid: `Bravo! You've entered a valid address`,
    placeholder: 'Your address',
    maxLength: 60,
    minLength: 15,
    width: 'large',
  },
  render: (args) => <TextAreaWithValidation {...args} />,
};

function TextAreaWithValidation(props: ComponentProps<typeof TextArea>) {
  const addressInputRef = createRef<HTMLTextAreaElement>();
  const [validation, setValidation] = useState(FormFieldValidation.None);
  const [messageInvalid, setMessageInvalid] = useState<string | undefined>();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const validity = addressInputRef.current?.validity;
      if (validity?.tooShort || validity?.tooLong) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid('The address must be between 15 and 60 characters');
      } else if (validity?.valueMissing) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid('The address is mandatory');
      } else if (
        addressInputRef.current &&
        addressInputRef.current.value.split(/\r|\r\n|\n/).length < 2
      ) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid(
          'Oups, you must enter an address on at least two lines for better readability!',
        );
      } else if (validity?.valid) {
        setValidation(FormFieldValidation.Valid);
      }
    },
    [addressInputRef],
  );

  const onChange = useCallback(() => {
    setValidation(FormFieldValidation.None);
  }, []);

  return (
    <form noValidate onSubmit={onSubmit}>
      <TextArea
        {...props}
        messageInvalid={messageInvalid}
        onChange={onChange}
        ref={addressInputRef}
        validation={validation}
      />
      <br />
      <Button type="submit" variety={ButtonVariety.Primary}>
        Submit
      </Button>
    </form>
  );
}
