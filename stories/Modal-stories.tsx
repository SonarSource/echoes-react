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
import { Button, ButtonVariety, LinkStandalone, Modal, ModalSize } from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Echoes/Modal',
  parameters: {
    controls: { exclude: ['children'] },
  },
  argTypes: {
    primaryButton: {
      mapping: {
        default: <Button variety={ButtonVariety.Primary}>Submit</Button>,
        destructive: <Button variety={ButtonVariety.Danger}>Delete</Button>,
        none: undefined,
      },
      options: ['default', 'destructive', 'none'],
    },
    secondaryButton: {
      mapping: {
        default: <Button>Cancel</Button>,
        none: undefined,
      },
      options: ['default', 'none'],
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

type Story = StoryObj<typeof Modal>;

export const Uncontrolled: Story = {
  args: {
    description:
      'This is a modal accessible description that will be automatically announced by screen readers when the modal is opened.',
    footerLink: 'link',
    primaryButton: 'default',
    secondaryButton: 'default',
    title: 'My Modal title',
  },
  render: (args) => (
    <Modal content={<div>Modal content, anything can be set in there.</div>} {...args}>
      <Button>Show Modal</Button>
    </Modal>
  ),
};

export const Controlled: Story = {
  args: {
    description:
      'This is a controlled modal that will closed on submit after a delay and showing a spinner.',
    footerLink: 'link',
    secondaryButton: 'default',
    title: 'My Modal',
  },
  render: (args) => <ControlledModal {...args} />,
};

function ControlledModal(props: ComponentProps<typeof Modal>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const doThing = useCallback(() => {
    setIsLoading(true);

    setTimeout(() => {
      setIsOpen(false);
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Modal
      {...props}
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      primaryButton={
        <Button
          isDisabled={isLoading}
          isLoading={isLoading}
          onClick={doThing}
          variety={ButtonVariety.Primary}>
          Submit
        </Button>
      }
      secondaryButton={<Button onClick={() => setIsOpen(false)}>Close</Button>}>
      <Button>Show Modal</Button>
    </Modal>
  );
}