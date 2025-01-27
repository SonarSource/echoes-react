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
import { ComponentProps, createRef, FormEvent, useCallback, useState } from 'react';
import { Button, ButtonVariety } from '../src/components/buttons';
import { FormFieldValidation } from '../src/components/form';
import { IconCopy, IconSearch } from '../src/components/icons';
import { TextInput } from '../src/components/text-input';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { formFieldsArgTypes, iconsElementsArgType } from './helpers/arg-types';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'Echoes/TextInput',
  argTypes: {
    ...formFieldsArgTypes,
    prefix: iconsElementsArgType,
    suffix: iconsElementsArgType,
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof TextInput>;

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
    width: 'medium',
  },
};

export const WithPrefixAndSuffix: Story = {
  args: {
    helpText: `I'm a text to help you fill me correctly!`,
    isRequired: true,
    label: `I'm a label`,
    prefix: <IconSearch />,
    suffix: <IconCopy />,
    width: 'medium',
  },
};

export const WithValidation: Story = {
  args: {
    helpText: `You must enter a real email`,
    isRequired: true,
    label: `Email`,
    messageValid: `Bravo! You've entered a valid email`,
    placeholder: 'Email',
    prefix: <IconSearch />,
    type: 'email',
    width: 'medium',
  },
  render: (_args) => <InputWithValidation {..._args} />,
};

function InputWithValidation(props: ComponentProps<typeof TextInput>) {
  const emailInputRef = createRef<HTMLInputElement>();
  const [validation, setValidation] = useState(FormFieldValidation.None);
  const [messageInvalid, setMessageInvalid] = useState<string | undefined>();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (emailInputRef.current?.validity.typeMismatch) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid('Please enter a valid email');
      } else if (emailInputRef.current?.validity.valueMissing) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid('The email is mandatory');
      } else if (emailInputRef.current?.value.endsWith('@sonarsource.com')) {
        setValidation(FormFieldValidation.Invalid);
        setMessageInvalid('Oh no! Not a SonarSourcer again! Only private emails allowed, sorry!');
      } else if (emailInputRef.current?.validity.valid) {
        setValidation(FormFieldValidation.Valid);
      }
    },
    [emailInputRef],
  );

  const onChange = useCallback(() => {
    setValidation(FormFieldValidation.None);
  }, []);

  return (
    <form noValidate onSubmit={onSubmit}>
      <TextInput
        {...props}
        messageInvalid={messageInvalid}
        onChange={onChange}
        ref={emailInputRef}
        validation={validation}
      />
      <br />
      <Button type="submit" variety={ButtonVariety.Primary}>
        Submit
      </Button>
    </form>
  );
}
