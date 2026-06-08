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

import { type ToastId, ToastVariety } from '~common/components/Toast';
import { clearRepeatedToastTracking, trackRepeatedToast } from '../repeated-toast-tracking';

const trackedToastIds = new Set<ToastId>();

const uploadCompleteToast = {
  description: 'File uploaded',
  title: 'Upload complete',
  variety: ToastVariety.Success,
} as const;

const descriptionOnlyUploadCompleteToast = {
  description: 'File uploaded',
  variety: ToastVariety.Success,
} as const;

const uploadCompleteToastWithStringArrays = {
  description: ['File', ' uploaded'],
  title: ['Upload', ' complete'],
  variety: ToastVariety.Success,
} as const;

function rememberTrackedToast(trackedToastState: ReturnType<typeof trackRepeatedToast>) {
  if (trackedToastState !== undefined) {
    trackedToastIds.add(trackedToastState.id);
  }

  return trackedToastState;
}

afterEach(() => {
  for (const toastId of trackedToastIds) {
    clearRepeatedToastTracking(toastId);
  }

  trackedToastIds.clear();
});

describe('repeated toast tracking', () => {
  it('should increment the count for repeated plain-text toasts with a title', () => {
    const firstToast = rememberTrackedToast(trackRepeatedToast(uploadCompleteToast));

    expect(firstToast).toEqual({
      count: 1,
      id: expect.any(String),
    });

    const secondToast = rememberTrackedToast(trackRepeatedToast(uploadCompleteToast));

    expect(secondToast).toEqual({
      count: 2,
      id: firstToast?.id,
    });
  });

  it('should normalize surrounding whitespace before matching repeated plain-text toasts', () => {
    const firstToast = rememberTrackedToast(
      trackRepeatedToast({
        description: '  File uploaded  ',
        title: '  Upload complete  ',
        variety: ToastVariety.Success,
      }),
    );

    const secondToast = rememberTrackedToast(trackRepeatedToast(uploadCompleteToast));

    expect(secondToast).toEqual({
      count: 2,
      id: firstToast?.id,
    });
  });

  it('should increment the count for repeated plain-text toasts without a title', () => {
    const firstToast = rememberTrackedToast(trackRepeatedToast(descriptionOnlyUploadCompleteToast));

    expect(firstToast).toEqual({
      count: 1,
      id: expect.any(String),
    });

    const secondToast = rememberTrackedToast(
      trackRepeatedToast(descriptionOnlyUploadCompleteToast),
    );

    expect(secondToast).toEqual({
      count: 2,
      id: firstToast?.id,
    });
  });

  it('should use different synthetic ids when the variety differs', () => {
    const firstToast = rememberTrackedToast(
      trackRepeatedToast({
        description: 'Test message',
        title: 'Notification',
        variety: ToastVariety.Info,
      }),
    );

    const secondToast = rememberTrackedToast(
      trackRepeatedToast({
        description: 'Test message',
        title: 'Notification',
        variety: ToastVariety.Danger,
      }),
    );

    expect(firstToast?.id).not.toBe(secondToast?.id);
    expect(firstToast?.count).toBe(1);
    expect(secondToast?.count).toBe(1);
  });

  it('should not track toasts with an explicit id, actions, or lifecycle callbacks', () => {
    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        id: 'custom-toast-id',
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        actions: () => 'Undo action',
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        onAutoClose: jest.fn(),
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        onDismiss: jest.fn(),
      }),
    ).toBeUndefined();
  });

  it('should treat blank plain-text titles as absent and still require visible plain-text content', () => {
    const descriptionOnlyToast = rememberTrackedToast(
      trackRepeatedToast(descriptionOnlyUploadCompleteToast),
    );

    expect(descriptionOnlyToast).toEqual({
      count: 1,
      id: expect.any(String),
    });

    const blankTitleToast = rememberTrackedToast(
      trackRepeatedToast({
        ...uploadCompleteToast,
        title: '',
      }),
    );

    expect(blankTitleToast).toEqual({
      count: 2,
      id: descriptionOnlyToast?.id,
    });

    const whitespaceTitleToast = rememberTrackedToast(
      trackRepeatedToast({
        ...uploadCompleteToast,
        title: '   ',
      }),
    );

    expect(whitespaceTitleToast).toEqual({
      count: 3,
      id: descriptionOnlyToast?.id,
    });

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        title: <span>Upload complete</span>,
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        description: '',
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        description: '   ',
      }),
    ).toBeUndefined();

    expect(rememberTrackedToast(trackRepeatedToast(uploadCompleteToast))).toEqual({
      count: 1,
      id: expect.any(String),
    });
  });

  it('should not track toasts with non-text descriptions', () => {
    expect(
      trackRepeatedToast({
        ...uploadCompleteToast,
        description: <span>File uploaded</span>,
      }),
    ).toBeUndefined();
  });

  it('should track plain-text string array content', () => {
    const firstToast = rememberTrackedToast(
      trackRepeatedToast(uploadCompleteToastWithStringArrays),
    );

    expect(firstToast).toEqual({
      count: 1,
      id: expect.any(String),
    });

    const secondToast = rememberTrackedToast(
      trackRepeatedToast(uploadCompleteToastWithStringArrays),
    );

    expect(secondToast).toEqual({
      count: 2,
      id: firstToast?.id,
    });
  });

  it('should not track non-array text iterables', () => {
    expect(
      trackRepeatedToast({
        description: new Set(['File', ' uploaded']),
        title: new Set(['Upload', ' complete']),
        variety: ToastVariety.Info,
      }),
    ).toBeUndefined();
  });

  it('should not track string array content with non-text children', () => {
    expect(
      trackRepeatedToast({
        description: ['File', <span key="description-child"> uploaded</span>],
        title: ['Upload', <span key="title-child"> complete</span>],
        variety: ToastVariety.Info,
      }),
    ).toBeUndefined();

    expect(
      trackRepeatedToast({
        description: 'File uploaded',
        title: ['Upload', <span key="title-child"> complete</span>],
        variety: ToastVariety.Info,
      }),
    ).toBeUndefined();
  });

  it('should reset the count with a fresh id after clearing a tracked toast', () => {
    const firstToast = rememberTrackedToast(trackRepeatedToast(uploadCompleteToast));

    clearRepeatedToastTracking(firstToast!.id);

    const secondToast = rememberTrackedToast(trackRepeatedToast(uploadCompleteToast));

    expect(secondToast).toEqual({
      count: 1,
      id: expect.any(String),
    });

    expect(secondToast?.id).not.toBe(firstToast?.id);
  });
});
