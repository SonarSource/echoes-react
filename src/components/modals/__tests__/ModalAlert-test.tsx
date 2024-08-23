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
import { screen } from '@testing-library/react';
import { ComponentProps, useState } from 'react';
import { render } from '~common/helpers/test-utils';
import { Button } from '../../buttons';
import { DropdownMenu } from '../../dropdown-menu';
import { ModalAlert } from '../ModalAlert';

it('should appear/disappear as expected', async () => {
  const { user } = renderModalAlert();

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Accept' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('should allow to be controlled', async () => {
  const { user } = renderControlledModalAlert();

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Quit' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('should render content and secondaryButtonLabel', async () => {
  const { user } = renderModalAlert({ content: 'special content', secondaryButtonLabel: 'leave' });

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByText('special content')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'leave' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it('should be triggered by DropdownMenu Items', async () => {
  const { user } = render(
    <DropdownMenu.Root
      id="modal-trigger"
      items={
        <ModalAlert
          description="modal-alert-description"
          primaryButton={<Button>Accept</Button>}
          secondaryButtonLabel="Cancel"
          title="Modal alert title">
          <DropdownMenu.ItemButton>Open Modal</DropdownMenu.ItemButton>
        </ModalAlert>
      }>
      <Button>Menu</Button>
    </DropdownMenu.Root>,
  );

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Menu' }));
  await user.click(screen.getByRole('menuitem', { name: 'Open Modal' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));

  expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument();
});

it("shouldn't have any a11y violation", async () => {
  const { container } = renderModalAlert();
  await expect(container).toHaveNoA11yViolations();
});

function renderModalAlert(args: Partial<ComponentProps<typeof ModalAlert>> = {}) {
  const { isOpen, onOpenChange, ...overrides } = args;
  return render(
    <ModalAlert description="modal-alert" primaryButton={<Button>Accept</Button>} {...overrides}>
      <Button>Toggle</Button>
    </ModalAlert>,
  );
}

function renderControlledModalAlert() {
  function Controller() {
    const [open, setOpen] = useState(false);

    return (
      <ModalAlert
        description="modal-alert"
        isOpen={open}
        onOpenChange={setOpen}
        primaryButton={<Button onClick={() => setOpen}>Approve</Button>}
        secondaryButton={<Button onClick={() => setOpen(false)}>Quit</Button>}>
        <Button>Toggle</Button>
      </ModalAlert>
    );
  }

  return render(<Controller />);
}
