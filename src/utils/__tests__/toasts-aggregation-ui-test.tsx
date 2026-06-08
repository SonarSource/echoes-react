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
import { createToastTestState, render } from '~common/helpers/test-utils';
import { toast, ToastDuration } from '..';
import { clearRepeatedToastTracking } from '../toast-internals/repeated-toast-tracking';
import { AggregatedRepeatedToasts } from '../../../stories/Toast-stories';

const uploadCompleteToast = {
  description: 'File uploaded',
  title: 'Upload complete',
} as const;

const descriptionOnlyUploadCompleteToast = {
  description: 'File uploaded',
} as const;

const { resetToastTestState, trackToastId } = createToastTestState({
  cleanupTrackedToast: clearRepeatedToastTracking,
});

describe('toast utility - automatic aggregation UI', () => {
  afterEach(resetToastTestState);

  it('should aggregate repeated toasts without a title when the description and variety match', async () => {
    render(<div />);

    trackToastId(toast.success(descriptionOnlyUploadCompleteToast));

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    trackToastId(toast.success(descriptionOnlyUploadCompleteToast));

    expect(await screen.findByText('Shown 2 times')).toBeInTheDocument();
    expect(screen.getAllByText('File uploaded')).toHaveLength(1);
    expect(screen.queryByText('Upload complete')).not.toBeInTheDocument();
    expect(screen.getByText(/^2$/)).toBeInTheDocument();
  });

  it('should treat blank plain-text titles as absent when aggregating repeated toasts', async () => {
    render(<div />);

    trackToastId(
      toast.success({
        ...descriptionOnlyUploadCompleteToast,
        title: '   ',
      }),
    );

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    trackToastId(toast.success(descriptionOnlyUploadCompleteToast));

    expect(await screen.findByText('Shown 2 times')).toBeInTheDocument();
    expect(screen.getAllByText('File uploaded')).toHaveLength(1);
    expect(screen.queryByText('Upload complete')).not.toBeInTheDocument();
    expect(screen.getByText(/^2$/)).toBeInTheDocument();
  });

  it('should aggregate repeated toasts with the same plain-text title, description, and variety', async () => {
    render(<div />);

    trackToastId(toast.success(uploadCompleteToast));

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    trackToastId(toast.success(uploadCompleteToast));
    trackToastId(toast.success(uploadCompleteToast));

    expect(await screen.findByText('Shown 3 times')).toBeInTheDocument();
    expect(screen.getAllByText('File uploaded')).toHaveLength(1);
    expect(screen.getByText('Upload complete')).toBeInTheDocument();
    expect(screen.getByText(/^3$/)).toBeInTheDocument();
  });

  it('should cap the visible repetition counter at 99 plus', async () => {
    render(<div />);

    for (let i = 1; i <= 100; i++) {
      trackToastId(toast.success(uploadCompleteToast));
    }

    expect(await screen.findByText('Shown 100 times')).toBeInTheDocument();
    expect(screen.getByText(/^99\+$/)).toBeInTheDocument();
  });

  it('should reset the aggregation count after a UI dismiss', async () => {
    const { user } = render(<div />);

    trackToastId(
      toast.success({
        ...uploadCompleteToast,
        duration: ToastDuration.Infinite,
        isDismissable: true,
      }),
    );

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    trackToastId(
      toast.success({
        ...uploadCompleteToast,
        duration: ToastDuration.Infinite,
        isDismissable: true,
      }),
    );

    expect(await screen.findByText('Shown 2 times')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Dismiss toast' }));
    await waitForElementToBeRemoved(() => screen.queryByText('File uploaded'));

    trackToastId(toast.success(uploadCompleteToast));

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();
    expect(screen.getAllByText('File uploaded')).toHaveLength(1);
    expect(screen.queryByText('Shown 2 times')).not.toBeInTheDocument();
    expect(screen.queryByText(/^2$/)).not.toBeInTheDocument();
  });

  it('should reset aggregation after the first occurrence auto-closes', async () => {
    jest.useFakeTimers();
    render(<div />);

    trackToastId(
      toast.info({
        ...uploadCompleteToast,
        duration: ToastDuration.Short,
      }),
    );

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(8000);
      jest.runOnlyPendingTimers();
    });

    act(() => {
      // Sonner finalizes auto-dismiss on the next animation frame.
      jest.advanceTimersToNextFrame();
    });

    await waitFor(() => {
      expect(screen.queryByText('File uploaded')).not.toBeInTheDocument();
    });

    trackToastId(
      toast.info({
        ...uploadCompleteToast,
        duration: ToastDuration.Short,
      }),
    );

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();
    expect(screen.queryByText('Shown 2 times')).not.toBeInTheDocument();
  });

  it('should keep the aggregation story aggregating when Storybook injects lifecycle action args', async () => {
    jest.useFakeTimers();

    const storyElement = AggregatedRepeatedToasts.render!(
      {
        description: 'File uploaded',
        isDismissable: true,
        onAutoClose: jest.fn(),
        onDismiss: jest.fn(),
        variety: 'success',
      },
      {} as never,
    );

    const { user } = render(<>{storyElement}</>, undefined, {
      advanceTimers: jest.advanceTimersByTime,
    });

    await user.click(screen.getByRole('button', { name: 'Show aggregated repeated toast' }));

    expect(await screen.findByText('File uploaded')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(600);
    });

    expect(await screen.findByText('Shown 3 times')).toBeInTheDocument();
    expect(screen.getAllByText('File uploaded')).toHaveLength(1);
  });
});
