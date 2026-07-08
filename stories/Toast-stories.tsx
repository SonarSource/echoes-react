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
import { ToastVariety } from '../src/common/components/Toast';
import { basicWrapperDecorator } from './helpers/BasicWrapper';
import { toDisabledControlArgType, toTextControlArgTypes } from './helpers/arg-types';

const meta: Meta<ToastParams> = {
  component: toast,
  title: 'Echoes Components/Toast',
  argTypes: {
    ...toDisabledControlArgType('actions'),
    ...toTextControlArgTypes('title', 'description'),
    id: {
      control: { type: 'text' },
      description: 'Reuse a stable id to replace or update an existing toast intentionally.',
    },
    variety: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: ToastVariety.Info },
      },
    },
    duration: {
      control: { type: 'select' },
      table: {
        defaultValue: { summary: 'medium' },
      },

      options: ['short', 'medium', 'long', 'infinite'],
    },
    isDismissable: {
      control: { type: 'boolean' },
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof meta>;
type ToastStoryArgs = NonNullable<Story['args']>;

const AGGREGATED_REPEATED_TOAST_CONTROLS_EXCLUDE = ['actions', 'id', 'onAutoClose', 'onDismiss'];

function renderAggregatedRepeatedToasts(args: Story['args'], defaultTitle: ToastParams['title']) {
  const resolvedArgs: ToastStoryArgs = args ?? {};

  const {
    actions: _ignoredActions,
    description = 'File uploaded',
    id: _ignoredId,
    isDismissable = true,
    onAutoClose: _ignoredOnAutoClose,
    onDismiss: _ignoredOnDismiss,
    title = defaultTitle,
    variety = ToastVariety.Success,
    ...restArgs
  } = resolvedArgs;

  return (
    <Button
      onClick={() => {
        toast({
          description,
          isDismissable,
          title,
          variety,
          ...restArgs,
        });

        globalThis.setTimeout(() => {
          toast({
            description,
            isDismissable,
            title,
            variety,
            ...restArgs,
          });
        }, 300);

        globalThis.setTimeout(() => {
          toast({
            description,
            isDismissable,
            title,
            variety,
            ...restArgs,
          });
        }, 600);
      }}>
      Show aggregated repeated toast
    </Button>
  );
}

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
        <span>The toast function provides shortcuts for each variety:</span>

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

export const StableIdUpdates: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story:
          'Reuse a stable `id` when a later toast call should replace an existing visible toast. ' +
          'The second toast call updates the first one instead of creating another toast.',
      },
    },
  },
  render: (args) => {
    const {
      description = 'Repository settings synchronized.',
      id = 'repository-sync',
      title = 'Sync complete',
      ...restArgs
    } = args;

    return (
      <Button
        onClick={() => {
          toast.info({
            description: 'Synchronizing repository settings...',
            id,
            title: 'Sync in progress',
            ...restArgs,
          });

          globalThis.setTimeout(() => {
            toast.success({
              description,
              id,
              title,
              ...restArgs,
            });
          }, 1000);
        }}>
        Show stable-id update
      </Button>
    );
  },
};

export const AggregatedRepeatedToasts: Story = {
  args: {
    isDismissable: true,
  },
  parameters: {
    controls: {
      exclude: AGGREGATED_REPEATED_TOAST_CONTROLS_EXCLUDE,
    },
    docs: {
      description: {
        story:
          'Repeated calls with the same plain-text description and variety reuse the existing ' +
          'toast. If a plain-text title is shown, it must match too. The toast keeps the ' +
          'original text and shows a counter badge next to the title, or next to the ' +
          'description when there is no title. Toasts with actions or lifecycle callbacks are ' +
          'not automatically aggregated.',
      },
    },
  },
  render: (args) => {
    return renderAggregatedRepeatedToasts(args, 'Upload complete');
  },
};

export const AggregatedRepeatedToastsWithoutTitle: Story = {
  args: {
    isDismissable: true,
  },
  parameters: {
    controls: {
      exclude: [...AGGREGATED_REPEATED_TOAST_CONTROLS_EXCLUDE, 'title'],
    },
    docs: {
      description: {
        story:
          'Without a title, the repeated toast counter badge is shown immediately to the right ' +
          'of the description.',
      },
    },
  },
  render: (args) => {
    return renderAggregatedRepeatedToasts(args, undefined);
  },
};
