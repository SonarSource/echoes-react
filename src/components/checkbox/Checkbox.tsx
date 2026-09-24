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

import { forwardRef, useCallback, useId } from 'react';
import { PropsWithLabelsAndHelpText } from '~types/utils';
import { HelperText } from '../typography';
import { CheckboxIcon } from './CheckboxIcon';
import {
  CheckboxContainer,
  CheckboxIndicator,
  CheckboxInnerContainer,
  CheckboxLabel,
  CheckboxLabelWrapper,
  CheckboxRoot,
  CheckboxSpinner,
} from './CheckboxStyles';

interface CheckboxPropsBase {
  /**
   * The checked state of the checkbox.
   * Can be `true` (checked), `false` (unchecked), or `'indeterminate'` (partially checked).
   */
  checked: boolean | 'indeterminate';
  /**
   * Additional CSS class name for the outer container (optional).
   */
  className?: string;
  /**
   * Whether the checkbox is in an error state (optional).
   * When true, displays error styling. Currently only supported for unchecked checkboxes.
   */
  hasError?: boolean;
  /**
   * Additional CSS class name for the inner container (optional).
   */
  innerClassName?: string;
  /**
   * Whether the checkbox is disabled (optional).
   */
  isDisabled?: boolean;
  /**
   * Whether the checkbox is in a loading state (optional).
   * When true, displays a spinner overlay and prevents interaction.
   */
  isLoading?: boolean;
  /**
   * Whether the checkbox is required (optional).
   * When true, displays a required indicator in the label.
   */
  isRequired?: boolean;
  /**
   * Callback function called when the checkbox state changes.
   * @param checked - The new checked state
   * @param id - The ID of the checkbox element
   */
  onCheck: (checked: boolean | 'indeterminate', id: string) => void;
  /**
   * Focus event handler (optional).
   */
  onFocus?: VoidFunction;
  /**
   * HTML title attribute for the checkbox (optional). Also used as the aria-label if not provided.
   */
  title?: string;
}

export type CheckboxProps = PropsWithLabelsAndHelpText<CheckboxPropsBase>;

/**
 * Checkbox component for selecting options with support for checked, unchecked, and indeterminate states.
 *
 * **States**
 *
 * - `checked`: Boolean true when the checkbox is selected
 * - `unchecked`: Boolean false when the checkbox is not selected
 * - `indeterminate`: String 'indeterminate' for partial selection (e.g., when some child items are selected)
 */
export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    className,
    checked,
    helpText,
    hasError = false,
    id,
    innerClassName,
    isDisabled,
    isLoading = false,
    isRequired = false,
    label,
    onCheck,
    onFocus,
    title,
    ...radixProps
  } = props;

  const defaultId = `${useId()}checkbox`;
  const controlId = id ?? defaultId;

  const handleChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (!isDisabled && !isLoading) {
        onCheck(checked, controlId);
      }
    },
    [controlId, isDisabled, isLoading, onCheck],
  );

  return (
    <CheckboxContainer className={className} data-disabled={isDisabled || undefined}>
      <CheckboxInnerContainer className={innerClassName}>
        <CheckboxSpinner isLoading={isLoading}>
          <CheckboxRoot
            aria-disabled={isDisabled}
            aria-invalid={hasError}
            aria-label={ariaLabel ?? title}
            aria-labelledby={ariaLabelledBy}
            checked={checked}
            id={controlId}
            onCheckedChange={handleChange}
            onFocus={onFocus}
            ref={ref}
            title={title}
            // We only support the error state for unchecked checkboxes for now
            {...(hasError && checked === false ? { 'data-error': true } : {})}
            {...radixProps}>
            <CheckboxIndicator>
              <CheckboxIcon checked={checked} />
            </CheckboxIndicator>
          </CheckboxRoot>
        </CheckboxSpinner>
        {(label || helpText) && (
          <CheckboxLabelWrapper>
            {label && (
              <CheckboxLabel htmlFor={controlId} isRequired={isRequired}>
                {label}
              </CheckboxLabel>
            )}
            {helpText && <HelperText>{helpText}</HelperText>}
          </CheckboxLabelWrapper>
        )}
      </CheckboxInnerContainer>
    </CheckboxContainer>
  );
});
Checkbox.displayName = 'Checkbox';
