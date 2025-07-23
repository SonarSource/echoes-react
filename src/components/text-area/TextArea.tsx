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
import { forwardRef, InputHTMLAttributes, useId } from 'react';
import { PropsWithLabels } from '~types/utils';
import { cssVar } from '~utils/design-tokens';
import { FormField, FormFieldValidation } from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';

import {
  InputEventProps,
  InputProps,
  InputStyled,
  InputWrapper,
} from '../text-input/TextInputBase';

type InputAttributes = Pick<
  InputHTMLAttributes<HTMLTextAreaElement>,
  'autoComplete' | 'autoFocus' | 'form' | 'maxLength' | 'minLength' | 'name' | 'readOnly'
>;

interface TextAreaPropsBase
  extends InputProps,
    InputAttributes,
    InputEventProps<HTMLTextAreaElement> {
  isResizable?: boolean;
  rows?: number;
}

export type TextAreaProps = PropsWithLabels<TextAreaPropsBase>;

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>((props, ref) => {
  const {
    ariaLabel,
    ariaLabelledBy,
    helpText,
    helpToggletipProps,
    id,
    isDisabled = false,
    isResizable = false,
    isRequired = false,
    label,
    messageInvalid,
    messageValid,
    rows = 3,
    validation,
    width,
    ...restProps
  } = props;

  const defaultId = `${useId()}textarea`;

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
        <TextAreaStyled
          aria-describedby={describedBy}
          aria-invalid={validation === FormFieldValidation.Invalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          // Everything above this line can be overridden by the `restProps` object
          {...restProps}
          data-error={validation === FormFieldValidation.Invalid ? '' : undefined}
          data-resizable={isResizable ? '' : undefined}
          data-valid={validation === FormFieldValidation.Valid ? '' : undefined}
          disabled={isDisabled}
          id={controlId}
          ref={ref}
          required={isRequired}
          rows={rows}
        />
      </InputWrapper>
    </FormField>
  );
});

TextArea.displayName = 'TextArea';

const TextAreaStyled = styled(InputStyled.withComponent('textarea'))`
  height: auto;
  min-height: ${cssVar('form-control-sizes-height-default')};

  resize: none;

  &[data-resizable] {
    resize: vertical;
  }
`;

TextAreaStyled.displayName = 'TextAreaStyled';
