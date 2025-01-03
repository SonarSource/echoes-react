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
import { ReactNode, forwardRef } from 'react';
import { PropsWithLabels } from '~types/utils';
import { HelperText, Label } from '../typography';

export enum RadioButtonGroupAlignment {
  Vertical = 'vertical',
  Horizontal = 'horizontal',
}

interface Props {
  onChange?: (value: string) => void;
  options: RadioOption[];

  // Group Props
  alignment?: RadioButtonGroupAlignment;
  defaultValue?: string;
  id: string;
  isDisabled?: boolean;
  isRequired?: boolean;
  labelRadioGroupError?: ReactNode;
  value?: string;
}

export const RadioButtonGroup = forwardRef<HTMLDivElement, PropsWithLabels<Props>>((props, ref) => {
  const {
    alignment = RadioButtonGroupAlignment.Vertical,
    ariaLabel,
    ariaLabelledBy,
    helpText,
    id = 'radio-button-group',
    isDisabled: disabled,
    isRequired: required,
    label,
    labelRadioGroupError,
    onChange,
    options,
    ...radixRadioGroupProps
  } = props;

  return (
    <RadioGroupRoot
      {...radixRadioGroupProps}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      disabled={disabled}
      id={id}
      onValueChange={onChange}
      ref={ref}
      required={required}>
      {label && (
        <RadioGroupLabelWrapper data-testid="radio-group-label-wrapper">
          <Label id={`${id}-label`} isSubdued={disabled}>
            {label}

            {required && (
              <RadioGroupRequired {...(disabled ? { 'data-disabled': true } : {})}>
                *
              </RadioGroupRequired>
            )}
          </Label>

          {helpText && (
            <HelperText as="span" id={`${id}-helptext`}>
              {helpText}
            </HelperText>
          )}
        </RadioGroupLabelWrapper>
      )}

      <RadioButtonsWrapper
        aria-describedby={helpText ? `${id}-helptext` : undefined}
        aria-labelledby={label ? `${id}-label` : undefined}
        horizontal={alignment === RadioButtonGroupAlignment.Horizontal}>
        {options.map(({ isDisabled: disabledOption, ...o }) => (
          <RadioButton
            groupId={id}
            hasError={Boolean(labelRadioGroupError)}
            isDisabled={disabled ? true : disabledOption} // Group disabled takes precedence
            key={o.value}
            {...o}
          />
        ))}
      </RadioButtonsWrapper>

      <RadioGroupErrorMessage>{labelRadioGroupError ?? <>&nbsp;</>}</RadioGroupErrorMessage>
    </RadioGroupRoot>
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

const RadioGroupLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--echoes-dimension-space-50);
  margin-bottom: var(--echoes-dimension-space-150);
`;

const RadioGroupRequired = styled.span`
  color: var(--echoes-color-text-danger);
  font: var(--echoes-typography-others-label-medium);
  margin-left: var(--echoes-dimension-space-25);

  &[data-disabled] {
    color: var(--echoes-color-text-subdued);
  }
`;

const RadioButtonsWrapper = styled.div<{ horizontal: boolean }>`
  display: flex;
  flex-direction: ${(props) => (props.horizontal ? 'row' : 'column')};
  gap: ${(props) =>
    props.horizontal ? 'var(--echoes-dimension-space-300)' : 'var(--echoes-dimension-space-100)'};
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

const RadioGroupErrorMessage = styled.span`
  font: var(--echoes-typography-text-default-regular);
  color: var(--echoes-color-text-danger);
  margin-top: var(--echoes-dimension-space-100);
`;
