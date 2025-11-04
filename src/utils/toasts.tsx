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

import { Ref } from 'react';
import { toast as sonnerToast } from 'sonner';
import { Toast, ToastId, ToastProps } from '~common/components/Toast';
import { isDefined } from '~common/helpers/types';

export { ToastVariety } from '~common/components/Toast';

/**
 * Represents the available duration options for toast notifications.
 */
export enum ToastDuration {
  /**
   * Short duration for toasts with only 1 line of text (8 seconds).
   */
  Short = 'short',
  /**
   * Medium duration for toasts with 2 lines of text (16 seconds) - default duration.
   */
  Medium = 'medium',
  /**
   * Long duration for toasts with 3 lines of text (24 seconds).
   */
  Long = 'long',
  /**
   * Infinite duration toast that remains visible until manually dismissed.
   * Mandatory when the toast has actions.
   */
  Infinite = 'infinite',
}

export interface ToastParams extends Omit<ToastProps, 'id'> {
  /**
   * Optional unique identifier for the toast. If not provided, one will be generated automatically.
   * This ID is used to manage the toast's lifecycle, such as dismissing it manually or modifying it.
   * Using the same ID for multiple toast call will update the existing toast instead of creating a new one.
   */
  id?: ToastId;
  /**
   * How long the toast should remain visible (optional). The default is `medium`.
   * Note: Toasts with actions must use infinite duration.
   */
  duration?: `${ToastDuration}`;
  /**
   * Callback function executed when the toast auto-closes due reaching the end of its duration (optional).
   */
  onAutoClose?: VoidFunction;
  /**
   * Callback function executed when the toast is manually dismissed (optional).
   */
  onDismiss?: VoidFunction;
}

type ToastShortcutParams = Omit<ToastParams, 'variety'>;

function toastFn(params: ToastParams, ref?: Ref<HTMLDivElement>): ToastId {
  const {
    duration = ToastDuration.Medium,
    className,
    id,
    isDismissable,
    onAutoClose,
    onDismiss,
    ...toastProps
  } = params;

  const durationValue = isDefined(toastProps.actions)
    ? TOAST_DURATION_MAP[ToastDuration.Infinite]
    : TOAST_DURATION_MAP[duration];

  const isDismissableValue = durationValue === Infinity || isDismissable;

  return sonnerToast.custom(
    (id) => <Toast id={id} isDismissable={isDismissableValue} ref={ref} {...toastProps} />,
    {
      className,
      duration: durationValue,
      onAutoClose,
      onDismiss,
      // Passing id={undefined} breaks the dismiss functionality in Sonner
      ...(isDefined(id) ? { id } : {}),
    },
  );
}

type ToastFn = {
  <T extends ToastParams>(params: TypeGuardValidToastParams<T>): ToastId;
  /**
   * Creates a success toast notification.
   * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'success')
   * @param ref - Optional React ref for the toast element
   * @returns The unique identifier of the created toast
   */
  success: <T extends ToastShortcutParams>(
    params: TypeGuardValidToastParams<T>,
    ref?: Ref<HTMLDivElement>,
  ) => ToastId;
  /**
   * Creates an error toast notification.
   * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'danger')
   * @param ref - Optional React ref for the toast element
   * @returns The unique identifier of the created toast
   */
  error: <T extends ToastShortcutParams>(
    params: TypeGuardValidToastParams<T>,
    ref?: Ref<HTMLDivElement>,
  ) => ToastId;
  /**
   * Creates an info toast notification.
   * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'info')
   * @param ref - Optional React ref for the toast element
   * @returns The unique identifier of the created toast
   */
  info: <T extends ToastShortcutParams>(
    params: TypeGuardValidToastParams<T>,
    ref?: Ref<HTMLDivElement>,
  ) => ToastId;
  /**
   * Creates a warning toast notification.
   * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'warning')
   * @param ref - Optional React ref for the toast element
   * @returns The unique identifier of the created toast
   */
  warning: <T extends ToastShortcutParams>(
    params: TypeGuardValidToastParams<T>,
    ref?: Ref<HTMLDivElement>,
  ) => ToastId;
  /**
   * Dismisses a toast notification by its ID.
   * @param id - The unique identifier of the toast to dismiss
   */
  dismiss: (id: ToastId) => void;
};

