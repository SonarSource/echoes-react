/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource Sàrl
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
import {
  Button,
  Form,
  FormFieldValidation,
  Link,
  MessageCallout,
  RadioButtonGroup,
  Select,
  TextInput,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Form> = {
  component: Form,
  title: 'Echoes/Forms',
  argTypes: {},
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Form>;

export const Default: Story = {
  args: {},
  render: (args) => <FormWithValidation {...args} />,
};

function FormWithValidation(props: ComponentProps<typeof Form>) {
  const emailInputRef = createRef<HTMLInputElement>();
  const [countryValue, setCountryValue] = useState<string | null>(null);
  const [countryValidation, setCountryValidation] = useState(FormFieldValidation.None);
  const [emailValidation, setEmailValidation] = useState(FormFieldValidation.None);
  const [emailMessageInvalid, setEmailMessageInvalid] = useState<string | undefined>();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (emailInputRef.current?.validity.typeMismatch) {
        setEmailValidation(FormFieldValidation.Invalid);
        setEmailMessageInvalid('Please enter a valid email');
      } else if (emailInputRef.current?.validity.valueMissing) {
        setEmailValidation(FormFieldValidation.Invalid);
        setEmailMessageInvalid('The email is mandatory');
      } else if (emailInputRef.current?.value.endsWith('@sonarsource.com')) {
        setEmailValidation(FormFieldValidation.Invalid);
        setEmailMessageInvalid(
          'Oh no! Not a SonarSourcer again! Only private emails allowed, sorry!',
        );
      } else if (emailInputRef.current?.validity.valid) {
        setEmailValidation(FormFieldValidation.Valid);
      }

      if (countryValue) {
        setCountryValidation(FormFieldValidation.Valid);
      } else {
        setCountryValidation(FormFieldValidation.Invalid);
      }
    },
    [countryValue, emailInputRef],
  );

  const onReset = useCallback(() => {
    setEmailValidation(FormFieldValidation.None);
    setCountryValidation(FormFieldValidation.None);
  }, []);

  const onEmailChange = useCallback(() => {
    setEmailValidation(FormFieldValidation.None);
  }, []);

  const onCountryChange = useCallback((value: string | null) => {
    setCountryValue(value);
    setCountryValidation(FormFieldValidation.None);
  }, []);

  return (
    <Form onReset={onReset} onSubmit={onSubmit} {...props}>
      <Form.Header
        description={
          <>
            Starting from 30€ per month for 100k private lines of code.{' '}
            <Link to="">Learn more</Link>. Service is charged monthly in advance, after your 14 days
            free trial. Cancel anytime.
          </>
        }
        extraContent={
          <MessageCallout variety="info">
            This is the flag message description, use it to provide additional information.
          </MessageCallout>
        }
        title="Upgrade to the Team plan"
      />
      <Form.Section
        description="The credit card and plan you choose will be billed to the organization - not your user account."
        title="Billing information">
        <TextInput
          isRequired
          label="Email address"
          messageInvalid={emailMessageInvalid}
          onChange={onEmailChange}
          ref={emailInputRef}
          type="email"
          validation={emailValidation}
        />
        <Select
          data={[
            { label: 'United States', value: 'us' },
            { label: 'Switzerland', value: 'ch' },
            { label: 'France', value: 'fr' },
          ]}
          isRequired
          label="Country"
          messageInvalid="The country is mandatory"
          onChange={onCountryChange}
          placeholder="Choose a country..."
          validation={countryValidation}
          value={countryValue}
        />
        <RadioButtonGroup
          alignment="horizontal"
          label="Type of use"
          options={[
            { label: 'Business', value: 'business' },
            { label: 'Personal', value: 'personal' },
          ]}
        />
      </Form.Section>
      <Form.Section
        description="We need your address to calculate the VAT and to send you the invoice."
        title="Address information">
        <TextInput label="Address line 1" />
        <TextInput label="Address line 2 (optional)" />
        <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
          <TextInput label="Postal code" />
          <TextInput label="City" />
        </div>
      </Form.Section>
      <Form.Footer side="right">
        <Button type="reset">Cancel</Button>
        <Button type="submit" variety="primary">
          Confirm payment
        </Button>
      </Form.Footer>
    </Form>
  );
}
