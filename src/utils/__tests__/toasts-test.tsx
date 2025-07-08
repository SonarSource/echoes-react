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

import { act, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { toast as sonnerToast } from 'sonner';
import { ToastVariety } from '~common/components/Toast';
import { render } from '~common/helpers/test-utils';
import { toast, ToastDuration } from '..';
import { Button } from '../../components';

const TEST_MESSAGE = 'Test message';
const SUCCESS_MESSAGE = 'Success message';
const WARNING_DESCRIPTION = 'Warning description';

describe('toast utility - basic functionality', () => {
  afterEach(() => {
    sonnerToast.dismiss();
  });

  it('should create and render a toast with required parameters', async () => {
    render(<div />);

    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
    });

    expect(await screen.findByText(TEST_MESSAGE)).toBeInTheDocument();
  });

  it('should create a toast with all optional parameters, render actions and dismiss button', async () => {
    const actions = jest.fn(() => <Button onClick={jest.fn()}>Action Button</Button>);
    const { container } = render(<div />);

    toast({
      variety: ToastVariety.Success,
      title: 'Success title',
      description: SUCCESS_MESSAGE,
      id: 'custom-id',
      duration: ToastDuration.Infinite,
      isDismissable: true,
      screenReaderPrefix: 'Toast prefix',
      actions,
    });

    expect(await screen.findByText('Success title')).toBeInTheDocument();
    expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
    expect(screen.getByText('Toast prefix')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss toast' })).toBeInTheDocument();

    await expect(container).toHaveNoA11yViolations();
  });
});

describe('toast utility - variety shortcuts', () => {
  afterEach(() => {
    sonnerToast.dismiss();
  });

  const shortcutTests = [
    { method: 'success', description: SUCCESS_MESSAGE, a11yPrefix: 'Success:' },
    { method: 'error', description: 'Error message', a11yPrefix: 'Error:' },
    { method: 'info', description: 'Info message', a11yPrefix: 'Information:' },
    { method: 'warning', description: WARNING_DESCRIPTION, a11yPrefix: 'Warning:' },
  ] as const;

  shortcutTests.forEach(({ method, description, a11yPrefix }) => {
    it(`should create ${method} toast with correct variety and content`, async () => {
      render(<div />);

      toast[method]({
        description,
        title: `${method} title`,
      });

      expect(await screen.findByText(description)).toBeInTheDocument();
      expect(screen.getByText(`${method} title`)).toBeInTheDocument();
      expect(screen.getByText(a11yPrefix)).toBeInTheDocument();
    });
  });
});

describe('toast utility - dismissal and interaction', () => {
  afterEach(() => {
    sonnerToast.dismiss();
  });

  it('should dismiss toast when dismiss button is clicked', async () => {
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    const { user } = render(<div />);

    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      isDismissable: true,
      onAutoClose,
      onDismiss,
    });

    expect(await screen.findByText(TEST_MESSAGE)).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Dismiss toast' }));
    await waitForElementToBeRemoved(() => screen.queryByText(TEST_MESSAGE));
    expect(onDismiss).toHaveBeenCalled();
    expect(onAutoClose).not.toHaveBeenCalled();
  });

  it('should dismiss toast programmatically', async () => {
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    render(<div />);

    const toastId = toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      onAutoClose,
      onDismiss,
    });

    expect(await screen.findByText(TEST_MESSAGE)).toBeInTheDocument();

    toast.dismiss(toastId);
    await waitForElementToBeRemoved(() => screen.queryByText(TEST_MESSAGE));
    expect(onDismiss).toHaveBeenCalled();
    expect(onAutoClose).not.toHaveBeenCalled();
  });

  it('should handle action button clicks and dismissal', async () => {
    const actionToastMessage = 'Action toast';
    const actionHandler = jest.fn();
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();

    const { user } = render(<div />);

    toast({
      variety: ToastVariety.Success,
      description: actionToastMessage,
      duration: ToastDuration.Infinite,
      isDismissable: true,
      actions: ({ dismiss }) => (
        <Button
          onClick={() => {
            actionHandler();
            dismiss();
          }}>
          Undo Action
        </Button>
      ),

      onAutoClose,
      onDismiss,
    });

    expect(await screen.findByText(actionToastMessage)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Undo Action' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Undo Action' }));

    expect(actionHandler).toHaveBeenCalled();

    await waitForElementToBeRemoved(() => screen.queryByText(actionToastMessage));
    expect(onDismiss).toHaveBeenCalled();
    expect(onAutoClose).not.toHaveBeenCalled();
  });

  it('should dismiss toast after auto-close duration', async () => {
    jest.useFakeTimers();

    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    render(<div />);

    toast({
      variety: ToastVariety.Warning,
      description: WARNING_DESCRIPTION,
      duration: ToastDuration.Short,
      onAutoClose,
      onDismiss,
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(await screen.findByText(WARNING_DESCRIPTION)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(await screen.findByText(WARNING_DESCRIPTION)).toBeInTheDocument();

    // It should auto-close after 8 seconds, we are at 6 seconds now
    act(() => {
      jest.advanceTimersByTime(4000);
    });
    expect(screen.queryByText(WARNING_DESCRIPTION)).not.toBeInTheDocument();
    expect(onAutoClose).toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
