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
import { ChangeEventHandler, forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import {
  type ValidationProps,
  FormField,
  FormFieldValidation,
  FormFieldWidth,
} from '../form/FormField';

// What do we want to keep in there? I think we should probably limit the available types too.
type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'type'
  | 'name'
  | 'minLength'
  | 'maxLength'
  | 'multiple'
  | 'pattern'
  | 'min'
  | 'max'
  | 'step'
>;

interface Props extends InputProps, ValidationProps {
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  value?: string | number;
  width?: `${FormFieldWidth}`;
}

export const TextField = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    helpText,
    id,
    isDisabled,
    isRequired,
    label,
    messageInvalid,
    messageValid,
    prefix,
    suffix,
    validation,
    width,
    ...rest
  } = props;

  const defaultId = `${useId()}textfield`;
  const controlId = id ?? defaultId;
  const descriptionId = `${controlId}-description`;

  return (
    <FormField
      controlId={controlId}
      description={helpText}
      descriptionId={descriptionId}
      isDisabled={isDisabled}
      isRequired={isRequired}
      label={label}
      messageInvalid={messageInvalid}
      messageValid={messageValid}
      validation={validation}
      width={width}>
      <StyledInput
        aria-describedby={helpText ? descriptionId : undefined}
        aria-invalid={validation === FormFieldValidation.Invalid}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        data-error={validation === FormFieldValidation.Invalid ? '' : undefined}
        data-valid={validation === FormFieldValidation.Valid ? '' : undefined}
        disabled={isDisabled}
        id={controlId}
        ref={ref}
        required={isRequired}
        {...rest}
      />
    </FormField>
  );
});

TextField.displayName = 'TextField';

const StyledInput = styled.input`
  border-color: var(--echoes-color-border-bolder);
  border-radius: var(--echoes-border-radius-200);
  border-style: solid;
  border-width: 1px;

  &[data-valid] {
    border-color: var(--echoes-color-border-danger);
  }
  &[data-error] {
    border-color: var(--echoes-color-border-success);
  }
`;
