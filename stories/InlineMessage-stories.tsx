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
import { useCallback, useState } from 'react';
import { InlineMessage, InlineMessageHighlight, InlineMessageType } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof InlineMessage> = {
  component: InlineMessage,
  title: 'Echoes/InlineMessage',
  argTypes: {
    highlight: { control: { type: 'select' }, options: Object.values(InlineMessageHighlight) },
    type: { control: { type: 'select' }, options: Object.values(InlineMessageType) },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof InlineMessage>;

export const Default: Story = {
  args: {
    highlight: InlineMessageHighlight.Weak,
    type: InlineMessageType.Info,
    text: 'This is an InlineMessage!',
  },
};

export const Dismissable: Story = {
  args: {
    highlight: InlineMessageHighlight.Weak,
    type: InlineMessageType.Info,
    text: 'This is an InlineMessage!',
  },
  render: (args) => {
    return <Container {...args} />;
  },
};

function Container(args: Story['args']) {
  const [show, setShow] = useState(true);

  const dismiss = useCallback(() => {
    setShow(false);
  }, [setShow]);

  return (
    <InlineMessage
      highlight={InlineMessageHighlight.Weak}
      onDismiss={dismiss}
      text="dismiss me"
      type={InlineMessageType.Info}
      {...args}
    />
  );
}
