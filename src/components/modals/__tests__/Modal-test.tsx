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
import { screen, waitFor } from '@testing-library/react';
import { PointerEventsCheckLevel, Options as UserEventsOptions } from '@testing-library/user-event';
import { useState } from 'react';
import { render } from '~common/helpers/test-utils';
import { Button } from '../../buttons';
import { DropdownMenu } from '../../dropdown-menu';
import { Select } from '../../select';
import { Modal, ModalProps } from '../Modal';

it('should appear/disappear as expected', async () => {
  const onClose = jest.fn();
  const { user } = renderModal({ onClose });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
  await user.click(screen.getByRole('button', { name: 'Close' }));

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should allow to be controlled', async () => {
  const { user } = renderControlledModal();

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Quit' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('should call onClose and close the dialog when clicking outside in controlled mode', async () => {
  const onClose = jest.fn();
  const { container, user } = renderControlledModal(onClose, {
    pointerEventsCheck: PointerEventsCheckLevel.Never,
  });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(container);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should render content and description and extra buttons', async () => {
  const { user } = renderModal({
    content: 'special content',
    description: 'description',
    primaryButton: <Button>Accept</Button>,
    secondaryButton: <Button>Cancel</Button>,
  });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByText('special content')).toBeInTheDocument();
  expect(screen.getByText('description')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Accept' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

it('should be triggered by DropdownMenu Items', async () => {
  const { user } = render(
    <DropdownMenu
      id="modal-trigger"
      items={
        <Modal content="Modal content" title="Modal title">
          <DropdownMenu.ItemButton>Open Modal</DropdownMenu.ItemButton>
        </Modal>
      }>
      <Button>Menu</Button>
    </DropdownMenu>,
  );

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Menu' }));
  await user.click(screen.getByRole('menuitem', { name: 'Open Modal' }));

  expect(screen.getByRole('dialog')).toBeInTheDocument();
});

it("shouldn't have any a11y violation", async () => {
  const { container } = renderModal({ isDefaultOpen: true, title: 'title' });

  await expect(container).toHaveNoA11yViolations();
});

it('should call onOpenChange for uncontrolled modal', async () => {
  const onOpenChange = jest.fn();

  const { user } = render(
    <Modal
      content="Modal content"
      onOpenChange={onOpenChange}
      secondaryButton={<Button>Close</Button>}
      title="Test Modal">
      <Button>Toggle</Button>
    </Modal>,
  );

  expect(onOpenChange).not.toHaveBeenCalled();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(onOpenChange).toHaveBeenCalledWith(true);

  await user.click(screen.getByText('Close'));
  expect(onOpenChange).toHaveBeenCalledWith(false);
});

function renderModal(args: Partial<ModalProps> = {}) {
  const { isOpen, onOpenChange, ...overrides } = args;

  return render(
    <Modal {...overrides}>
      <Button>Toggle</Button>
    </Modal>,
  );
}

function renderControlledModal(
  onClose?: ModalProps['onClose'],
  userEventOptions?: UserEventsOptions,
) {
  function Controller() {
    const [open, setOpen] = useState(false);

    return (
      <Modal
        isOpen={open}
        onClose={onClose}
        onOpenChange={setOpen}
        primaryButton={<Button onClick={() => setOpen}>Approve</Button>}
        secondaryButton={<Button onClick={() => setOpen(false)}>Quit</Button>}>
        <Button>Toggle</Button>
      </Modal>
    );
  }

  return render(<Controller />, undefined, userEventOptions);
}

it('should not close Modal on ESC when Select dropdown is open', async () => {
  const { user } = render(
    <Modal
      content={
        <Select
          ariaLabel="Test select"
          data={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
          onChange={() => {}}
          value={null}
        />
      }
      isDefaultOpen
      title="Modal with Select">
      <Button>Toggle</Button>
    </Modal>,
  );

  // Modal should be open
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Open Select dropdown
  await user.click(screen.getByRole('combobox', { name: 'Test select' }));

  // Wait for dropdown to appear
  await waitFor(() => {
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  // Press ESC once - dropdown should close, Modal should stay open
  await user.keyboard('[Escape]');

  await waitFor(() => {
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  // Press ESC again - Modal should close
  await user.keyboard('[Escape]');

  await waitFor(() => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
