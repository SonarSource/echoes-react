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
import { forwardRef, InputHTMLAttributes, ReactNode, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import {
  type ValidationProps,
  FormField,
  FormFieldValidation,
  FormFieldWidth,
} from '../form/FormField';
import { useFormFelidAccessability } from '../form/useFormFelidAccessability';

type InputProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'autoComplete'
  | 'autoFocus'
  | 'name'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'min'
  | 'max'
  | 'readOnly'
  | 'step'
>;

type InputEventProps = Pick<
  InputHTMLAttributes<HTMLInputElement>,
  | 'onFocus'
  | 'onBlur'
  | 'onChange'
  | 'onKeyDown'
  | 'onKeyPress'
  | 'onKeyUp'
  | 'onMouseEnter'
  | 'onMouseLeave'
  | 'onPointerEnter'
  | 'onPointerLeave'
>;

interface Props extends ValidationProps, InputProps, InputEventProps {
  className?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  placeholder?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  type?: 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'url';
  value?: string | number;
  width?: `${FormFieldWidth}`;
}

export const TextInput = forwardRef<HTMLInputElement, PropsWithLabels<Props>>((props, ref) => {
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
    type = 'text',
    validation,
    width,
    ...rest
  } = props;

  const defaultId = `${useId()}textinput`;

  const { controlId, describedBy, descriptionId, validationMessageId } = useFormFelidAccessability({
    controlId: id ?? defaultId,
    hasDescription: Boolean(helpText),
    hasValidationMessage: Boolean(messageValid || messageInvalid),
  });

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
      validationMessageId={validationMessageId}
      width={width}>
      <TextInputWrapper>
        {prefix && <InputPrefix>{prefix}</InputPrefix>}
        <StyledInput
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
      </TextInputWrapper>
    </FormField>
  );
});

TextInput.displayName = 'TextInput';

const StyledInput = styled.input`
  color: var(--echoes-color-text-default);
  background-color: var(--echoes-form-control-colors-background-default);
  border: var(--echoes-border-width-default) solid var(--echoes-form-control-colors-border-default);
  border-radius: var(--echoes-form-control-border-radius-default);

  font: var(--echoes-typography-text-default-regular);
  text-overflow: ellipsis;

  box-sizing: border-box;
  width: 100%;
  height: var(--echoes-form-control-sizes-height-default);
  padding: var(--echoes-dimension-space-0) var(--echoes-dimension-space-150);

  &::placeholder {
    color: var(--echoes-color-text-placeholder);
  }
  &:hover {
    background-color: var(--echoes-form-control-colors-background-hover);
  }
  &[data-valid] {
    border-color: var(--echoes-color-border-success);
  }
  &[data-error] {
    border-color: var(--echoes-color-border-danger);
  }
  &[data-prefix] {
    padding-left: calc(
      var(--echoes-dimension-space-150) + var(--echoes-dimension-width-300) +
        var(--echoes-dimension-space-100)
    );
  }
  &[data-suffix] {
    padding-right: calc(
      var(--echoes-dimension-space-150) + var(--echoes-dimension-width-300) +
        var(--echoes-dimension-space-100)
    );
  }

  &:active,
  &:focus,
  &:focus-within,
  &:focus-visible {
    border-color: var(--echoes-form-control-colors-border-focus);
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
  }

  &:disabled,
  &:disabled:hover {
    color: var(--echoes-color-text-disabled);
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
    outline: none;
    cursor: not-allowed;

    &::placeholder {
      color: var(--echoes-color-text-disabled);
    }
  }
`;
StyledInput.displayName = 'StyledInput';

const TextInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
TextInputWrapper.displayName = 'TextInputWrapper';

const InputIconWrapper = styled.span`
  position: absolute;

  font-size: var(--echoes-font-size-30);
  color: var(--echoes-form-control-colors-icon-default);

  [data-disabled] & {
    color: var(--echoes-color-icon-disabled);
    cursor: not-allowed;
  }
`;
InputIconWrapper.displayName = 'InputIconWrapper';

const InputPrefix = styled(InputIconWrapper)`
  left: var(--echoes-dimension-space-150);
`;
InputPrefix.displayName = 'InputPrefix';

const InputSuffix = styled(InputIconWrapper)`
  right: var(--echoes-dimension-space-150);
`;
InputSuffix.displayName = 'InputSuffix';
