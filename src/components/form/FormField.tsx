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
import { type ComponentProps, type JSX, forwardRef } from 'react';
import { MessageInline, MessageInlineSize, MessageType } from '../messages';
import { HelperText } from '../typography';
import { FormFieldLabel } from './FormFieldLabel';

/**
 * Represents the validity state of a form field.
 */
export enum FormFieldValidation {
  /**
   * The form field has failed validation.
   */
  Invalid = 'invalid',
  /**
   * The form field has not been explicitly validated (default).
   */
  None = 'none',
  /**
   * The form field has been successfully validated.
   */
  Valid = 'valid',
}

/**
 * The available width options for a form felid.
 */
export enum FormFieldWidth {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  Full = 'full',
}

type Message = JSX.Element | string | false | null;
type WhiteListedProps = Pick<ComponentProps<'div'>, 'className'>;

export interface ValidationProps {
  /**
   * The message to display when the form field is invalid (optional).
   */
  messageInvalid?: Message;
  /**
   * The message to display when the form field is valid (optional).
   */
  messageValid?: Message;
  /**
   * The validation state of the form field (optional). The default is `none`,
   * meaning the form field has not been explicitly validated.
   */
  validation?: `${FormFieldValidation}`;
}

interface FormFieldProps extends ValidationProps, WhiteListedProps {
  /**
   * The form control element. A form field should have exactly one form control.
   */
  children: JSX.Element;
  /**
   * The ID of the form control that this form field is associated with
   * (optional).
   */
  controlId?: string;
  /**
   * A descriptive message for the form field (optional).
   */
  description?: Message;
  /**
   * The ID of the description for the form field (optional). Useful for
   * establishing a relationship between a description and a form control using
   * the `aria-describedby` attribute.
   */
  descriptionId?: string;
  /**
   * When true, pointer events will be disabled on the label to prevent
   * activating the form control.
   */
  isDisabled?: boolean;
  /**
   * When true, an asterisk will be displayed next to the label to indicate that
   * the field is required.
   */
  isRequired?: boolean;
  /**
   * The label for the form field (optional).
   */
  label?: JSX.Element | string;
  /**
   * The ID of the validation message for the form field (optional). Useful for
   * establishing a relationship between a validation message and a form control
   * using the `aria-describedby` attribute.
   */
  validationMessageId?: string;
  /**
   * Controls the width of the form field (optional). The default value is
   * `full`, meaning it will take up the full width of its container.
   */
  width?: `${FormFieldWidth}`;
}

/**
 * @internal
 *
 * Form fields wrap form controls and help create standardization between them.
 * They may have a label, a description, and validation.
 *
 * **Permitted Content:**
 *
 * `CheckboxGroup | RadioButtonGroup | Select | Textarea | TextInput`
 */
export const FormField = forwardRef<HTMLDivElement, FormFieldProps>((props, ref) => {
  const {
    children,
    controlId,
    description,
    descriptionId,
    isDisabled = false,
    isRequired = false,
    label,
    messageInvalid,
    messageValid,
    validation,
    validationMessageId,
    width = FormFieldWidth.Full,
    ...rest
  } = props;

  const messageInvalidElement = validation === 'invalid' && messageInvalid && (
    <ValidationMessage size={MessageInlineSize.Small} type={MessageType.Danger}>
      {messageInvalid}
    </ValidationMessage>
  );

  const messageValidElement = validation === 'valid' && messageValid && (
    <ValidationMessage size={MessageInlineSize.Small} type={MessageType.Success}>
      {messageValid}
    </ValidationMessage>
  );

  return (
    <FormFieldStyled
      data-disabled={isDisabled ? true : undefined}
      data-width={width}
      ref={ref}
      {...rest}>
      <FormFieldLabel htmlFor={controlId} isRequired={isRequired}>
        {label}
      </FormFieldLabel>
      {children}
      <span aria-live="polite" id={validationMessageId}>
        {messageInvalidElement}
        {messageValidElement}
      </span>
      {description && (
        <Description
          hidden={Boolean(messageValidElement || messageInvalidElement)}
          id={descriptionId}>
          {description}
        </Description>
      )}
    </FormFieldStyled>
  );
});

FormField.displayName = 'FormField';

const FormFieldStyled = styled.div`
  &[data-width='small'] {
    width: var(--echoes-sizes-form-field-small);
  }
  &[data-width='medium'] {
    width: var(--echoes-sizes-form-field-medium);
  }
  &[data-width='large'] {
    width: var(--echoes-sizes-form-field-large);
  }
  &[data-width='full'] {
    width: var(--echoes-sizes-form-field-full);
  }
`;

FormFieldStyled.displayName = 'FormFieldStyled';

const ValidationMessage = styled(MessageInline)`
  display: block;
  margin-top: var(--echoes-dimension-space-75);
`;

ValidationMessage.displayName = 'ValidationMessage';

const Description = styled(HelperText)`
  margin-top: var(--echoes-dimension-space-75);
`;

Description.displayName = 'Description';
