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
import * as RadioGroup from '@radix-ui/react-radio-group';
import { forwardRef, useId } from 'react';
import { GroupAlignment } from '~types/GroupAlignment';
import { PropsWithLabels } from '~types/utils';
import { FormField, FormFieldValidation } from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';
import { RadioButton } from './RadioButton';
import { RadioButtonGroupProps } from './RadioButtonTypes';

export const RadioButtonGroup = forwardRef<HTMLDivElement, PropsWithLabels<RadioButtonGroupProps>>(
  (props, ref) => {
    const {
      alignment = GroupAlignment.Vertical,
      ariaLabel,
      ariaLabelledBy,
      className,
      helpText,
      helpToggletipProps,
      id,
      isDisabled: disabled,
      isRequired: required,
      label,
      messageInvalid,
      messageValid,
      onChange,
      options,
      validation,
      width,
      ...radixRadioGroupProps
    } = props;

    const defaultId = `${useId()}radiogroup`;

    const { controlId, describedBy, helpTextId, labelId, validationMessageId } = useFormFieldA11y({
      controlId: id ?? defaultId,
      hasHelpText: Boolean(helpText),
      hasValidationMessage: Boolean(messageValid || messageInvalid),
    });

    return (
      <FormField
        className={className}
        helpText={helpText}
        helpTextId={helpTextId}
        helpToggletipProps={helpToggletipProps}
        isDisabled={disabled}
        isRequired={required}
        label={label}
        labelId={labelId}
        messageInvalid={messageInvalid}
        messageValid={messageValid}
        validation={validation}
        validationMessageId={validationMessageId}
        width={width}>
        <RadioGroupRoot
          {...radixRadioGroupProps}
          aria-describedby={describedBy}
          aria-invalid={validation === FormFieldValidation.Invalid}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy ?? labelId}
          data-alignment={alignment}
          disabled={disabled}
          id={controlId}
          onValueChange={onChange}
          ref={ref}
          required={required}>
          <RadioButtonsWrapper>
            {options.map(({ isDisabled: disabledOption, ...o }) => (
              <RadioButton
                groupId={controlId}
                hasError={validation === FormFieldValidation.Invalid}
                isDisabled={disabled ? true : disabledOption} // Group disabled takes precedence
                key={o.value}
                {...o}
              />
            ))}
          </RadioButtonsWrapper>
        </RadioGroupRoot>
      </FormField>
    );
  },
);

RadioButtonGroup.displayName = 'RadioButtonGroup';

const RadioGroupRoot = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
`;
RadioGroupRoot.displayName = 'RadioGroupRoot';

const RadioButtonsWrapper = styled.div`
  column-gap: var(--echoes-dimension-space-300);
  display: flex;
  flex-direction: column;
  row-gap: var(--echoes-dimension-space-100);

  [data-alignment='horizontal'] > & {
    flex-direction: row;
  }
`;
RadioButtonsWrapper.displayName = 'RadioButtonsWrapper';
