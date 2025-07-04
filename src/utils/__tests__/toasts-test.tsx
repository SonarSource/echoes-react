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

import { createRef } from 'react';
import { toast as sonnerToast } from 'sonner';
import { ToastVariety } from '~common/components/Toast';
import { toast, ToastDuration } from '..';

// Mock sonner toast
jest.mock('sonner', () => ({
  toast: {
    custom: jest.fn(),
    dismiss: jest.fn(),
  },
}));

const mockSonnerToast = sonnerToast as jest.Mocked<typeof sonnerToast>;

const TEST_MESSAGE = 'Test message';
const TOAST_ID = 'toast-id-123';

describe('toast utility - basic functionality', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSonnerToast.custom.mockReturnValue(TOAST_ID);
  });

  it('should create a toast with required parameters and return toast ID', () => {
    const result = toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
    });

    expect(result).toBe(TOAST_ID);
    expect(mockSonnerToast.custom).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: 16000, // Medium duration
      }),
    );
  });

  it('should create a toast with all optional parameters', () => {
    const onAutoClose = jest.fn();
    const onDismiss = jest.fn();
    const actions = jest.fn();

    toast({
      variety: ToastVariety.Success,
      title: 'Success title',
      description: 'Success message',
      id: 'custom-id',
      duration: ToastDuration.Infinite,
      isDismissable: true,
      actions,
      onAutoClose,
      onDismiss,
    });

    expect(mockSonnerToast.custom).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: Infinity,
        id: 'custom-id',
        onAutoClose,
        onDismiss,
      }),
    );
  });

  it('should not pass id to sonner when id is undefined', () => {
    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      id: undefined,
    });

    const [, options] = mockSonnerToast.custom.mock.calls[0];
    expect(options).not.toHaveProperty('id');
  });
});

describe('toast utility - duration and dismissible behavior', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSonnerToast.custom.mockReturnValue(TOAST_ID);
  });

  it('should use default medium duration when not specified', () => {
    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
    });

    expect(mockSonnerToast.custom).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: 16000, // Medium duration
      }),
    );
  });

  it('should map duration enum values to correct milliseconds', () => {
    const durations = [
      { duration: ToastDuration.Short, expected: 8000 },
      { duration: ToastDuration.Medium, expected: 16000 },
      { duration: ToastDuration.Long, expected: 24000 },
      { duration: ToastDuration.Infinite, expected: Infinity },
    ];

    durations.forEach(({ duration, expected }) => {
      mockSonnerToast.custom.mockClear();

      toast({
        variety: ToastVariety.Info,
        description: TEST_MESSAGE,
        duration,
        isDismissable: duration === ToastDuration.Infinite,
      });

      expect(mockSonnerToast.custom).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          duration: expected,
        }),
      );
    });
  });

  it('should automatically use infinite duration and make dismissible when toast has actions', () => {
    const actions = jest.fn();

    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      duration: ToastDuration.Infinite,
      actions,
      isDismissable: true,
    });

    expect(mockSonnerToast.custom).toHaveBeenCalledWith(
      expect.any(Function),
      expect.objectContaining({
        duration: Infinity,
      }),
    );

    const [toastComponent] = mockSonnerToast.custom.mock.calls[0];
    const renderedToast = toastComponent('test-id');

    expect(renderedToast.props.isDismissable).toBe(true);
  });

  it('should make infinite duration toasts dismissible', () => {
    toast({
      variety: ToastVariety.Info,
      description: TEST_MESSAGE,
      duration: ToastDuration.Infinite,
      isDismissable: true,
    });

    const [toastComponent] = mockSonnerToast.custom.mock.calls[0];
    const renderedToast = toastComponent('test-id');

    expect(renderedToast.props.isDismissable).toBe(true);
  });
});

describe('toast utility - variety shortcuts and integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSonnerToast.custom.mockReturnValue(TOAST_ID);
  });

  const shortcutTests = [
    { method: 'success', expectedVariety: 'success' },
    { method: 'error', expectedVariety: 'danger' },
    { method: 'info', expectedVariety: 'info' },
    { method: 'warning', expectedVariety: 'warning' },
  ] as const;

  shortcutTests.forEach(({ method, expectedVariety }) => {
    it(`should create ${method} toast with correct variety and handle ref`, () => {
      const ref = createRef<HTMLDivElement>();

      toast[method](
        {
          description: `${method} message`,
          title: `${method} title`,
        },
        ref,
      );

      const [toastComponent] = mockSonnerToast.custom.mock.calls[0];
      const renderedToast = toastComponent('test-id');

      expect(renderedToast.props.variety).toBe(expectedVariety);
      expect(renderedToast.props.description).toBe(`${method} message`);
      expect(renderedToast.props.title).toBe(`${method} title`);
      expect(renderedToast.props.id).toBe('test-id');
    });
  });

  it('should dismiss toast by calling sonner dismiss', () => {
    const toastId = 'test-toast-id';

    toast.dismiss(toastId);

    expect(mockSonnerToast.dismiss).toHaveBeenCalledWith(toastId);
  });

  it('should render Toast component with all props correctly', () => {
    const actions = jest.fn();

    toast({
      variety: ToastVariety.Warning,
      title: 'Warning title',
      description: 'Warning description',
      actions,
      isDismissable: true,
    });

    const [toastComponent] = mockSonnerToast.custom.mock.calls[0];
    const renderedToast = toastComponent('rendered-id');

    expect(renderedToast.props).toEqual(
      expect.objectContaining({
        id: 'rendered-id',
        variety: ToastVariety.Warning,
        title: 'Warning title',
        description: 'Warning description',
        actions,
        isDismissable: true,
      }),
    );
  });
});
