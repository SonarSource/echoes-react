/*
 * Echoes React
 * Copyright (C) 2023-2024 SonarSource SA
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
import { Button, MessageInline, MessageType } from '../../src';
import { basicWrapperDecorator } from '../helpers/BasicWrapper';
import {
  Default as CalloutDefault,
  Dismissable as CalloutDismissable,
  DismissableWithAction as CalloutDismissableWithAction,
} from './MessageCallout-stories';
import { useDismissable } from './useDismissable';

const meta: Meta<typeof MessageInline> = {
  component: MessageInline,
  title: 'Echoes/Message/MessageInline',
  argTypes: {
    type: { control: { type: 'select' }, options: Object.values(MessageType) },
  },
  parameters: {
    controls: { exclude: ['onDismiss'] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof MessageInline>;

export const Default: Story = {
  ...CalloutDefault,
};

export const Dismissable: Story = {
  ...CalloutDismissable,
  render: (args) => {
    return <DismissingContainer {...args} />;
  },
};

export const DismissableWithAction: Story = {
  ...CalloutDismissableWithAction,
  render: (args) => {
    return <DismissingContainer {...args} />;
  },
};

function DismissingContainer(args: Story['args']) {
  const { show, dismiss, toggle } = useDismissable();

  return (
    <>
      <Button onClick={toggle}>Toggle MessageInline</Button>
      {show && (
        <MessageInline onDismiss={dismiss} text="dismiss me" type={MessageType.Info} {...args} />
      )}
    </>
  );
}
