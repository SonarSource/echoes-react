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
/* eslint-disable no-console */

import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button, toast, type ToastParams } from '../src';
import { Toast, ToastVariety } from '../src/common/components/Toast';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { toDisabledControlArgType, toTextControlArgTypes } from './helpers/arg-types';

const meta: Meta<ToastParams> = {
  component: Toast,
  title: 'Echoes/Toast',
  argTypes: {
    ...toDisabledControlArgType('actions'),
    ...toTextControlArgTypes('id', 'title', 'description'),
    variety: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: ToastVariety.Info },
      },
    },
    duration: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'short' },
      },

      options: ['short', 'medium', 'long', 'infinite'],
    },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof Toast>;

export const Simple: Story = {
  args: {
    description: 'This is a toast message',
    variety: 'danger',
  },
  render: (args) => {
    return (
      <Button
        onClick={() => {
          toast(args);
        }}>
        Show toast
      </Button>
    );
  },
};

export const WithActions: Story = {
  args: {
    className: 'custom-toast',
    description: 'This is a toast message',
    title: 'Default Toast',
    variety: 'info',
  },
  render: (args) => {
    return (
      <Button
        onClick={() => {
          toast({
            ...args,
            onAutoClose: () => {
              console.log('Toast auto dismissed');
            },
            onDismiss: () => {
              console.log('Toast dismissed');
            },
            isDismissable: true,
            duration: 'infinite',
            actions: ({ id, dismiss }) => (
              <Button
                onClick={() => {
                  console.log('Action clicked for toast with id:', id);
                  dismiss();
                }}>
                Action
              </Button>
            ),
          });
        }}>
        Show dismissable toast
      </Button>
    );
  },
};

export const Shortcuts: Story = {
  args: {},
  render: (args) => {
    const { description = 'This is a success toast message', ...restArgs } = args;
    return (
      <>
        <span>The toast function provide shortcuts for each variety:</span>
        <code>
          <pre>
            {`toast.success({ description: 'Success toast message' });
toast.info({ description: 'Info toast message' });
toast.warning({ description: 'Warning toast message' });
toast.error({ description: 'Error toast message' });`}
          </pre>
        </code>
        <Button
          onClick={() => {
            toast.info({ description, ...restArgs });
            toast.success({ description, ...restArgs });
            toast.warning({ description, ...restArgs });
            toast.error({ description, ...restArgs });
          }}>
          {'Show many'}
        </Button>
      </>
    );
  },
};
