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

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast as sonnerToast } from 'sonner';
import { ToastVariety } from '~common/components/Toast';
import { render } from '~common/helpers/test-utils';
import { toast, ToastDuration } from '..';
import { EchoesProvider } from '../../components/echoes-provider';

const TEST_MESSAGE = 'Test message';
const SUCCESS_MESSAGE = 'Success message';
const ACTION_TOAST_MESSAGE = 'Action toast';
const WARNING_TITLE = 'Warning title';
const WARNING_DESCRIPTION = 'Warning description';

function clearAllToasts() {
  sonnerToast.dismiss();
}

function renderWithEchoesProvider() {
  return render(
    <EchoesProvider>
      <div />
    </EchoesProvider>,
  );
}

describe('toast utility - basic functionality', () => {
  afterEach(() => {
    clearAllToasts();
  });

  it('should create and render a toast with required parameters', async () => {
    renderWithEchoesProvider();

    const toastId = toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
    });

    expect(toastId).toBeDefined();
    await waitFor(() => {
      expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
    });
  });

  it('should create a toast with all optional parameters and render actions', async () => {
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    const actions = jest.fn(() => <button type="button">Action Button</button>);

    renderWithEchoesProvider();

    toast({
      variety: ToastVariety.Success,
      title: 'Success title',
      description: SUCCESS_MESSAGE,
      id: 'custom-id',
      duration: ToastDuration.Infinite,
      isDismissable: true,
      actions,
      onAutoClose,
      onDismiss,
    });

    await waitFor(() => {
      expect(screen.getByText('Success title')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Action Button')).toBeInTheDocument();
    });

    // Actions should have been called with correct parameters
    expect(actions).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 'custom-id',
        dismiss: expect.any(Function),
      }),
    );
  });

  it('should render toast with correct structure and dismissible button', async () => {
    renderWithEchoesProvider();

    toast({
      variety: ToastVariety.Warning,
      title: WARNING_TITLE,
      description: WARNING_DESCRIPTION,
      isDismissable: true,
    });

    await waitFor(() => {
      expect(screen.getByText(WARNING_DESCRIPTION)).toBeInTheDocument();
    });

    // Should have dismiss button
    await waitFor(() => {
      expect(screen.getByLabelText('Dismiss toast')).toBeInTheDocument();
    });
  });
});

describe('toast utility - variety shortcuts', () => {
  afterEach(() => {
    clearAllToasts();
  });

  const shortcutTests = [
    { method: 'success', description: SUCCESS_MESSAGE },
    { method: 'error', description: 'Error message' },
    { method: 'info', description: 'Info message' },
    { method: 'warning', description: WARNING_DESCRIPTION },
  ] as const;

  shortcutTests.forEach(({ method, description }) => {
    it(`should create ${method} toast with correct variety and content`, async () => {
      renderWithEchoesProvider();

      toast[method]({
        description,
        title: `${method} title`,
      });

      await waitFor(() => {
        expect(screen.getByText(description)).toBeInTheDocument();
      });

      await waitFor(() => {
        expect(screen.getByText(`${method} title`)).toBeInTheDocument();
      });
    });
  });
});

describe('toast utility - dismissal and interaction', () => {
  afterEach(() => {
    clearAllToasts();
  });

  it('should dismiss toast when dismiss button is clicked', async () => {
    const user = userEvent.setup();
    renderWithEchoesProvider();

    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      isDismissable: true,
    });

    await waitFor(() => {
      expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
    });

    const dismissButton = screen.getByLabelText('Dismiss toast');
    await user.click(dismissButton);

    await waitFor(() => {
      expect(screen.queryByText(TEST_MESSAGE)).not.toBeInTheDocument();
    });
  });

  it('should dismiss toast programmatically', async () => {
    renderWithEchoesProvider();

    const toastId = toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      isDismissable: true,
    });

    await waitFor(() => {
      expect(screen.getByText(TEST_MESSAGE)).toBeInTheDocument();
    });

    toast.dismiss(toastId);

    await waitFor(() => {
      expect(screen.queryByText(TEST_MESSAGE)).not.toBeInTheDocument();
    });
  });

  it('should handle action button clicks and dismissal', async () => {
    const user = userEvent.setup();
    const actionHandler = jest.fn();

    renderWithEchoesProvider();

    toast({
      variety: ToastVariety.Success,
      description: ACTION_TOAST_MESSAGE,
      duration: ToastDuration.Infinite,
      isDismissable: true,
      actions: ({ dismiss }) => (
        <button
          onClick={() => {
            actionHandler();
            dismiss();
          }}
          type="button">
          Undo Action
        </button>
      ),
    });

    await waitFor(() => {
      expect(screen.getByText(ACTION_TOAST_MESSAGE)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('Undo Action')).toBeInTheDocument();
    });

    const actionButton = screen.getByText('Undo Action');
    await user.click(actionButton);

    expect(actionHandler).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.queryByText(ACTION_TOAST_MESSAGE)).not.toBeInTheDocument();
    });
  });
});
