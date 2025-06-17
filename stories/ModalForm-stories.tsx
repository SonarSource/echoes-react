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
import { ComponentProps, FormEvent, useCallback, useState } from 'react';
import {
  Button,
  Form,
  IconHome,
  IconMegaphone,
  LinkStandalone,
  MessageCallout,
  ModalForm,
  ModalSize,
  TextInput,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof ModalForm> = {
  component: ModalForm,
  title: 'Echoes/Modal/ModalForm',
  parameters: {
    controls: { exclude: ['children', 'onReset', 'onSubmit', 'content', 'isDestructive'] },
  },
  argTypes: {
    isDestructive: { control: { type: 'boolean' } },
    extraContent: {
      mapping: {
        callout: (
          <MessageCallout
            text="This is the flag message description, use it to provide additional information."
            type="info"
          />
        ),
        none: undefined,
      },
      options: ['callout', 'none'],
    },
    footerLink: {
      mapping: {
        link: <LinkStandalone to="https://www.sonarsource.com">Learn more</LinkStandalone>,
        none: undefined,
      },
      options: ['link', 'none'],
    },
    size: { options: Object.values(ModalSize) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof ModalForm>;

export const Default: Story = {
  args: {
    description: 'Description of the form, use it to provide additional information.',
    footerLink: 'link',
    title: 'My ModalForm title',
    submitButtonLabel: 'Confirm payment',
    secondaryButtonLabel: 'Abort!',
  },

  render: (args) => <ModalWithForm {...args} />,
};

export const Destructive: Story = {
  args: {
    description: 'Description of the form, use it to provide additional information.',
    title: 'My destructive ModalForm title',
    submitButtonLabel: 'Destroy!!!',
    secondaryButtonLabel: 'Abort!',
    isDestructive: true,
  },
  parameters: {
    controls: {
      exclude: [...(meta.parameters?.controls.exclude || []), 'footerLink', 'size'],
    },
  },
  render: (args) => <ModalWithForm {...args} />,
};

function ModalWithForm(props: ComponentProps<typeof ModalForm>) {
  const [formData, setFormData] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    const data = Object.fromEntries(new FormData(event.currentTarget));
    return new Promise((resolve) => {
      setTimeout(() => {
        setFormData(JSON.stringify(data, null, 2));
        setIsSubmitting(false);
        resolve(null);
      }, 1500);
    });
  }, []);

  const onReset = useCallback(() => {
    setFormData(null);
  }, []);

  return (
    <>
      <ModalForm
        {...props}
        content={
          <>
            <Form.Section
              description="Description of the section, use it to provide additional information."
              title="Name section">
              <TextInput
                helpText="Write your full firstname starting with uppercase."
                label="Firstname"
                name="firstname"
                placeholder="John"
              />
              <TextInput
                helpText="Write your full lastname starting with uppercase."
                label="Lastname"
                name="lastname"
                placeholder="Doe"
              />
            </Form.Section>
            <Form.Section
              description="Description of the section, use it to provide additional information."
              title="Contact section">
              <TextInput
                helpText="Write your email."
                label="Email"
                name="email"
                placeholder="john@doe.com"
                prefix={<IconHome />}
              />
              <TextInput
                helpText="Write your phone number."
                label="Phone"
                name="phone"
                placeholder="john@doe.com"
                prefix={<IconMegaphone />}
              />
            </Form.Section>
          </>
        }
        isSubmitting={isSubmitting}
        onReset={onReset}
        onSubmit={onSubmit}>
        <Button>Show Form Modal</Button>
      </ModalForm>
      {formData && (
        <pre>
          <b>Form Data:</b> {formData}
        </pre>
      )}
    </>
  );
}
