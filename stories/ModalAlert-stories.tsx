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
import { ComponentProps, useCallback, useState } from 'react';
import { Button, ButtonVariety, ModalAlert, Popover, Select, toast } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof ModalAlert> = {
  component: ModalAlert,
  title: 'Echoes/Modal/ModalAlert',
  parameters: {
    controls: { exclude: ['children', 'secondaryButton', 'onOpenChange'] },
  },
  decorators: [basicWrapperDecorator],
};

export default meta;

type Story = StoryObj<typeof ModalAlert>;

export const Basic: Story = {
  argTypes: {
    primaryButton: {
      mapping: {
        default: <Button variety={ButtonVariety.Primary}>Submit</Button>,
        destructive: <Button variety={ButtonVariety.Danger}>Delete</Button>,
      },
      options: ['default', 'destructive'],
    },
  },
  args: {
    title: 'Explanation',
    description:
      'This is a more complete explanation to detail the concepts and practices that are required to understand said explanation. It is fairly easy to assess how this important text is made important by its self-sufficient importance.',
    secondaryButtonLabel: 'Cancel',
  },
  render: (args) => (
    <ModalAlert {...args}>
      <Button>Click this button to display the ModalAlert</Button>
    </ModalAlert>
  ),
};

export const Controlled: Story = {
  parameters: {
    controls: { exclude: ['children', 'primaryButton', 'secondaryButton', 'secondaryButtonLabel'] },
  },
  args: {
    title: 'Explanation',
    description:
      'This is a more complete explanation to detail the concepts and practices that are required to understand said explanation. It is fairly easy to assess how this important text is made important by its self-sufficient importance.',
  },
  render: (args) => <Controller {...args} />,
};

function Controller(args: ComponentProps<typeof ModalAlert>) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const doThing = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      setOpen(false);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <ModalAlert
      {...args}
      isOpen={open}
      onClose={() => {
        console.log('Modal closed');
      }}
      onOpenChange={setOpen}
      primaryButton={
        <Button isLoading={loading} onClick={doThing} variety={ButtonVariety.Primary}>
          Approve
        </Button>
      }
      secondaryButton={<Button>Quit</Button>}
      secondaryButtonLabel={undefined}>
      <Button>Click this button to display the ModalAlert</Button>
    </ModalAlert>
  );
}

export const WithToastMessages: Story = {
  render: () => (
    <ModalAlert
      content={
        <Button
          onClick={() =>
            toast.error({
              description: 'interact with me',
              isDismissable: true,
              duration: 'infinite',
            })
          }>
          toast!
        </Button>
      }
      description="Clicking on the button will add a toast message. This shows that they appear on top and can be interacted with without closing the modal"
      primaryButton={<Button variety={ButtonVariety.Primary}>Approve</Button>}
      secondaryButtonLabel="Cancel"
      title="Toast compatibility">
      <Button>go!</Button>
    </ModalAlert>
  ),
};

export const WithSelectAndPopover: Story = {
  render: () => <WithSelectAndPopoverComponent />,
};

function WithSelectAndPopoverComponent() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ModalAlert
      content={
        <div>
          <p style={{ marginBottom: '16px' }}>
            This story demonstrates the ESC key behavior fix (ECHOES-1038).
            <br />
            <strong>Test steps:</strong>
            <br />
            1. Open the Select dropdown below and press ESC - only the dropdown should close
            <br />
            2. Press ESC again - the ModalAlert should close
            <br />
            3. Open the Popover below and press ESC - only the Popover should close
            <br />
            4. Press ESC again - the ModalAlert should close
          </p>
          <div style={{ marginBottom: '16px' }}>
            <Select
              ariaLabel="Example select"
              data={[1, 2, 3, 4, 5].map((i) => ({
                value: `${i}`,
                label: `Option ${i}`,
              }))}
              onChange={(v) => {
                setSelected(v);
              }}
              value={selected}
            />
          </div>
          <div>
            <Popover description="This is a popover with some content" title="Popover Title">
              <Button>Open Popover</Button>
            </Popover>
          </div>
        </div>
      }
      description="Test the ESC key behavior with nested Select and Popover components"
      primaryButton={<Button variety={ButtonVariety.Primary}>Approve</Button>}
      secondaryButtonLabel="Cancel"
      title="ESC Key Testing (ECHOES-1038)">
      <Button>Open ModalAlert</Button>
    </ModalAlert>
  );
}
