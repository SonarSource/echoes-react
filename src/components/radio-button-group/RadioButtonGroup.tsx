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
import { ReactNode, forwardRef, useId } from 'react';
import { GroupAlignment } from '~types/GroupAlignment';
import { PropsWithLabels } from '~types/utils';
import {
  type ValidationProps,
  FormField,
  FormFieldValidation,
  FormFieldWidth,
} from '../form/FormField';
import { useFormFieldA11y } from '../form/useFormFieldA11y';
import { HelperText, Label } from '../typography';

interface Props extends ValidationProps {
  onChange?: (value: string) => void;
  options: RadioOption[];

  // Group Props
  alignment?: `${GroupAlignment}`;
  className?: string;
  defaultValue?: string;
  id?: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  value?: string;
  width?: `${FormFieldWidth}`;
}

export const RadioButtonGroup = forwardRef<HTMLDivElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    alignment = GroupAlignment.Vertical,
    ariaLabel,
    ariaLabelledBy,
    className,
    helpText,
    id = 'radio-button-group',
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
    hasDescription: Boolean(helpText),
    hasValidationMessage: Boolean(messageValid || messageInvalid),
  });

  return (
    <FormField
      className={className}
      helpText={helpText}
      helpTextId={helpTextId}
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
              groupId={id}
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
});

RadioButtonGroup.displayName = 'RadioButtonGroup';

/*
 * Related to the explanation below, we require an aria-label if the label is a ReactNode.
 * If the label is a string, we use it directly as a fallback if no aria-label is provided
 */
type RadioOption = {
  helpText?: ReactNode;
  isDisabled?: boolean;
  value: string;
} & ({ ariaLabel: string; label: ReactNode } | { ariaLabel?: string; label: string });

interface InternalRadioButtonProps {
  groupId: string;
  hasError?: boolean;
}

type RadioButtonProps = RadioOption & InternalRadioButtonProps;

function RadioButton(props: Readonly<RadioButtonProps>) {
  const { ariaLabel, hasError, isDisabled: disabled, groupId, helpText, label, value } = props;

  const id = `${groupId}-${value}`;

  /*
   * Although the HTML spec defines buttons as valid targets for labels,
   * some Screen Readers have issues with those:
   * https://github.com/dequelabs/axe-core/issues/3696#issuecomment-1665575742
   * So here we force an aria-label:
   */
  const inputLabel = ariaLabel ?? (typeof label === 'string' ? label : undefined);

  return (
    <OptionWrapper>
      <LabelWrapper {...(disabled ? { 'data-disabled': true } : {})}>
        <Input
          aria-label={inputLabel}
          {...(hasError ? { 'data-error': true } : {})}
          disabled={disabled}
          id={id}
          value={value}>
          <SelectionIndicator />
        </Input>
        <OptionLabel htmlFor={id}>{label}</OptionLabel>
      </LabelWrapper>
      {helpText && (
        <OptionHelpText as="span" {...(disabled ? { 'data-disabled': true } : {})}>
          {helpText}
        </OptionHelpText>
      )}
    </OptionWrapper>
  );
}

RadioButton.displayName = 'RadioButton';

const RadioGroupRoot = styled(RadioGroup.Root)`
  display: flex;
  flex-direction: column;
`;

const RadioButtonsWrapper = styled.div`
  column-gap: var(--echoes-dimension-space-300);
  display: flex;
  flex-direction: column;
  row-gap: var(--echoes-dimension-space-100);

  [data-alignment='horizontal'] > & {
    flex-direction: row;
  }
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled(RadioGroup.Item)`
  appearance: none;
  cursor: pointer;
  background-color: var(--echoes-color-background-transparent);

  box-sizing: border-box;
  padding: 0;
  border: var(--echoes-border-width-default) solid var(--echoes-color-border-bolder);
  border-radius: var(--echoes-border-radius-full);

  height: var(--echoes-dimension-height-400);
  width: var(--echoes-dimension-width-200);
  min-width: var(--echoes-dimension-width-200);

  &:hover {
    background-color: var(--echoes-color-background-default-hover);
  }

  &[data-error='true'] {
    border: var(--echoes-border-width-default) solid var(--echoes-color-border-danger);
  }

  &[data-state='checked'] {
    background-color: var(--echoes-color-background-selected-bold-default);
    border-color: var(--echoes-color-background-selected-bold-default);

    &:not(:disabled):hover {
      background-color: var(--echoes-color-background-selected-bold-hover);
      border-color: var(--echoes-color-background-selected-bold-hover);
    }
  }

  &:focus,
  &:focus-visible {
    outline: var(--echoes-color-focus-default) solid var(--echoes-focus-border-width-default);
    outline-offset: var(--echoes-focus-border-offset-default);
  }

  &:disabled {
    cursor: default;
    background-color: var(--echoes-color-background-disabled);
    border-color: var(--echoes-color-border-disabled);
  }
`;

const SelectionIndicator = styled(RadioGroup.Indicator)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: relative;

  &::after {
    content: '';
    display: block;

    box-sizing: border-box;
    height: var(--echoes-dimension-height-150);
    width: var(--echoes-dimension-width-75);
    border-radius: var(--echoes-border-radius-full);

    background-color: var(--echoes-color-icon-on-color);
  }

  &[data-disabled]::after {
    background-color: var(--echoes-color-icon-disabled);
  }
`;

const LabelWrapper = styled.span`
  display: inline-flex;
  gap: var(--echoes-dimension-space-100);
  align-items: center;
`;

const OptionLabel = styled(Label)`
  font: var(--echoes-typography-others-label-medium);

  display: block;
  width: 100%;

  cursor: pointer;

  [data-disabled] > & {
    color: var(--echoes-color-text-disabled);
    cursor: default;
  }
`;

const OptionHelpText = styled(HelperText)`
  margin-left: calc(var(--echoes-dimension-space-200) + var(--echoes-dimension-space-100));

  &[data-disabled] {
    color: var(--echoes-color-text-disabled);
  }
`;
