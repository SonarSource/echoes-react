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

import { isValidElement } from 'react';
import { type ToastId, type ToastProps } from '~common/components/Toast';
import { isDefined } from '~common/helpers/types';
import { type TextNodeOptional } from '~types/utils';

/**
 * Figures out whether a new toast call should reuse an existing visible toast instead of creating
 * a second one.
 */
interface RepeatedToastTrackingParams extends Pick<
  ToastProps,
  'actions' | 'description' | 'title' | 'variety'
> {
  id?: ToastId;
  onAutoClose?: VoidFunction;
  onDismiss?: VoidFunction;
}

interface RepeatedToastTrackingState {
  count: number;
}

interface RepeatedToastTrackingStateWithId extends RepeatedToastTrackingState {
  id: ToastId;
}

const REPEATED_TOAST_ID_PREFIX = 'echoes-toast-auto::';
// Keyed by the normalized aggregation key for the currently visible toast.
const repeatedToastStateByKey = new Map<string, RepeatedToastTrackingStateWithId>();
const repeatedToastKeyById = new Map<ToastId, string>();
let repeatedToastIdSequence = 0;

export function trackRepeatedToast(
  params: Readonly<RepeatedToastTrackingParams>,
): RepeatedToastTrackingStateWithId | undefined {
  const repeatedToastKey = getRepeatedToastKey(params);

  if (!isDefined(repeatedToastKey)) {
    return undefined;
  }

  const currentState = repeatedToastStateByKey.get(repeatedToastKey);

  const nextState = isDefined(currentState)
    ? {
        id: currentState.id,
        count: currentState.count + 1,
      }
    : {
        id: getNextRepeatedToastId(),
        count: 1,
      };

  repeatedToastStateByKey.set(repeatedToastKey, nextState);
  repeatedToastKeyById.set(nextState.id, repeatedToastKey);

  return nextState;
}

export function clearRepeatedToastTracking(repeatedToastId: ToastId) {
  const repeatedToastKey = repeatedToastKeyById.get(repeatedToastId);

  if (!isDefined(repeatedToastKey)) {
    return;
  }

  repeatedToastKeyById.delete(repeatedToastId);
  repeatedToastStateByKey.delete(repeatedToastKey);
}

export function isRepeatedToastId(toastId: ToastId | undefined): toastId is string {
  return typeof toastId === 'string' && toastId.startsWith(REPEATED_TOAST_ID_PREFIX);
}

function getRepeatedToastKey(params: Readonly<RepeatedToastTrackingParams>): string | undefined {
  if (
    isDefined(params.id) ||
    isDefined(params.actions) ||
    isDefined(params.onAutoClose) ||
    isDefined(params.onDismiss)
  ) {
    return undefined;
  }

  // Aggregation is intentionally narrower than rendering: only visible plain-text titles
  // participate in the matching key. Blank plain-text titles are treated the same as no title.
  const hasProvidedTitle = isDefined(params.title) && params.title !== false;
  const plainTextTitleCandidate = getToastPlainText(params.title)?.trim();
  const normalizedPlainTextTitle = hasVisibleText(plainTextTitleCandidate)
    ? plainTextTitleCandidate
    : undefined;
  const descriptionText = getToastPlainText(params.description)?.trim();

  if (
    !hasVisibleText(descriptionText) ||
    (hasProvidedTitle && !isDefined(plainTextTitleCandidate))
  ) {
    return undefined;
  }

  return `${REPEATED_TOAST_ID_PREFIX}${encodeURIComponent(
    JSON.stringify([params.variety, normalizedPlainTextTitle, descriptionText]),
  )}`;
}

function getNextRepeatedToastId() {
  repeatedToastIdSequence += 1;

  return `${REPEATED_TOAST_ID_PREFIX}${repeatedToastIdSequence}`;
}

function hasVisibleText(text: string | undefined): text is string {
  return isDefined(text) && text.trim().length > 0;
}

function getToastPlainText(node: TextNodeOptional | undefined): string | undefined {
  if (!isDefined(node) || typeof node === 'boolean') {
    return undefined;
  }

  if (typeof node === 'string') {
    return node;
  }

  // Keep aggregation intentionally narrow: only strings and arrays of text are supported so we do
  // not consume arbitrary iterables before React renders them.
  if (isValidElement(node) || !Array.isArray(node)) {
    return undefined;
  }

  let text = '';

  for (const child of node) {
    const childText = getToastPlainText(child);

    if (!isDefined(childText)) {
      return undefined;
    }

    text += childText;
  }

  return text;
}
