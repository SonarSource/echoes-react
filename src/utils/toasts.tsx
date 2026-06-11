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
import {
  clearRepeatedToastTracking,
  isRepeatedToastId,
  trackRepeatedToast,
} from './toast-internals/repeated-toast-tracking';

export { ToastVariety } from '~common/components/Toast';

/**
 * Represents the available duration options for toast notifications.
 */
export enum ToastDuration {
  /**
   * Short duration (3 seconds) for brief transient toasts when a shorter-than-default lifetime is
   * intentional.
   */
  Short = 'short',
  /**
   * Medium duration (5 seconds). This is the default for regular toasts.
   */
  Medium = 'medium',
  /**
   * Long duration (8 seconds). This is the default for toasts with actions, or for regular toasts
   * that intentionally need a bit more time.
   */
  Long = 'long',
  /**
   * Infinite duration for toasts that must remain visible until the user dismisses them, such as
   * critical or complex errors.
   */
  Infinite = 'infinite',
}

export interface ToastParams extends Omit<ToastProps, 'id' | 'repetitionCount'> {
  /**
   * Optional stable identifier for the toast. If not provided, one will be generated automatically.
   * This ID is used to manage the toast's lifecycle, such as dismissing it manually or updating it.
   * Reusing the same `id` is the supported way to intentionally replace or update the existing
   * toast instead of creating a second one. Providing an explicit `id` also bypasses automatic
   * same-text toast aggregation, so the provided `id` is used as-is.
   */
  id?: ToastId;
  /**
   * How long the toast should remain visible (optional). The default is `medium` for regular
   * toasts and `long` for toasts with actions.
   * Set `short` or `long` explicitly only when the toast should be shorter- or longer-lived than
   * those defaults.
   * Use `infinite` explicitly for critical or complex errors that should stay visible until
   * dismissal.
   */
  duration?: `${ToastDuration}`;
  /**
   * Callback function executed when the toast auto-closes due to reaching the
   * end of its duration (optional). Providing this callback opts the toast out
   * of automatic same-text aggregation.
   */
  onAutoClose?: VoidFunction;
  /**
   * Callback function executed when the toast is manually dismissed
   * (optional). Providing this callback opts the toast out of automatic
   * same-text aggregation.
   */
  onDismiss?: VoidFunction;
}

type ToastShortcutParams = Omit<ToastParams, 'variety'>;

function toastFn(params: ToastParams, ref?: Ref<HTMLDivElement>): ToastId {
  const { duration, className, id, isDismissable, onAutoClose, onDismiss, ...toastProps } = params;

  if (isDefined(id) && isRepeatedToastId(id)) {
    clearRepeatedToastTracking(id);
  }

  // Repeated plain-text toasts of the same variety reuse a synthetic id so they stay as one
  // visible toast with an incrementing counter instead of stacking duplicates.
  const repeatedToastState = trackRepeatedToast(params);
  const repeatedToastId = repeatedToastState?.id;
  const repeatedToastCount = repeatedToastState?.count;
  const hasActions = isDefined(toastProps.actions);

  const resolvedDuration = duration ?? (hasActions ? ToastDuration.Long : ToastDuration.Medium);

  const durationValue = TOAST_DURATION_MAP[resolvedDuration];
  const isDismissableValue = durationValue === Infinity || hasActions || isDismissable;
  const visibleToastId = repeatedToastId ?? id;
  const trackedRepeatedToastId = isRepeatedToastId(visibleToastId) ? visibleToastId : undefined;

  const clearRepeatedToastTrackingIfNeeded = () => {
    if (!isDefined(trackedRepeatedToastId)) {
      return;
    }

    clearRepeatedToastTracking(trackedRepeatedToastId);
  };

  // Repeated toasts share the same id and count, but Sonner still owns their lifetime.
  const handleToastAutoClose =
    isDefined(trackedRepeatedToastId) || isDefined(onAutoClose)
      ? () => {
          clearRepeatedToastTrackingIfNeeded();

          onAutoClose?.();
        }
      : undefined;

  const handleToastDismiss =
    isDefined(trackedRepeatedToastId) || isDefined(onDismiss)
      ? () => {
          clearRepeatedToastTrackingIfNeeded();

          onDismiss?.();
        }
      : undefined;

  return sonnerToast.custom(
    (id) => (
      <Toast
        id={id}
        isDismissable={isDismissableValue}
        ref={ref}
        repetitionCount={repeatedToastCount}
        {...toastProps}
      />
    ),
    {
      className,
      duration: durationValue,
      onAutoClose: handleToastAutoClose,
      onDismiss: handleToastDismiss,
      // Passing id={undefined} breaks the dismiss functionality in Sonner
      ...(isDefined(visibleToastId) ? { id: visibleToastId } : {}),
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
 * **Updating a toast with a stable id**
 *
 * Reuse a stable `id` when a later toast call should replace or update an existing visible toast.
 * Calling `toast` or one of the variety shortcuts again with that `id` updates the existing toast
 * instead of creating a second one.
 *
 * **Aggregating repeated toasts**
 *
 * When no explicit `id` is provided, repeated calls with the same plain-text `description` and
 * the same `variety` reuse the existing toast instead of creating duplicates. If the toast also
 * has a plain-text `title`, that title must match too. The toast keeps its original text and
 * shows a counter badge next to the title, or next to the description when there is no title.
 *
 * Toasts with actions, lifecycle callbacks, non-text descriptions, or non-text titles are not
 * automatically aggregated. Blank plain-text titles are treated the same as no title.
 * When automatic aggregation happens, non-key props from the latest matching call, such as
 * `duration`, `isDismissable`, `className`, and `screenReaderPrefix`, are applied to the shared
 * toast.
 *
 * **Important Rules**
 *
 * - Toasts with actions must be dismissible
 * - Infinite duration toasts must be dismissible
 * - Use `ToastDuration.Infinite` explicitly for critical or complex errors that should stay
 *   visible until dismissal
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
 * // Update an existing toast by reusing a stable ID
 * const syncToastId = "repository-sync";
 *
 * toast.info({
 *   id: syncToastId,
 *   description: "Synchronizing repository settings..."
 * });
 *
 * toast.success({
 *   id: syncToastId,
 *   description: "Repository settings synchronized."
 * });
 *
 * // With actions
 * toast.success({
 *   title: "File uploaded",
 *   description: "Your file has been uploaded successfully.",
 *   isDismissable: true,
 *   actions: ({ dismiss }) => (
 *     <Button onClick={dismiss}>
 *       View File
 *     </Button>
 *   )
 * });
 *
 * // Critical or complex errors that must stay visible
 * toast.error({
 *   title: "Repository synchronization failed",
 *   description: "Resolve the underlying issue before retrying.",
 *   duration: ToastDuration.Infinite,
 *   isDismissable: true
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
  backgroundTask: (params: ToastShortcutParams, ref?: Ref<HTMLDivElement>) =>
    toastFn({ ...params, variety: 'background-task' }, ref),
});

const TOAST_DURATION_MAP = {
  [ToastDuration.Short]: 3000,
  [ToastDuration.Medium]: 5000,
  [ToastDuration.Long]: 8000,
  [ToastDuration.Infinite]: Infinity,
} as const;

type InvalidToastActionNoDismissable = {
  actions: Required<ToastParams['actions']>;
  isDismissable?: false;
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
    ? '🚨 A toast with `actions` must also set `isDismissable: true`'
    : T extends InvalidToastInfiniteNoDismissable
      ? '🚨 A toast with `duration: infinite` must also set `isDismissable: true`'
      : T;
