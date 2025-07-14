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
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import { FormField, FormFieldValidation } from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';
import {
  InputEventProps,
  InputPrefix,
  InputProps,
  InputStyled,
  InputSuffix,
  InputWrapper,
} from './TextInputBase';

type InputAttributes = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'dir'
  | 'form'
  | 'max'
  | 'min'
  | 'maxLength'
  | 'minLength'
  | 'name'
  | 'pattern'
  | 'readOnly'
  | 'step'
>;

interface TextInputPropsBase
  extends InputProps,
    InputAttributes,
    InputEventProps<HTMLInputElement> {
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
}

export type TextInputProps = PropsWithLabels<TextInputPropsBase>;

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    helpText,
    helpToggletipProps,
    id,
    isDisabled = false,
    isRequired = false,
    label,
    messageInvalid,
    messageValid,
    prefix,
    suffix,
    type = 'text',
    validation,
    width,
    ...rest
  } = props;

  const defaultId = `${useId()}textinput`;

  const { controlId, describedBy, helpTextId, validationMessageId } = useFormFieldA11y({
    controlId: id ?? defaultId,
    hasHelpText: Boolean(helpText),
    hasValidationMessage: Boolean(messageValid || messageInvalid),
  });

  return (
    <FormField
      controlId={controlId}
      helpText={helpText}
      helpTextId={helpTextId}
      helpToggletipProps={helpToggletipProps}
      isDisabled={isDisabled}
      isRequired={isRequired}
      label={label}
      messageInvalid={messageInvalid}
      messageValid={messageValid}
      validation={validation}
      validationMessageId={validationMessageId}
      width={width}>
      <InputWrapper>
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <InputStyled
          aria-describedby={describedBy}
          aria-invalid={validation === FormFieldValidation.Invalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          data-error={validation === FormFieldValidation.Invalid ? '' : undefined}
          data-prefix={prefix ? '' : undefined}
          data-suffix={suffix ? '' : undefined}
          data-valid={validation === FormFieldValidation.Valid ? '' : undefined}
          disabled={isDisabled}
          id={controlId}
          ref={ref}
          required={isRequired}
          type={type}
          {...rest}
        />
        {suffix && <InputSuffix>{suffix}</InputSuffix>}
      </InputWrapper>
    </FormField>
  );
});

TextInput.displayName = 'TextInput';
