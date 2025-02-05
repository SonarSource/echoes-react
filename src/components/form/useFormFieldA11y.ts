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
import { useId } from 'react';

type UseFormFieldA11yInput = {
  /**
   * Explicitly set the `controlId` for the form field (optional).
   */
  controlId?: string;
  /**
   * Whether the form field has a help text (optional).
   */
  hasHelpText?: boolean;
  /**
   * Whether the form field has a validation message (optional).
   */
  hasValidationMessage?: boolean;
};

type UseFormFieldA11yOutput = {
  /**
   * The ID that should be used for the form control.
   */
  controlId: string;
  /**
   * The ID that should be used for the `aria-describedby` attribute.
   */
  describedBy: string | undefined;
  /**
   * The ID that should be used for the help text.
   */
  helpTextId: string;
  /**
   * The ID that should be used for the label.
   */
  labelId: string;
  /**
   * The ID that should be used for the validation message.
   */
  validationMessageId: string;
};

/**
 * This hook may be used to generate accessibility props for a form field.
 *
 * **Example**
 *
 * ```typescript
 * const {
 *   controlId,
 *   describedBy,
 *   helpTextId,
 *   labelId,
 *   validationMessageId
 * } = useFormFieldA11y()
 * ```
 */
export function useFormFieldA11y(input: UseFormFieldA11yInput = {}): UseFormFieldA11yOutput {
  const { controlId, hasHelpText, hasValidationMessage } = input;

  const defaultId = useId();
  const id = controlId ?? defaultId;
  const describedBy: string[] = [];
  const helpTextId = `${controlId}-help-text`;
  const labelId = `${controlId}-label`;
  const validationMessageId = `${controlId}-validation-message`;

  if (hasValidationMessage) {
    describedBy.push(validationMessageId);
  }

  if (hasHelpText) {
    describedBy.push(helpTextId);
  }

  return {
    controlId: id,
    describedBy: describedBy.length > 0 ? describedBy.join(' ') : undefined,
    helpTextId,
    labelId,
    validationMessageId,
  };
}
