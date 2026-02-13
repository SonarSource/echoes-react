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
import { ComponentProps, useCallback, useState } from 'react';
import {
  Button,
  ButtonIcon,
  ButtonVariety,
  DropdownMenu,
  DropdownMenuAlign,
  IconMoreVertical,
  LinkStandalone,
  Modal,
  ModalSize,
  Select,
  toast,
} from '../src';
import { basicWrapperDecorator } from './helpers/BasicWrapper';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'Echoes/Modal/Modal',
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
    title: 'My super long modal title about "SonarQube Server WebApp" project that wraps',
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

export const WithSelectAndDropdown: Story = {
  args: {
    description:
      'This Modal has both a Select and a Dropdown, to see how they nicely overflow out of the content. Also useful for testing ESC key behavior (ECHOES-1038) - press ESC to close dropdown/menu first, then ESC again to close Modal.',
    footerLink: 'link',
    primaryButton: 'default',
    secondaryButton: 'default',
    title: 'My Modal title',
  },
  render: (args) => (
    <Modal
      content={
        <div>
          <ControlledSelect />
          <br />
          <DropdownMenu
            align={DropdownMenuAlign.Start}
            items={
              <>
                <DropdownMenu.ItemLink to="/awesome1">awesome link 1</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome2">awesome link 2</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome3">awesome link 3</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome4">awesome link 4</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome5">awesome link 5</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome6">awesome link 6</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome7">awesome link 7</DropdownMenu.ItemLink>
                <DropdownMenu.ItemLink to="/awesome8">awesome link 8</DropdownMenu.ItemLink>
              </>
            }>
            <Button>Choose a link to actually do nothing</Button>
          </DropdownMenu>
        </div>
      }
      {...args}>
      <Button>Show Modal</Button>
    </Modal>
  ),
};

function ControlledSelect() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Select
      ariaLabel="select label"
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => ({
        value: `${i}`,
        label: `${i}`,
      }))}
      onChange={(v) => {
        setSelected(v);
      }}
      value={selected}
    />
  );
}

export const WithADropdownItemTrigger: Story = {
  args: {
    description:
      'This is a modal accessible description that will be automatically announced by screen readers when the modal is opened.',
    footerLink: 'link',
    primaryButton: 'default',
    secondaryButton: 'default',
    title: 'My Modal title',
  },
  render: (args) => (
    <DropdownMenu
      id="modal-trigger"
      items={
        <Modal content={<div>Modal content, anything can be set in there.</div>} {...args}>
          <DropdownMenu.ItemButton>Open Modal</DropdownMenu.ItemButton>
        </Modal>
      }>
      <ButtonIcon Icon={IconMoreVertical} ariaLabel="Menu" />
    </DropdownMenu>
  ),
};

export const UncontrolledWithOnOpenChange: Story = {
  args: {
    description: 'This is an uncontrolled modal using onOpenChange to alert open/close events.',
    footerLink: 'link',
    primaryButton: 'default',
    secondaryButton: 'default',
    title: 'Uncontrolled Modal with onOpenChange',
  },

  render: (args) => (
    <Modal
      content={<div>Modal content, anything can be set in there.</div>}
      {...args}
      onOpenChange={(open) => {
        // eslint-disable-next-line no-alert
        alert(`Modal open state changed: ${open}`);
      }}>
      <Button>Show Modal</Button>
    </Modal>
  ),
};

export const WithToastMessages: Story = {
  render: () => (
    <Modal
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
      title="Toast compatibility">
      <Button>go!</Button>
    </Modal>
  ),
};
