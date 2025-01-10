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

import styled from '@emotion/styled';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { forwardRef, useCallback, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import { FormField } from '../form/FormField';
import { FormFieldControl } from '../form/FormFieldControl';
import { FormFieldDescription } from '../form/FormFieldDescription';
import { FormFieldLabel } from '../form/FormFieldLabel';
import { FormFieldValidation } from '../form/FormFieldValidation';
import { Spinner } from '../spinner';
import { CheckboxIcon } from './CheckboxIcon';

interface Props {
  checked: boolean | 'indeterminate';
  className?: string;
  isDisabled?: boolean;
  isLoading?: boolean;
  messageInvalid?: JSX.Element | string;
  messageValid?: JSX.Element | string;
  onCheck: (checked: boolean | 'indeterminate', id?: string) => void;
  onFocus?: VoidFunction;
  title?: string;
  validation?: `${FormFieldValidation}`;
}

export const Checkbox = forwardRef<HTMLDivElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    className,
    checked,
    helpText,
    id,
    isDisabled,
    isLoading = false,
    label,
    messageInvalid,
    messageValid,
    onCheck,
    onFocus,
    title,
    validation = FormFieldValidation.None,
    ...radixProps
  } = props;

  const defaultId = useId();
  const controlId = id ?? defaultId;
  const descriptionId = useId();
  let description: JSX.Element | string | undefined;

  switch (validation) {
    case FormFieldValidation.Invalid:
      description = messageInvalid;
      break;
    case FormFieldValidation.Valid:
      description = messageValid;
      break;
    case FormFieldValidation.None:
      description = helpText;
      break;
  }

  const handleChange = useCallback(
    (checked: boolean | 'indeterminate') => {
      if (!isDisabled && !isLoading) {
        onCheck(checked, controlId);
      }
    },
    [controlId, isDisabled, isLoading, onCheck],
  );

  return (
    <FormField className={className} controlPlacement="before" inline ref={ref}>
      {label && (
        <FormFieldLabel htmlFor={controlId} isDisabled={isDisabled}>
          {label}
        </FormFieldLabel>
      )}
      <FormFieldControl>
        <Spinner isLoading={isLoading}>
          <CheckboxRoot
            aria-describedby={description ? descriptionId : undefined}
            aria-disabled={isDisabled}
            aria-label={ariaLabel ?? title}
            aria-labelledby={ariaLabelledBy}
            checked={checked}
            id={controlId}
            onCheckedChange={handleChange}
            onFocus={onFocus}
            title={title}
            // We only support the error state for unchecked checkboxes for now
            {...(validation === FormFieldValidation.Invalid && checked === false
              ? { 'data-error': true }
              : {})}
            {...radixProps}>
            <CheckboxIndicator>
              <CheckboxIcon checked={checked} />
            </CheckboxIndicator>
          </CheckboxRoot>
        </Spinner>
      </FormFieldControl>
      {description && (
        <FormFieldDescription id={descriptionId} validation={validation}>
          {description}
        </FormFieldDescription>
      )}
    </FormField>
  );
});

Checkbox.displayName = 'Checkbox';

const CheckboxRoot = styled(RadixCheckbox.Root)`
  color: var(--echoes-color-text-on-color);
  background-color: var(--echoes-color-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bolder);

  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
  border-radius: var(--echoes-border-radius-100);
  margin: var(--echoes-dimension-space-25) 0;
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  &:focus,
  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
  }

  &[aria-disabled='true'] {
    color: var(--echoes-color-icon-disabled);
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
    pointer-events: none;

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-disabled);
      border-color: var(--echoes-color-border-disabled);
    }
  }

  &:not([aria-disabled='true']) {
    &:hover {
      background-color: var(--echoes-color-background-default-hover);
    }

    &[data-state='checked'],
    &[data-state='indeterminate'] {
      background-color: var(--echoes-color-background-selected-bold-default);
      border-color: var(--echoes-color-background-selected-bold-default);

      &:hover {
        background-color: var(--echoes-color-background-selected-bold-hover);
        border: var(--echoes-color-background-selected-bold-hover);
      }
    }

    &[data-error] {
      border-color: var(--echoes-color-border-danger);
    }
  }
`;

const CheckboxIndicator = styled(RadixCheckbox.Indicator)`
  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
`;
