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
import { type ComponentPropsWithRef, forwardRef, useId } from 'react';

import { PropsWithLabels } from '~types/utils';
import { FormField } from '../form/FormField';
import { FormFieldControl } from '../form/FormFieldControl';
import { FormFieldDescription } from '../form/FormFieldDescription';
import { FormFieldLabel } from '../form/FormFieldLabel';
import { FormFieldValidation } from '../form/FormTypes';

export type TextInputProps = PropsWithLabels<
  ComponentPropsWithRef<'input'> & {
    messageInvalid?: JSX.Element | string;
    messageValid?: JSX.Element | string;
    validation?: `${FormFieldValidation}`;
  }
>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    disabled,
    helpText,
    id,
    label,
    messageInvalid,
    messageValid,
    required,
    validation = FormFieldValidation.None,
    ...rest
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
  return (
    <FormField controlPlacement="between">
      {label && (
        <FormFieldLabel htmlFor={controlId} isRequired={required}>
          {label}
        </FormFieldLabel>
      )}
      <FormFieldControl>
        <StyledInput
          aria-describedby={description ? descriptionId : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          disabled={disabled}
          id={controlId}
          ref={ref}
          required={required}
          validation={validation}
          {...rest}
        />
      </FormFieldControl>
      {description && (
        <FormFieldDescription id={descriptionId} validation={validation}>
          {description}
        </FormFieldDescription>
      )}
    </FormField>
  );
});

TextInput.displayName = 'TextInput';

const StyledInput = styled.input<{ validation: `${FormFieldValidation}` }>`
  border-color: ${(props) => {
    switch (props.validation) {
      case FormFieldValidation.Invalid:
        return 'var(--echoes-color-border-danger)';
      case FormFieldValidation.Valid:
        return '#039855';
      default:
        return 'var(--echoes-color-border-bolder)';
    }
  }};
  border-radius: var(--echoes-border-radius-200);
  border-style: solid;
  border-width: 1px;
`;
