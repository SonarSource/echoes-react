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

import { act, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import { ToastVariety } from '~common/components/Toast';
import { createToastTestState, render } from '~common/helpers/test-utils';
import { toast, ToastDuration } from '..';
import { clearRepeatedToastTracking } from '../toast-internals/repeated-toast-tracking';
import { Button } from '../../components';

const TEST_MESSAGE = 'Test message';
const SUCCESS_MESSAGE = 'Success message';
const WARNING_DESCRIPTION = 'Warning description';

const { resetToastTestState, trackToastId } = createToastTestState({
  cleanupTrackedToast: clearRepeatedToastTracking,
});

describe('toast utility - basic functionality', () => {
  afterEach(resetToastTestState);

  it('should create and render a toast with required parameters', async () => {
    render(<div />);

    trackToastId(
      toast({
        variety: ToastVariety.Info,
        description: TEST_MESSAGE,
      }),
    );

    expect(await screen.findByText(TEST_MESSAGE)).toBeInTheDocument();
  });

  it('should render optional fields, actions, and a dismiss button', async () => {
    const actions = jest.fn(() => <Button onClick={jest.fn()}>Action Button</Button>);
    const { container } = render(<div />);

    trackToastId(
      toast({
        variety: ToastVariety.Success,
        title: 'Success title',
        description: SUCCESS_MESSAGE,
        id: 'custom-id',
        duration: ToastDuration.Infinite,
        isDismissable: true,
        screenReaderPrefix: 'Toast prefix',
        actions,
      }),
    );

    expect(await screen.findByText('Success title')).toBeInTheDocument();
    expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
    expect(screen.getByText('Toast prefix')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Dismiss toast' })).toBeInTheDocument();

    await expect(container).toHaveNoA11yViolations();
  });
});

describe('toast utility - variety shortcuts', () => {
  afterEach(resetToastTestState);

  const shortcutTests = [
    { method: 'success', description: SUCCESS_MESSAGE, a11yPrefix: 'Success:' },
    { method: 'error', description: 'Error message', a11yPrefix: 'Error:' },
    { method: 'info', description: 'Info message', a11yPrefix: 'Information:' },
    { method: 'warning', description: WARNING_DESCRIPTION, a11yPrefix: 'Warning:' },
  ] as const;

  shortcutTests.forEach(({ method, description, a11yPrefix }) => {
    it(`should create ${method} toast with correct variety and content`, async () => {
      render(<div />);

      trackToastId(
        toast[method]({
          description,
          title: `${method} title`,
        }),
      );

      expect(await screen.findByText(description)).toBeInTheDocument();
      expect(screen.getByText(`${method} title`)).toBeInTheDocument();
      expect(screen.getByText(a11yPrefix)).toBeInTheDocument();
    });
  });
});

describe('toast utility - dismissal and interaction', () => {
  afterEach(resetToastTestState);

  it('should dismiss toast when dismiss button is clicked', async () => {
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    const { user } = render(<div />);

    trackToastId(
      toast({
        variety: ToastVariety.Info,
        description: TEST_MESSAGE,
        isDismissable: true,
        onAutoClose,
        onDismiss,
      }),
    );

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

    const toastId = trackToastId(
      toast({
        variety: ToastVariety.Info,
        description: TEST_MESSAGE,
        onAutoClose,
        onDismiss,
      }),
    );

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

    trackToastId(
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
      }),
    );

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

    trackToastId(
      toast({
        variety: ToastVariety.Warning,
        description: WARNING_DESCRIPTION,
        duration: ToastDuration.Short,
        onAutoClose,
        onDismiss,
      }),
    );

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
      jest.runOnlyPendingTimers();
    });

    await waitFor(() => {
      expect(screen.queryByText(WARNING_DESCRIPTION)).not.toBeInTheDocument();
    });

    expect(onAutoClose).toHaveBeenCalled();
    expect(onDismiss).not.toHaveBeenCalled();
  });
});

