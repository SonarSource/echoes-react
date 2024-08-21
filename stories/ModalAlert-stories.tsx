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

import type { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, useCallback, useState } from 'react';
import { Button, ButtonVariety, ModalAlert } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof ModalAlert> = {
  component: ModalAlert,
  title: 'Echoes/ModalAlert',
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
    // secondaryButton: <Button variety={ButtonVariety.DangerGhost}>asrgewg</Button>,
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