/**
 * Toast utility for creating and managing toast notifications.
 *
 * @param params - {@link ToastParams | Toast configuration object} (variety automatically set to 'success')
 * @param ref - Optional React ref for the toast element
 * @returns The unique identifier of the created toast
 *
 * **Updating a toast**
 *
 * It's possible to update an existing toast with new texts, new variety, etc, by just calling the
 * `toast` function again with the same ID.
 *
 * **Important Rules**
 *
 * - Toasts with actions must be dismissible and have infinite duration
 * - Infinite duration toasts must be dismissible
 *
 * **Basic Usage**
 *
 * ```tsx
 * // Toast
 * const id = toast({
 *   variety: ToastVariety.Success,
 *   description: "Operation completed successfully"
 * });
 *
 * // Variety shortcuts
 * toast.success({ description: "File saved!" });
 * toast.error({ description: "Failed to save file" });
 * toast.info({ description: "New update available" });
 * toast.warning({ description: "Storage space is low" });
 *
 * // With actions
 * toast.success({
 *   title: "File uploaded",
 *   description: "Your file has been uploaded successfully.",
 *   isDismissable: true,
 *   duration: ToastDuration.Infinite,
 *   actions: ({ dismiss }) => (
 *     <Button onClick={dismiss}>
 *       View File
 *     </Button>
 *   )
 * });
 *
 * // Manual dismiss of a toast using its ID
 * toast.dismiss(id);
 * ```
 */
export const toast: ToastFn = Object.assign(toastFn, {
  success: (
    params: ToastShortcutParams['description'] | ToastShortcutParams,
    ref?: Ref<HTMLDivElement>,
  ) =>
    typeof params === 'object' && 'description' in params
      ? toastFn({ ...params, variety: 'success' }, ref)
      : toastFn({ description: params, variety: 'success' }, ref),
  error: (params: ToastShortcutParams, ref?: Ref<HTMLDivElement>) =>
    toastFn({ ...params, variety: 'danger' }, ref),
  info: (params: ToastShortcutParams, ref?: Ref<HTMLDivElement>) =>
    toastFn({ ...params, variety: 'info' }, ref),
  warning: (params: ToastShortcutParams, ref?: Ref<HTMLDivElement>) =>
    toastFn({ ...params, variety: 'warning' }, ref),
  dismiss: (id: ToastId) => sonnerToast.dismiss(id),
});

const TOAST_DURATION_MAP = {
  [ToastDuration.Short]: 8000,
  [ToastDuration.Medium]: 16000,
  [ToastDuration.Long]: 24000,
  [ToastDuration.Infinite]: Infinity,
} as const;

type InvalidToastActionNoDismissable = {
  actions: Required<ToastParams['actions']>;
  isDismissable?: false;
};

type InvalidToastActionNoInfinite = {
  actions: Required<ToastParams['actions']>;
  duration?: `${Exclude<ToastDuration, ToastDuration.Infinite>}`;
};

type InvalidToastInfiniteNoDismissable = {
  duration: ToastDuration.Infinite;
  isDismissable?: false;
};

/**
 * Compile-time type guard that enforces toast parameter validation rules, and displays human
 * readable error messages when we don't follow the rules.
 */
type TypeGuardValidToastParams<T extends ToastShortcutParams> =
  T extends InvalidToastActionNoDismissable
    ? '🚨 A toast with the `actions` param must also have the `isDismissable` param set to `true`'
    : T extends InvalidToastActionNoInfinite
      ? '🚨 A toast with the `actions` param must also have the `duration` param set to `infinite`'
      : T extends InvalidToastInfiniteNoDismissable
        ? '🚨 A toast with the `duration` param set to `infinite` must also have the `isDismissable` param set to `true`'
        : T;