describe('toast utility - stable id updates', () => {
  afterEach(resetToastTestState);

  it('should replace an existing toast when the same stable id is reused', async () => {
    render(<div />);

    trackToastId(
      toast.info({
        description: 'Synchronizing repository settings...',
        id: 'repository-sync',
      }),
    );

    expect(await screen.findByText('Synchronizing repository settings...')).toBeInTheDocument();

    trackToastId(
      toast.success({
        description: 'Repository settings synchronized.',
        id: 'repository-sync',
        title: 'Sync complete',
      }),
    );

    expect(await screen.findByText('Repository settings synchronized.')).toBeInTheDocument();
    expect(screen.getByText('Sync complete')).toBeInTheDocument();
    expect(screen.queryByText('Synchronizing repository settings...')).not.toBeInTheDocument();
  });

  it('should stop automatic aggregation immediately when a returned aggregated id is later reused explicitly', async () => {
    render(<div />);

    const repeatedToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
      }),
    );

    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();

    trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
      }),
    );

    expect(await screen.findByText('Shown 2 times')).toBeInTheDocument();

    trackToastId(
      toast.info({
        description: 'Upload still in progress',
        id: repeatedToastId,
      }),
    );

    expect(await screen.findByText('Upload still in progress')).toBeInTheDocument();
    expect(screen.queryByText(SUCCESS_MESSAGE)).not.toBeInTheDocument();

    const separateToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
      }),
    );

    expect(separateToastId).not.toBe(repeatedToastId);
    expect(await screen.findAllByText(SUCCESS_MESSAGE)).toHaveLength(1);
    expect(screen.getByText('Upload still in progress')).toBeInTheDocument();
    expect(screen.queryByText(/^Shown \d+ times$/)).not.toBeInTheDocument();

    toast.dismiss(repeatedToastId);
    await waitForElementToBeRemoved(() => screen.queryByText('Upload still in progress'));
    expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument();
    expect(screen.queryByText(/^Shown \d+ times$/)).not.toBeInTheDocument();
  });

  it('should not reuse an auto-generated repeated-toast id after the previous toast is dismissed', async () => {
    render(<div />);

    const firstToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
      }),
    );

    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();

    toast.dismiss(firstToastId);
    await waitForElementToBeRemoved(() => screen.queryByText(SUCCESS_MESSAGE));

    const secondToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
      }),
    );

    expect(secondToastId).not.toBe(firstToastId);
    expect(await screen.findByText(SUCCESS_MESSAGE)).toBeInTheDocument();

    toast.dismiss(firstToastId);
    expect(screen.getByText(SUCCESS_MESSAGE)).toBeInTheDocument();
  });
});

describe('toast utility - automatic aggregation opt-outs', () => {
  afterEach(resetToastTestState);

  it('should keep repeated toasts separate when onDismiss is provided', async () => {
    const firstOnDismiss = jest.fn();
    const secondOnDismiss = jest.fn();
    render(<div />);

    const firstToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
        onDismiss: firstOnDismiss,
      }),
    );

    const secondToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
        onDismiss: secondOnDismiss,
      }),
    );

    expect(firstToastId).not.toBe(secondToastId);

    await waitFor(() => {
      expect(screen.getAllByText(SUCCESS_MESSAGE)).toHaveLength(2);
    });

    toast.dismiss(firstToastId);

    await waitFor(() => {
      expect(firstOnDismiss).toHaveBeenCalledTimes(1);
    });

    expect(secondOnDismiss).not.toHaveBeenCalled();

    toast.dismiss(secondToastId);

    await waitFor(() => {
      expect(secondOnDismiss).toHaveBeenCalledTimes(1);
    });
  });

  it('should keep repeated toasts separate when onAutoClose is provided', async () => {
    jest.useFakeTimers();

    const firstOnAutoClose = jest.fn();
    const secondOnAutoClose = jest.fn();
    render(<div />);

    const firstToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
        duration: ToastDuration.Short,
        onAutoClose: firstOnAutoClose,
      }),
    );

    const secondToastId = trackToastId(
      toast.success({
        description: SUCCESS_MESSAGE,
        duration: ToastDuration.Short,
        onAutoClose: secondOnAutoClose,
      }),
    );

    expect(firstToastId).not.toBe(secondToastId);

    await waitFor(() => {
      expect(screen.getAllByText(SUCCESS_MESSAGE)).toHaveLength(2);
    });

    act(() => {
      jest.advanceTimersByTime(8000);
      jest.runOnlyPendingTimers();
    });

    act(() => {
      // Sonner finalizes auto-dismiss on the next animation frame.
      jest.advanceTimersToNextFrame();
    });

    await waitFor(() => {
      expect(firstOnAutoClose).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(secondOnAutoClose).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.queryAllByText(SUCCESS_MESSAGE)).toHaveLength(0);
    });
  });
});
