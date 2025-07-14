/*
 * Echoes React
 * Copyright (C) 2023-2025 SonarSource SA
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
import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { PointerEventsCheckLevel, Options as UserEventsOptions } from '@testing-library/user-event';
import { render } from '~common/helpers/test-utils';
import { Button } from '../../buttons';
import { Form } from '../../form';
import { TextInput } from '../../text-input';
import { ModalForm, ModalFormProps } from '../ModalForm';

it('should correctly handle opening, submitting and closing the form', async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn().mockImplementation((e) => e.preventDefault());
  const onReset = jest.fn();
  const { user } = renderModalForm({ onClose, onReset, onSubmit });

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(screen.getByRole('form')).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: 'ModalForm' })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: 'input' })).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(onSubmit).toHaveBeenCalled();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(1);

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Cancel' }));
  expect(onReset).toHaveBeenCalled();
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(2);
});

it('should correctly handle submitting a promise', async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn().mockImplementation((e) => {
    e.preventDefault();
    return new Promise((resolve) => {
      setTimeout(resolve, 50);
    });
  });
  const { user } = renderModalForm({ onClose, onSubmit });

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalled();

  await waitForElementToBeRemoved(() => screen.queryByRole('dialog'));
  expect(onClose).toHaveBeenCalledTimes(1);
});

it('should correctly handle submitting a rejected promise', async () => {
  const onClose = jest.fn();
  const onSubmit = jest.fn().mockImplementation((e) => {
    e.preventDefault();
    return new Promise((_resolve, reject) => {
      reject(new Error());
    });
  });
  const { user } = renderModalForm({ onClose, onSubmit });

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Submit' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  expect(onSubmit).toHaveBeenCalled();

  expect(screen.queryByRole('dialog')).toBeVisible();
  expect(onClose).not.toHaveBeenCalled();
});

it('should correctly handle overriding buttons text', async () => {
  const { user } = renderModalForm({ submitButtonLabel: 'Save', secondaryButtonLabel: 'Reset' });

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument();
});

it('should correctly display a modal alert when isDestructive is true', async () => {
  const { user } = renderModalForm({ isDestructive: true });

  await user.click(screen.getByRole('button', { name: 'Toggle' }));

  expect(screen.getByRole('alertdialog')).toBeInTheDocument();
});

it('should call the onClose callback when the modal is closed', async () => {
  const onClose = jest.fn();
  const { container, user } = renderModalForm(
    { isDefaultOpen: true, onClose },
    { pointerEventsCheck: PointerEventsCheckLevel.Never },
  );

  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(screen.getByRole('button', { name: 'Close' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(1);

  await user.click(screen.getByRole('button', { name: 'Toggle' }));
  expect(screen.getByRole('dialog')).toBeInTheDocument();

  await user.click(container);
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  expect(onClose).toHaveBeenCalledTimes(2);
});

it("shouldn't have any a11y violation", async () => {
  const { container } = renderModalForm({ isDefaultOpen: true });

  await expect(container).toHaveNoA11yViolations();
});

function renderModalForm(
  overrides: Partial<ModalFormProps> = {},
  userEventOptions?: UserEventsOptions,
) {
  return render(
    <ModalForm
      content={
        <Form.Section>
          <TextInput label="input" />
        </Form.Section>
      }
      description="ModalForm description"
      name="MyForm"
      title="ModalForm"
      {...overrides}>
      <Button>Toggle</Button>
    </ModalForm>,
    undefined,
    userEventOptions,
  );
}
