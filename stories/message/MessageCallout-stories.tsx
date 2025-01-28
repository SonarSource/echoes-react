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

/* eslint-disable no-console */
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { Button, ButtonVariety, MessageCallout, MessageType } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';

const meta: Meta<typeof MessageCallout> = {
  component: MessageCallout,
  title: 'Echoes/Messages/MessageCallout',
  argTypes: {
    type: { control: { type: 'select' }, options: Object.values(MessageType) },
  },
  parameters: {
    controls: { exclude: ['onDismiss'] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

export type Story = StoryObj<typeof MessageCallout>;

export const Default: Story = {
  args: {
    type: MessageType.Info,
    text: 'This is a MessageCallout!',
  },
};

export const Dismissable: Story = {
  args: {
    type: MessageType.Info,
    text: 'This is a dismissable MessageCallout',
  },
  render: (args) => {
    return <DismissingContainer {...args} />;
  },
};

export const DismissableWithAction: Story = {
  args: {
    action: (
      <Button
        onClick={() => {
          console.log('Aha!');
        }}
        variety={ButtonVariety.DefaultGhost}>
        Do something else!
      </Button>
    ),
    type: MessageType.Info,
    title: 'Hello!',
    text: 'This is a MessageCallout!',
  },
  render: (args) => {
    return <DismissingContainer {...args} />;
  },
};

function DismissingContainer(args: Story['args']) {
  const [show, setShow] = useState(true);

  const dismiss = useCallback(() => {
    setShow(false);
  }, [setShow]);

  const toggle = useCallback(() => {
    setShow((v) => !v);
  }, [setShow]);

  return (
    <>
      <Button onClick={toggle}>Toggle MessageCallout</Button>
      {show && (
        <MessageCallout onDismiss={dismiss} text="dismiss me" type={MessageType.Info} {...args} />
      )}
    </>
  );
}

export const WithLongContent: Story = {
  args: {
    type: MessageType.Warning,
    text: 'This is a super long warning message. I repeat, this is a super long warning message.',
  },
  render: (args) => {
    return (
      <div style={{ maxWidth: '300px' }}>
        <MessageCallout {...args} />
      </div>
    );
  },
};
